import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function BluetoothDemo() {
  const [devices, setDevices] = useState([])
  const [connected, setConnected] = useState(false)

  const startSearch = async () => {
    try {
      await Taro.openBluetoothAdapter()
      Taro.onBluetoothDeviceFound(res => {
        const newDevices = res.devices.filter(device =>
          !devices.some(d => d.deviceId === device.deviceId)
        )
        setDevices(prev => [...prev, ...newDevices])
      })

      await Taro.startBluetoothDevicesDiscovery()
    } catch (err) {
      Taro.showToast({ title: '初始化失败', icon: 'none' })
    }
  }

  const connectDevice = async (deviceId) => {
    try {
      const res = await Taro.createBLEConnection({ deviceId })
      setConnected(true)
      Taro.showToast({ title: '连接成功' })
    } catch (err) {
      Taro.showToast({ title: '连接失败', icon: 'none' })
    }
  }

  return (
    <View className='container'>
      <Button className='btn' onClick={startSearch}>搜索蓝牙设备</Button>

      <View className='device-list'>
        {devices.map(device => (
          <View key={device.deviceId} className='device-item'>
            <Text>{device.name || '未知设备'}</Text>
            <Button
              size='mini'
              onClick={() => connectDevice(device.deviceId)}
              disabled={connected}
            >
              {connected ? '已连接' : '连接'}
            </Button>
          </View>
        ))}
      </View>
    </View>
  )
}
