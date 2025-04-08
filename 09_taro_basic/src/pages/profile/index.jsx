import { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { AtAvatar, AtList, AtListItem, AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import "./index.scss";

const Profile = () => {
  // 定义状态变量来存储用户信息
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");

  const checkLoginStatus = () => {
    const isLogged = Taro.getStorageSync("isLogged");
    if (isLogged) {
      setIsLoggedIn(true);
      setAvatarUrl(Taro.getStorageSync("avatarUrl") || "");
      setUsername(Taro.getStorageSync("username") || "");
    } else {
      setIsLoggedIn(false);
      setAvatarUrl(
        "https://public-cdn-oss.mosoteach.cn/avatar/2023/17/ba5ebfd5624f901afddb5e424c3442d4.jpg?v=1693574265&x-oss-process=style/s300x300"
      );
      setUsername("未登录");
    }
  };

  useEffect(() => {
    // 在组件加载时从存储中获取用户信息
    checkLoginStatus();
    // 监听登录成功事件
    Taro.eventCenter.on("loginSuccess", checkLoginStatus);
    return () => {
      // 组件卸载时移除事件监听
      Taro.eventCenter.off("loginSuccess", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    Taro.removeStorageSync('isLogged');
    Taro.removeStorageSync('avatarUrl');
    Taro.removeStorageSync('username');
    checkLoginStatus();
  };

  return (
    <View className='profile'>
      <View
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#ddd",
        }}
      >
        <AtAvatar circle image={avatarUrl} size='large' />
        <View style={{ color: "#fff", marginTop: "10px" }}>{username}</View>
        {isLoggedIn && (
          <AtButton
            type='secondary'
            size='small'
            onClick={handleLogout}
            style={{ marginTop: "10px" }}
          >
            登出
          </AtButton>
        )}
      </View>

      {isLoggedIn ? (
        <AtList>
          <AtListItem
            title='我的订单'
            arrow='right'
            iconInfo={{ size: 25, color: "#78A4FA", value: "shopping-cart" }}
          />
          <AtListItem
            title='我的收藏'
            arrow='right'
            iconInfo={{ size: 25, color: "#FF4949", value: "heart" }}
          />
          <AtListItem
            title='设置'
            arrow='right'
            iconInfo={{ size: 25, color: "#6190E8", value: "settings" }}
          />
        </AtList>
      ) : (
        <View style={{ padding: "20px", textAlign: "center" }}>
          <AtButton
            type='primary'
            onClick={() => Taro.navigateTo({ url: "/pages/login/index" })}
          >
            登录
          </AtButton>
        </View>
      )}
    </View>
  );
};

export default Profile;
