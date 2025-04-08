import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";
import "./index.scss";

const Discover = () => {
  const navigateTo = (url) => {
    Taro.navigateTo({ url });
  };

  return (
    <View className='discover'>
      <AtList>
        <AtListItem
          title='记账本'
          arrow='right'
          onClick={() => navigateTo('/pages/account-book/index')}
        />
        <AtListItem
          title='音乐盒子'
          arrow='right'
          onClick={() => navigateTo('/pages/music-box/index')}
        />
        <AtListItem
          title='个人名片生成器'
          arrow='right'
          onClick={() => navigateTo('/pages/business-card/index')}
        />
      </AtList>
    </View>
  );
};

export default Discover;
