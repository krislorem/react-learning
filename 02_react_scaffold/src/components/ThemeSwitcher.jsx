import { useRef } from 'react'
import { useThemeStore } from '../stores/themeStore'
import { gsap } from 'gsap'
import { Icon } from '@iconify/react'
import { ThemeIcon } from './ThemeIcon'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore()
  const buttonRef = useRef(null)

  const getCenterPosition = (element) => {
    const rect = element.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
  }
  const handleClick = async (e) => {
    const button = buttonRef.current
    const { x, y } = getCenterPosition(button)
    const targetTheme = theme === 'light' ? 'dark' : 'light'
    const mask = document.createElement('div')
    mask.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #fff;
      z-index: 9999;
      pointer-events: none;
      mix-blend-mode: difference;
    `
    // 添加临时类禁用过渡
    document.documentElement.classList.add('no-transition');
    if (targetTheme === 'dark') {
      mask.style.clipPath = `circle(0% at ${x}px ${y}px)`

      document.body.appendChild(mask)

      await gsap.to(mask, {
        clipPath: `circle(150% at ${x}px ${y}px)`,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          // 下一帧应用变化（减少布局抖动）
          requestAnimationFrame(() => {
            document.documentElement.setAttribute('data-theme', targetTheme);
            document.documentElement.classList.remove('no-transition');

            // 持久化存储
            localStorage.setItem('theme', targetTheme);
          });
        }
      })
      toggleTheme()
    } else {
      mask.style.clipPath = `circle(150% at ${x}px ${y}px)`
      document.body.appendChild(mask)
      toggleTheme()

      await gsap.to(mask, {
        clipPath: `circle(0% at ${x}px ${y}px)`,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => {
          // 下一帧应用变化（减少布局抖动）
          requestAnimationFrame(() => {
            document.documentElement.setAttribute('data-theme', targetTheme);
            document.documentElement.classList.remove('no-transition');

            // 持久化存储
            localStorage.setItem('theme', targetTheme);
          });
        }
      })
    }

    document.body.removeChild(mask)
  }

  return (
    <button
      ref={buttonRef}
      className="theme-switcher"
      onClick={handleClick}
      style={{
        // 添加过渡防止颜色突变
        transition: 'color 0.3s ease, transform 0.2s ease'
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <ThemeIcon />
    </button>
  )
}
