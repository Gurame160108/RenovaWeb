import { Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import Login from "./Pages/login.jsx";
import Registrasi from "./Pages/Registrasi.jsx";
import DashboardAdmin from "./admin/DashboardAdmin.jsx";
import RegisterAdmin from "./Pages/RegisterAdmin.jsx";
import UserManagement from "./admin/userManagement.jsx";
import OrderManagement from "./admin/orderManagement.jsx";
import ProgramKerja from "./admin/jadwalKerja.jsx";
import JanjiView from "./admin/janjiView.jsx";

//mandor
import ProyekMandor from "./mandor/proyekMandor.jsx";
import DashboardMandor from "./mandor/DashboardMandor.jsx";
import InstruksiMandor from "./mandor/InstruksiMandor.jsx";
import LaporanHarianMandor from "./mandor/LaporanHarianMandor.jsx";
import JadwalKerjaMandor from "./mandor/JadwalKerjaMandor.jsx";
import ProfilMandor from "./mandor/ProfilMandor.jsx";


import DashboardUser from "./user/DashboardUser.jsx";

import LaporanMandor from "./arsitek/LaporanMandor.jsx";
import IntruksiMandor from "./arsitek/InstruksiMandorA.jsx";
import DesainRevisiArsitek from "./arsitek/DesainRevisiArsitek.jsx";
import LaporanProject from "./arsitek/laporanProject.jsx";
import DashboardArsitek from "./arsitek/DashboardArsitek.jsx";
import JadwalKerja from "./arsitek/jadwalKerjaA.jsx";


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
      <Route path = "/mandor/DashboardMandor" element={<DashboardMandor/>} />
      <Route path = "/mandor/ProyekMandor" element={<ProyekMandor/>} />
      <Route path = "/mandor/instruksiMandor" element={<InstruksiMandor/>} />
      <Route path = "/mandor/laporanHarianMandor" element={<LaporanHarianMandor/>} />
      <Route path = "/mandor/JadwalKerjaMandor" element={<JadwalKerjaMandor/>} />
      <Route path = "/mandor/ProfilMandor" element={<ProfilMandor/>} /> 
      <Route path = "/arsitek/dashboard" element={<DashboardArsitek/>} /> 
      <Route path = "/arsitek/jadwalKerjaA" element={<JadwalKerja/>} />
      <Route path = "/arsitek/laporanProject" element={<LaporanProject/>} />
      <Route path = "/arsitek/DesainRevisiArsitek" element={<DesainRevisiArsitek/>} />
      <Route path = "/arsitek/laporanMandor" element={<LaporanMandor/>} />
      <Route path = "/arsitek/instruksiMandorA" element={<IntruksiMandor/>} />
    </Routes>
  );
}

export default App;
