import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";
import CreatePost from "../pages/CreatePost";
import MovieList from "../pages/MovieList";
import MovieDetail from "../pages/MovieDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/movies" element={<MovieList />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
    </Routes>
  );
};

export default AppRoutes;
