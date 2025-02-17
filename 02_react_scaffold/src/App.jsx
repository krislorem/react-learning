import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom'
import { useThemeStore } from '@/stores/themeStore'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { RouteTransition } from './components/RouteTransition';
import Layout from '@/components/Layout';
// 异步加载页面组件
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Routes>
      {/* 父路由包含布局 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
