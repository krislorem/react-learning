// babel-preset-taro 更多选项和默认值：
// https://docs.taro.zone/docs/next/babel-config
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: false,
      compiler: 'vite',
      useBuiltIns: process.env.TARO_ENV === 'h5' ? 'usage' : false
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ]
}
