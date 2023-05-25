import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import App from "../pages";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
