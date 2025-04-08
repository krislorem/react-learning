export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/discover/index',
    'pages/profile/index',
    'pages/product/index',
    'pages/login/index',
    'pages/account-book/index',
    'pages/business-card/index',
    'pages/music-box/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#4594d5',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  },
  requiredBackgroundModes: ['audio'],
  tabBar: {
    color: "#999",
    selectedColor: "#1296df",
    backgroundColor: "#fff",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/tabs/home.png",
        selectedIconPath: "./assets/tabs/home-active.png",
      },
      {
        pagePath: "pages/discover/index",
        text: "发现",
        iconPath: "./assets/tabs/discover.png",
        selectedIconPath: "./assets/tabs/discover-active.png",
      },
      {
        pagePath: "pages/profile/index",
        text: "我的",
        iconPath: "./assets/tabs/profile.png",
        selectedIconPath: "./assets/tabs/profile-active.png",
      },
    ],
  },
  cloud: true,
})
