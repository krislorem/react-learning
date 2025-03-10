import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AppRoutes from "./routes";

import "./pages/nav.css";

const App = () => {
  return (
    <BrowserRouter>

      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
