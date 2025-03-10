import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../../pages/nav.css";

const Profile = () => {
  return (
    <div>
      <h2>Profile</h2>
      <div className="content">
        <nav className="nav-colum">
          <NavLink activeClassName="active" to="fans">
            fans
          </NavLink>
          <NavLink activeClassName="active" to="follow">
            follow
          </NavLink>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
