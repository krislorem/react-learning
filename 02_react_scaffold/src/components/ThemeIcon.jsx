import { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Icon } from '@iconify/react'
import { useThemeStore } from '@/stores/themeStore'
import './themeIcon.scss'

export const ThemeIcon = () => {
  const { theme } = useThemeStore()
  const [showIcon, setShowIcon] = useState(true)
  const [currentIcon, setCurrentIcon] = useState(theme)

  useEffect(() => {
    setShowIcon(false)
  }, [theme])
  const nodeRef = useRef(null);
  return (
    <div className="icon-container">
      <CSSTransition
        nodeRef={nodeRef}
        in={showIcon}
        timeout={500}
        classNames="fade"
        unmountOnExit
        onExited={() => {
          setCurrentIcon(theme)
          setShowIcon(true)
        }}
      >
        <div ref={nodeRef} className="icon-wrapper">
          {currentIcon === 'light' ? (
            <Icon
              icon="line-md:sun-rising-loop"
              className="theme-icon"
              style={{ transform: 'scale(1)' }}
            />
          ) : (
            <Icon
              icon="line-md:moon-alt-loop"
              className="theme-icon"
              style={{ transform: 'scale(1)' }}
            />
          )}
        </div>
      </CSSTransition>
    </div>
  )
}
