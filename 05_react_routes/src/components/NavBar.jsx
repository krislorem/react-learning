import React from 'react'
import { NavLink } from 'react-router-dom'
const NavBar = () => {
  return (
    <div>
      <nav>
        <NavLink activeClassName="active" to="/">
          Home
        </NavLink>
        <NavLink activeClassName="active" to="/about?name=zhangsan&age=20">
          About
        </NavLink>
        <NavLink activeClassName="active" to="/dashboard">
          Dashboard
        </NavLink>
        <NavLink activeClassName="active" to="/book/123">
          Book
        </NavLink>
      </nav>
    </div>
  )
}

export default NavBar
