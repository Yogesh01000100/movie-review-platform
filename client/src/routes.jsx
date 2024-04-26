import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/Home";
import NotFound from "./components/auth/Redirect";

const BaseRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default BaseRoute;
