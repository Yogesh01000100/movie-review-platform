import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
const BaseRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BaseRoute;
