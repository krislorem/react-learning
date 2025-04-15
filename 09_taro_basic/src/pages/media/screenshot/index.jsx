import { View, Button, Text, Snapshot, Canvas } from "@tarojs/components";
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import "./index.scss";

const ScreenShot = () => {
  const [result, setResult] = useState('');


  const handleSnapshot = async () => {
    try {
      // 检查权限状态
      const settings = await Taro.getSetting();
      if (!settings.authSetting['scope.writePhotosAlbum']) {
        try {
          await Taro.authorize({ scope: 'scope.writePhotosAlbum' });
        } catch (authError) {
          if (authError.errMsg.includes('auth deny')) {
            await Taro.showModal({
              title: '权限提示',
              content: '需要相册权限才能保存截图，是否去设置页面打开权限？',
              confirmText: '去设置',
              success: (res) => {
                if (res.confirm) {
                  Taro.openSetting();
                }
              }
            });
            return;
          }
          throw authError;
        }
      }

      // 执行截图操作
      Taro.createSelectorQuery()
        .select('#snapshot')
        .node()
        .exec((res) => {
          const node = res[0].node
          node.takeSnapshot({
            type: 'arraybuffer',
            format: 'jpeg',
            success: async (resp) => {
              const filePath = `${Taro.env.USER_DATA_PATH}/${Date.now()}.png`;
              try {
                await Taro.getFileSystemManager().access(Taro.env.USER_DATA_PATH);
              } catch (error) {
                await Taro.getFileSystemManager().mkdir({
                  dirPath: Taro.env.USER_DATA_PATH,
                  recursive: true
                });
              }
              await Taro.getFileSystemManager().writeFile({
                filePath,
                data: resp.data,
                encoding: 'binary'
              });
              await Taro.saveImageToPhotosAlbum({
                filePath,
                success: () => setResult('截图已保存到相册'),
                fail: () => setResult('保存到相册失败')
              });
            },
            fail: console.error
          });
        });

      // 状态更新移至保存相册成功回调内
    } catch (error) {
      console.error('截图失败:', error);
      let errorMsg = '操作失败';
      if (error.errMsg.includes('auth deny')) {
        errorMsg = '权限被拒绝';
      } else if (error.message.includes('skyline')) {
        errorMsg = '当前渲染模式不支持截图功能';
      } else if (error.message.includes('临时文件')) {
        errorMsg = '文件生成失败';
      }
      setResult(`${errorMsg}，请重试`);
    }
  };

  return (
    <View className='screenshot'>
      <View className='snapshot-container'>
        <Snapshot mode='picture' id='snapshot'>
          <view className='snapshot-content'>
            <Text>这是一段文本内容</Text>
            <Text>这是一段文本内容</Text>
            <Text>这是一段文本内容</Text>
          </view>
          {/* <Canvas
            id='snapshotCanvas'
            className='canvas'
            style={{ width: '300px', height: '200px' }}
            canvas-id='myCanvas'
          >

          </Canvas> */}
        </Snapshot>
      </View>

      <Button className='btn' onClick={handleSnapshot}>点击截图</Button>

      {result && <Text className='result-tip'>{result}</Text>}
    </View>
  );
};

export default ScreenShot;
