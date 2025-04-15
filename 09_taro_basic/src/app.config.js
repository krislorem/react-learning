export default defineAppConfig({
  rendererOptions: {
    skyline: {
      defaultDisplayBlock: true,
    }
  },
  pages: [
    'pages/index/index',
    'pages/components/webview/index',
    'pages/discover/index',
    'pages/profile/index',
    'pages/components/index',
    'pages/components/scroll-view/index',
    'pages/api/index',
    'pages/api/network/index',
    'pages/api/bluetooth/index',
    'pages/api/scan-code/index',
    'pages/product/index',
    'pages/login/index',
    'pages/account-book/index',
    'pages/business-card/index',
    'pages/music-box/index',
    'pages/basic/index',
    'pages/contact/index',
    'pages/container/index',
    'pages/device/index',
    'pages/device/movable-view/index',
    'pages/form/index',
    'pages/location/index',
    'pages/map/index',
    'pages/media/index',
    'pages/media/screenshot/index',
    'pages/media/clipboard/index',
    'pages/skyline/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#4594d5',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  },
  lazyCodeLoading: 'requiredComponents',
  requiredBackgroundModes: ['audio'],
  permission: {
    "scope.webview": {
      "desc": "用于加载网页内容"
    },
    "scope.userLocation": {
      "desc": "用于展示附近服务效果"
    }
  },
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
        pagePath: "pages/components/index",
        text: "组件",
        iconPath: "./assets/tabs/component.png",
        selectedIconPath: "./assets/tabs/component-active.png",
      },
      {
        pagePath: "pages/api/index",
        text: "API",
        iconPath: "./assets/tabs/api.png",
        selectedIconPath: "./assets/tabs/api-active.png",
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
