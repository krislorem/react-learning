import { WebView } from "@tarojs/components"

export default function Webview() {
  const handleMessage = (event) => {
    console.log(event)
  }

  return (
    <WebView src='https://www.bilibili.com/' onMessage={handleMessage} />
  )
}

