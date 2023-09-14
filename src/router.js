import "./assets/global.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { App } from "./pages/profile/home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<App />} />
    </Routes>
  );
};
