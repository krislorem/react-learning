import React from 'react'
import { BrowserRouter } from 'react-router'
import AppRoutes from './routes'
import './App.css'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
