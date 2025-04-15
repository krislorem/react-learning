import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function ScanCodeDemo() {
  const [result, setResult] = useState('')
  const [scanType, setScanType] = useState('')

  const handleScan = async (type) => {
    try {
      const res = await Taro.scanCode({
        onlyFromCamera: true,
        scanType: [type]
      })
      setResult(res.result)
      setScanType(res.scanType)
    } catch (err) {
      Taro.showToast({ title: '扫描失败', icon: 'none' })
    }
  }

  return (
    <View className='container'>
      <Button
        className='btn'
        onClick={() => handleScan('qrCode')}
      >
        扫描二维码
      </Button>

      <Button
        className='btn'
        onClick={() => handleScan('barCode')}
      >
        扫描条形码
      </Button>

      {result && (
        <View className='result'>
          <Text className='title'>扫描类型：{scanType}</Text>
          <Text className='content'>扫描结果：{result}</Text>
        </View>
      )}
    </View>
  )
}
