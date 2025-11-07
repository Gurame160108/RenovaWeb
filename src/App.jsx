import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Login from "./Pages/login.jsx";
import Registrasi from "./Pages/Registrasi.jsx";

function App() {
  return (
    <Routes>
      {/* Route utama menuju LandingPage */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Registrasi" element={<Registrasi />} />
    </Routes>
  );
}

export default App;
