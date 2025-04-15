import Taro from '@tarojs/taro'
import { MovableArea, MovableView, Text, View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function MovableViewDemo() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [direction] = useState(['vertical', 'horizontal', 'none'])

  return (
    <View className='container'>
      <Text className='title'>拖动方向演示</Text>
      <MovableArea className='area'>
        <MovableView
          className='view'
          direction={direction[0]}
          inertia
          x={position.x}
          y={position.y}
          onTouchEnd={() => {
            Taro.vibrateShort()
            setPosition({ x: 0, y: 0 })
          }}
        >
          垂直拖动
        </MovableView>
      </MovableArea>

      <MovableArea className='area'>
        <MovableView
          className='view'
          direction={direction[1]}
          inertia
          bounds={{ left: 0, right: 300, top: 0, bottom: 0 }}
        >
          水平拖动（限制范围）
        </MovableView>
      </MovableArea>

      <MovableArea className='area' style={{ height: '400rpx', width: '100%' }}>
        <MovableView
          className='view'
          direction={direction[2]}
          scale
          scaleMin={0.5}
          scaleMax={2}
          onScale={(e) => {
            Taro.vibrateShort();
            console.log('当前缩放比例:', e.detail.scale);
          }}
        >
          双指缩放
        </MovableView>
      </MovableArea>
    </View>
  )
}
