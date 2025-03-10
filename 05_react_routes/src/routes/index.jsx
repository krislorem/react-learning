import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Profile from "../pages/dashboard/Profile";
import Setting from "../pages/dashboard/Setting";
import Dashboard from "../pages/dashboard/Dashboard";
import Fans from "../pages/dashboard/profile/Fans";
import Follow from "../pages/dashboard/profile/Follow";
import Login from "../pages/Login";
import Book from "../pages/Book";

import NavBar from "../components/NavBar";
import BlogDetails from "../components/BlogDetails";

const AppRoutes = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:bookId" element={<Book />} />
        <Route path="/blog/:blogIndex" element={<BlogDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<Fans />} />
            <Route path="fans" element={<Fans />} />
            <Route path="follow" element={<Follow />} />
          </Route>
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
