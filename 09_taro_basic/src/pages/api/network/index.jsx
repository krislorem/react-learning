import Taro, { useDidShow } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function NetworkDemo() {
  const [response, setResponse] = useState('')
  const [netType, setNetType] = useState('')

  useDidShow(() => {
    Taro.getNetworkType().then(res => setNetType(res.networkType))
  })

  const handleRequest = async () => {
    try {
      const res = await Taro.request({
        url: 'https://httpbin.org/get',
        method: 'GET'
      })
      setResponse(JSON.stringify(res.data, null, 2))
    } catch (err) {
      Taro.showToast({ title: '请求失败', icon: 'none' })
    }
  }

  return (
    <View className='container'>
      <Button className='btn' onClick={handleRequest}>发起请求</Button>
      <Text className='title'>网络类型：{netType}</Text>
      <View className='response'>
        <Text>响应结果：</Text>
        <Text selectable>{response}</Text>
      </View>
    </View>
  )
}
