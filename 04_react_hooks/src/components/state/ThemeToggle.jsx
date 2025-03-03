import { useState } from 'react'

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleTheme = () => {
    setIsDarkMode((mode) => !mode)
  }
  return (
    <div style={{ height: "100vh", background: isDarkMode ? 'black' : 'white', color: isDarkMode ? "white" : "black" }}>
      <h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, odit, hic quae laudantium voluptatibus odio earum expedita repellat repellendus quo dolor fugiat quaerat veniam soluta porro architecto nostrum. Asperiores, quam!
      </h2>
      <button onClick={toggleTheme}>切换到 {isDarkMode ? '白天' : '暗黑'}</button>
    </div>
  )
}

export default ThemeToggle
