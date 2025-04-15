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
    // 设置名片尺寸和边距保护
    const cardWidth = 300;
    const cardHeight = 180;
    const margin = 20; // 边距保护

    ctx.clearRect(0, 0, cardWidth, cardHeight);
    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // 绘制渐变头像 - 调整位置以保持边距
    const initials = getInitials(formData.name);
    const avatarX = cardWidth - margin - 30; // 头像X位置（右侧边距内）
    const avatarY = margin + 30; // 头像Y位置（顶部边距内）

    const gradient = ctx.createLinearGradient(avatarX - 30, avatarY - 30, avatarX + 30, avatarY + 30);
    gradient.addColorStop(0, '#4CAF50');
    gradient.addColorStop(1, '#2196F3');
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, 30, 0, 2 * Math.PI);
    ctx.setFillStyle(gradient);
    ctx.fill();

    // 绘制首字母
    ctx.setFillStyle('#ffffff');
    ctx.setFontSize(24);
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.fillText(initials, avatarX, avatarY);

    // 绘制姓名 - 居中但保持边距
    ctx.setFontSize(18);
    ctx.setFillStyle('#333333');
    const nameWidth = ctx.measureText(formData.name).width;
    const nameX = Math.max(margin, Math.min((cardWidth - nameWidth) / 2, cardWidth - nameWidth - margin));
    ctx.fillText(formData.name, nameX, margin + 20);

    // 绘制职位 - 居中但保持边距
    ctx.setFontSize(14);
    ctx.setFillStyle('#666666');
    const positionWidth = ctx.measureText(formData.position).width;
    const positionX = Math.max(margin, Math.min((cardWidth - positionWidth) / 2, cardWidth - positionWidth - margin));
    ctx.fillText(formData.position, positionX, margin + 50);

    // 绘制分隔线 - 保持边距
    ctx.beginPath();
    ctx.moveTo(margin, margin + 70);
    ctx.lineTo(cardWidth - margin, margin + 70);
    ctx.setStrokeStyle('#eeeeee');
    ctx.stroke();

    // 绘制联系信息 - 保持边距并限制文本长度
    ctx.setFontSize(12);

    // 公司信息
    const companyText = `公司：${formData.company}`;
    const companyWidth = ctx.measureText(companyText).width;
    const companyX = Math.max(margin, Math.min((cardWidth - companyWidth) / 2, cardWidth - companyWidth - margin));
    ctx.fillText(companyText, companyX, margin + 95);

    // 电话信息
    const phoneText = `电话：${formData.phone}`;
    const phoneWidth = ctx.measureText(phoneText).width;
    const phoneX = Math.max(margin, Math.min((cardWidth - phoneWidth) / 2, cardWidth - phoneWidth - margin));
    ctx.fillText(phoneText, phoneX, margin + 115);

    // 邮箱信息
    const emailText = `邮箱：${formData.email}`;
    const emailWidth = ctx.measureText(emailText).width;
    const emailX = Math.max(margin, Math.min((cardWidth - emailWidth) / 2, cardWidth - emailWidth - margin));
    ctx.fillText(emailText, emailX, margin + 135);

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
        <AtInput
          name='name'
          title='姓名'
          value={formData.name}
          maxLength={32}
          onChange={(value) => setFormData({ ...formData, name: value })}
        />
        <AtInput
          name='position'
          title='职位'
          value={formData.position}
          maxLength={32}
          onChange={(value) => setFormData({ ...formData, position: value })}
        />
        <AtInput
          name='company'
          title='公司'
          value={formData.company}
          maxLength={32}
          onChange={(value) => setFormData({ ...formData, company: value })}
        />
        <AtInput
          name='phone'
          title='电话'
          value={formData.phone}
          maxLength={15}
          onChange={(value) => setFormData({ ...formData, phone: value })}
        />
        <AtInput
          name='email'
          title='邮箱'
          value={formData.email}
          maxLength={32}
          onChange={(value) => setFormData({ ...formData, email: value })}
        />
      </View>

      {/* 名片预览区域 */}
      <View className='preview-area'>
        <Canvas
          id='previewContainer'
          ref={previewRef}
          canvasId='businessCardCanvas'
          style={{ width: '100%', height: '180px', maxWidth: '300px', margin: '0 auto' }}
        />
      </View>

      <AtButton className='save-btn' onClick={handleSave}>保存名片</AtButton>
    </View>
  );
};

export default BusinessCard;
