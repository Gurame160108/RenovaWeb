import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Login from "./Pages/login.jsx";
import Registrasi from "./Pages/Registrasi.jsx";
import DashboardUser from "./user/DashbordUser.jsx";
import DashboardAdmin from "./admin/DashboardAdmin.jsx";
import RegisterAdmin from "./Pages/RegisterAdmin.jsx";
import UserManagement from "./admin/userManagement.jsx";
import OrderManagement from "./admin/orderManagement.jsx";
import ProgramKerja from "./admin/jadwalKerja.jsx";
import JanjiView from "./admin/janjiView.jsx";

function App() {
  return (
    <Routes>
      {/* Route utama menuju LandingPage */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Registrasi" element={<Registrasi />} />
      <Route path="/RegistrasiAdmin" element={<RegisterAdmin />} />
      <Route path = "/user/dashboard" element={<DashboardUser/>} />
      <Route path = "/admin/dashboard" element={<DashboardAdmin/>} />
      <Route path = "/admin/userManager" element={<UserManagement/>} />
      <Route path = "/admin/orderManegement" element={<OrderManagement/>} />
      <Route path = "/admin/jadwalKerja" element={<ProgramKerja/>} />
      <Route path = "/admin/JanjiView" element={<JanjiView/>} />


    </Routes>
  );
}

export default App;
