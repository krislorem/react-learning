import { useState, useRef, useEffect } from 'react';
import { View, Canvas } from '@tarojs/components';
import { AtInput, AtButton } from 'taro-ui';
import Taro from '@tarojs/taro';
import './index.scss';

const BusinessCard = () => {
  // 新增获取首字母函数
  const getInitials = (name) => {
    if (!name) return 'ME';
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };
  const ctx = Taro.createCanvasContext('businessCardCanvas');
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    phone: '',
    email: ''
  });
  useEffect(() => {
    drawCard();
  }, [formData]);

  const drawCard = () => {
    ctx.clearRect(0, 0, 300, 180);
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 300, 180);

    // 绘制渐变头像
    const initials = getInitials(formData.name);
    const gradient = ctx.createLinearGradient(220, 30, 280, 90);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#2196F3');
    ctx.beginPath();
    ctx.arc(250, 60, 30, 0, 2 * Math.PI);
    ctx.setFillStyle(gradient);
    ctx.fill();

    // 绘制首字母
    ctx.setFillStyle('#ffffff');
    ctx.setFontSize(24);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(initials, 250, 60);

    ctx.setFontSize(18);
    ctx.setFillStyle('#333333');
    // 动态计算文本位置
    const nameWidth = ctx.measureText(formData.name).width;
    ctx.fillText(formData.name, (300 - nameWidth) / 2, 40);

    ctx.setFontSize(14);
    ctx.setFillStyle('#666666');
    const positionWidth = ctx.measureText(formData.position).width;
    ctx.fillText(formData.position, (300 - positionWidth) / 2, 70);

    ctx.beginPath();
    ctx.moveTo(20, 70);
    ctx.lineTo(280, 70);
    ctx.setStrokeStyle('#eeeeee');
    ctx.stroke();

    ctx.setFontSize(12);
    ctx.fillText(`公司：${formData.company}`, 20, 95);
    ctx.fillText(`电话：${formData.phone}`, 20, 115);
    ctx.fillText(`邮箱：${formData.email}`, 20, 135);

    // 立即绘制
    ctx.draw(true);
  };



  // 预览区域ref
  const previewRef = useRef(null);

  const handleSave = async () => {
    try {
      if (previewRef.current) {
        // 先申请相册权限
        await Taro.authorize({
          scope: 'scope.writePhotosAlbum'
        });

        const query = Taro.createSelectorQuery().select('#previewContainer')
        query.boundingClientRect().exec(async (res) => {
          if (res?.[0]) {
            // 添加参数校验
            if (!res[0].width || !res[0].height) {
              throw new Error('无法获取预览区域尺寸');
            }

            const { tempFilePath } = await Taro.canvasToTempFilePath({
              canvasId: 'businessCardCanvas',
              x: 0,
              y: 0,
              width: 300,
              height: 180,
              destWidth: 600,
              destHeight: 360
            });

            await Taro.saveImageToPhotosAlbum({
              filePath: tempFilePath
            });
            Taro.showToast({ title: '保存成功' });
          }
        });
      }
    } catch (error) {
      // 处理权限拒绝情况
      if (error?.errMsg?.includes('auth deny')) {
        Taro.showModal({
          title: '权限申请',
          content: '需要相册权限保存名片',
          success: (res) => {
            if (res.confirm) {
              Taro.openSetting();
            }
          }
        });
        return;
      }

      // 显示具体错误信息
      Taro.showToast({
        title: `保存失败: ${error.message ?? error.errMsg ?? '未知错误'}`,
        icon: 'none',
        duration: 2000
      });
    }
  };

  return (
    <View className='business-card'>
      <View className='form-container'>
        <View className='form-left'>
          <AtInput
            name='name'
            title='姓名'
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
          />
          <AtInput
            name='position'
            title='职位'
            value={formData.position}
            onChange={(value) => setFormData({ ...formData, position: value })}
          />
          <AtInput
            name='company'
            title='公司'
            value={formData.company}
            onChange={(value) => setFormData({ ...formData, company: value })}
          />
        </View>
        <View className='form-right'>
          <AtInput
            name='phone'
            title='电话'
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
          />
          <AtInput
            name='email'
            title='邮箱'
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />
        </View>
      </View>

      {/* 名片预览区域 */}
      <View className='preview-area'>
        <Canvas
          id='previewContainer'
          ref={previewRef}
          canvasId='businessCardCanvas'
          style={{ width: '300px', height: '180px' }}
        />
      </View>

      <AtButton className='save-btn' onClick={handleSave}>保存名片</AtButton>
    </View>
  );
};

export default BusinessCard;
