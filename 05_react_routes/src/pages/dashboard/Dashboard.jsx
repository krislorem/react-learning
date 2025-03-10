import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import "../../pages/nav.css";

const Dashboard = () => {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Welcome, {username}</h3>
      <nav>
        <NavLink activeClassName="active" to="profile">
          profile
        </NavLink>
        <NavLink activeClassName="active" to="setting">
          setting
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;
