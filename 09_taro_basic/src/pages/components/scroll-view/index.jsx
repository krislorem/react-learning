import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { useState } from 'react'
import './index.scss'

export default function ScrollViewDemo() {
  const [data, setData] = useState(Array.from({ length: 20 }, (_, i) => i + 1))
  const [refreshing, setRefreshing] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  // 下拉刷新 - 重置数据
  usePullDownRefresh(() => {
    setRefreshing(true)
    setTimeout(() => {
      setData(prev => [...Array.from({ length: 20 }, (_, i) => prev[0] - i - 1), ...prev])
      Taro.stopPullDownRefresh()
      // 添加滚动到顶部的功能
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
      setRefreshing(false)
    }, 1000)
  })

  // 处理上拉加载更多
  const handleScrollToLower = () => {
    if (loadingMore) return

    setLoadingMore(true)
    setTimeout(() => {
      setData(prev => {
        const lastItem = prev[prev.length - 1] || 0;
        return [...prev, ...Array.from({ length: 10 }, (_, i) => lastItem + i + 1)];
      });
      setLoadingMore(false);
    }, 1000);
  }

  return (
    <ScrollView
      scrollY
      refresherEnabled
      refresherTriggered={refreshing}
      onScrollToLower={handleScrollToLower}
      style={{ height: '100vh' }}
      lowerThreshold={100}
    >
      {refreshing && <View className='loading'>刷新中...</View>}
      {data.map((_, i) => (
        <View key={i} className='item'>
          列表项 {i + 1}
        </View>
      ))}
      {loadingMore && <View className='loading'>加载更多...</View>}
    </ScrollView>
  )
}
