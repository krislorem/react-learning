import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";
import "./index.scss";

const API = () => {
  const navigateTo = (url) => {
    Taro.navigateTo({ url });
  };

  return (
    <View className='api'>
      <AtList>
        <AtListItem
          title='联系人'
          arrow='right'
          onClick={() => navigateTo('/pages/contact/index')}
        />
        <AtListItem
          title='设备'
          arrow='right'
          onClick={() => navigateTo('/pages/device/index')}
        />
        <AtListItem
          title='蓝牙'
          arrow='right'
          onClick={() => navigateTo('/pages/api/bluetooth/index')}
        />
        <AtListItem
          title='网络'
          arrow='right'
          onClick={() => navigateTo('/pages/api/network/index')}
        />
        <AtListItem
          title='扫码'
          arrow='right'
          onClick={() => navigateTo('/pages/api/scan-code/index')}
        />
        <AtListItem
          title='clipboard'
          arrow='right'
          onClick={() => navigateTo('/pages/media/clipboard/index')}
        />
        <AtListItem
          title='screenshot'
          arrow='right'
          onClick={() => navigateTo('/pages/media/screenshot/index')}
        />
      </AtList>
    </View>
  );
};

export default API;
