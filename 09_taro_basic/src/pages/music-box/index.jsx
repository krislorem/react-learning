import { useState, useRef, useEffect } from 'react'
import { View, Button, Progress } from '@tarojs/components'
import Taro, { createInnerAudioContext } from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import './index.scss'

const MusicBox = () => {
  const [playlist, setPlaylist] = useState(() => {
    try {
      return Taro.getStorageSync('playlist') || []
    } catch (error) {
      console.error('获取本地存储失败:', error)
      return []
    }
  })
  // 播放列表变化时自动保存
  useEffect(() => {
    Taro.setStorage({ key: 'playlist', data: playlist })
  }, [playlist])

  // 卸载时销毁播放器实例
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.stop()
        currentAudioRef.current.destroy()
        currentAudioRef.current = null
      }
    }
  }, [])
  const currentAudioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const currentAudio = currentAudioRef.current
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePrev = () => {
    if (!playlist.length) return;
    const currentIndex = playlist.findIndex(item => item.url === currentAudio?.src);
    const newIndex = currentIndex <= 0 ? playlist.length - 1 : currentIndex - 1;
    audioControl(playlist[newIndex].url);
  };

  const handleNext = () => {
    if (!playlist.length) return;
    const currentIndex = playlist.findIndex(item => item.url === currentAudioRef.current?.src);
    const newIndex = currentIndex >= playlist.length - 1 ? 0 : currentIndex + 1;
    audioControl(playlist[newIndex].url);
  };

  const audioControl = (url) => {
    if (currentAudioRef.current?.src === url) {
      if (isPlaying) {
        currentAudioRef.current.pause()
      } else {
        currentAudioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    } else {
      if (currentAudioRef.current) {
        currentAudioRef.current.stop()
      }

      const audio = createInnerAudioContext()
      currentAudioRef.current = audio
      audio.src = url
      audio.autoplay = true
      audio.onPlay(() => setIsPlaying(true))
      audio.onPause(() => setIsPlaying(false))
      audio.onTimeUpdate(() => {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration);
        setProgress((audio.currentTime / audio.duration) * 100)
      })
      audio.onCanplay(() => {
        setDuration(audio.duration);
      })
      audio.onEnded(() => {
        switch (loopModeRef.current) {
          case 'single':
            audio.play();
            break;
          case 'list': {
            const currentIndex = playlist.findIndex(item => item.url === currentAudioRef.current?.src);
            const newIndex = currentIndex >= playlist.length - 1 ? 0 : currentIndex + 1;
            audioControl(playlist[newIndex].url);
            break;
          }
          case 'random': {
            if (playlist.length === 0) return;
            let randomIndex;
            do {
              randomIndex = Math.floor(Math.random() * playlist.length);
            } while (playlist.length > 1 && randomIndex === playlist.findIndex(item => item.url === currentAudioRef.current?.src))
            audioControl(playlist[randomIndex].url);
            break;
          }
        }
      })

      currentAudioRef.current = audio;
      setIsPlaying(true);
      audio.play();
    }
  }

  const loopModeRef = useRef('single');
  const [loopMode, setLoopMode] = useState('single');
  // 新增溢出计算函数
  const calculateOverflow = (filename) => {
    // 中文字符算2个宽度，英文算1个
    const totalWidth = [...filename].reduce((acc, char) =>
      acc + (char.match(/[\u4e00-\u9fa5]/) ? 2 : 1), 0);
    // 假设容器宽度可容纳约30个英文字符宽度
    return totalWidth > 50;
  };

  const handleUpload = async () => {
    try {
      const res = await Taro.chooseMessageFile({
        type: 'file',
        count: 10,
        extension: ['mp3', 'wav', 'aac', 'm4s']
      });

      const newFiles = res.tempFiles.map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        url: file.path,
        size: file.size,
        // 添加溢出标志，中文按2个字符计算
        overflows: calculateOverflow(file.name)
      }));
      setPlaylist(prev => {
        const remainingSlots = 100 - prev.length;
        if (remainingSlots <= 0) {
          Taro.showToast({ title: '已达到最大100个文件限制', icon: 'none' });
          return prev;
        }

        const validFiles = newFiles.slice(0, remainingSlots);
        const updatedList = [...prev, ...validFiles];

        Taro.showToast({
          title: `成功添加${validFiles.length}个，剩余可传${100 - updatedList.length}个`,
          icon: 'success'
        });
        return updatedList;
      });

    } catch (err) {
      console.error(err);
      if (err.errMsg !== 'chooseMessageFile:fail cancel') {
        Taro.showToast({ title: '选择文件失败', icon: 'none' });
      }
      return playlist;
    }
  };

  return (
    <View className='container'>
      <Button className='upload-btn' onClick={handleUpload}>上传音频</Button>

      <View className='player-container'>
        <View className='controls'>
          <View className='time-display'>
            <View className='current-time'>{formatTime(currentTime)}</View>
            <View className='duration'>{formatTime(duration)}</View>
          </View>
          <View className='slider-container'>
            <View
              className='custom-slider'
              onTouchStart={(e) => {
                Taro.createSelectorQuery().select('.slider-container').boundingClientRect(rect => {
                  const touchX = e.touches[0].pageX - rect.left;
                  const sliderWidth = rect.width;
                  const newTime = (touchX / sliderWidth) * duration;
                  setCurrentTime(newTime);
                  if (currentAudioRef.current) {
                    currentAudioRef.current.seek(newTime);
                  }
                }).exec();
              }}
            >
              <View className='slider-track' />
              <View
                className='slider-thumb'
                style={{ left: `${progress}%` }}
              />
            </View>
          </View>
          <View className='control-buttons'>
            <Button className='control-btn' onClick={handlePrev}>
              <AtIcon value='prev' size={20} color='#4a90e2' />
            </Button>
            <Button className='play-btn' onClick={() => currentAudio?.src && audioControl(currentAudio.src)}>
              {isPlaying ?
                <AtIcon value='pause' size={24} color='#4a90e2' /> :
                <AtIcon value='play' size={24} color='#4a90e2' />}
            </Button>
            <Button className='control-btn' onClick={handleNext}>
              <AtIcon value='next' size={20} color='#4a90e2' />
            </Button>
            <Button
              className='control-btn'
              onClick={() => setLoopMode(prev => {
                const modes = ['single', 'list', 'random'];
                const newMode = modes[(modes.indexOf(prev) + 1) % 3];
                loopModeRef.current = newMode;
                return newMode;
              })}
            >
              <AtIcon
                value={{
                  single: 'repeat-play',
                  list: 'playlist',
                  random: 'shuffle-play'
                }[loopMode]}
                size={20}
                color='#4a90e2'
              />
            </Button>
          </View>
          <Progress percent={progress} strokeWidth={4} />

        </View>
      </View>

      <View className='playlist-container'>
        <Button
          className='position-button'
          onClick={async () => {
            try {
              const query = Taro.createSelectorQuery()
              query.select('.active-item').boundingClientRect()
              query.selectViewport().scrollOffset()
              query.exec(res => {
                if (res[0]) {
                  Taro.pageScrollTo({
                    scrollTop: res[0].top + res[1].scrollTop - 100,
                    duration: 300
                  })
                }
              })
            } catch (e) {
              console.error('定位失败:', e)
            }
          }}
        >
          <AtIcon value='eye' size={20} color='#2af' />
        </Button>

        <View className='playlist'>
          {(playlist || []).map((item, index) => (
            <View
              key={item.id}
              className={`playlist-item ${currentAudioRef.current?.src === item.url ? 'active active-item' : ''}`}
              onClick={() => audioControl(item.url)}
              data-id={item.id}
            >
              <View className='item-content'>
                <View className='line-number'>{index + 1}. ♪</View>
                <View className='name-wrapper'>
                  <View className={`marquee-text ${(currentAudioRef.current?.src === item.url) && item.overflows ? 'active' : ''}`} data-id={item.id}>{item.name}</View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default MusicBox


