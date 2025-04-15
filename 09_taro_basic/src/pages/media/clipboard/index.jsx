import Taro from '@tarojs/taro'
import { View, Button, Text, Input } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function ClipboardDemo() {
  const [inputValue, setInputValue] = useState('')
  const [clipboardData, setClipboardData] = useState('')

  const handleCopy = async () => {
    if (!inputValue) return
    try {
      await Taro.setClipboardData({ data: inputValue })
      Taro.showToast({ title: '复制成功' })
    } catch (err) {
      Taro.showToast({ title: '复制失败', icon: 'none' })
    }
  }

  const handlePaste = async () => {
    try {
      const { data } = await Taro.getClipboardData()
      setClipboardData(data || '暂无内容')
    } catch (err) {
      Taro.showToast({ title: '读取失败', icon: 'none' })
    }
  }

  return (
    <View className='container'>
      <View className='section'>
        <Input
          className='input'
          placeholder='输入要复制的文本'
          onInput={(e) => setInputValue(e.detail.value)}
        />
        <Button className='btn' onClick={handleCopy}>复制到剪贴板</Button>
      </View>

      <View className='section'>
        <Button className='btn' onClick={handlePaste}>读取剪贴板内容</Button>
        <Text className='content'>剪贴板内容：{clipboardData}</Text>
      </View>
    </View>
  )
}
