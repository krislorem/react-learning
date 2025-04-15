import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";
import "./index.scss";

const Components = () => {
  const navigateTo = (url) => {
    Taro.navigateTo({ url });
  };

  return (
    <View className='components'>
      <AtList>
        <AtListItem
          title='容器'
          arrow='right'
          onClick={() => navigateTo('/pages/container/index')}
        />
        <AtListItem
          title='基础内容'
          arrow='right'
          onClick={() => navigateTo('/pages/basic/index')}
        />
        <AtListItem
          title='表单组件'
          arrow='right'
          onClick={() => navigateTo('/pages/form/index')}
        />
        <AtListItem
          title='skyline'
          arrow='right'
          onClick={() => navigateTo('/pages/skyline/index')}
        />
        <AtListItem
          title='媒体组件'
          arrow='right'
          onClick={() => navigateTo('/pages/media/index')}
        />
        <AtListItem
          title='地图'
          arrow='right'
          onClick={() => navigateTo('/pages/map/index')}
        />
        <AtListItem
          title='定位'
          arrow='right'
          onClick={() => navigateTo('/pages/location/index')}
        />
        <AtListItem
          title='scrollview'
          arrow='right'
          onClick={() => navigateTo('/pages/components/scroll-view/index')}
        />
        <AtListItem
          title='movable'
          arrow='right'
          onClick={() => navigateTo('/pages/device/movable-view/index')}
        />
        <AtListItem
          title='webview'
          arrow='right'
          onClick={() => navigateTo('/pages/components/webview/index')}
        />


      </AtList>
    </View>
  );
};

export default Components;
