import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Briefcase, Calendar, ClipboardList, FileText, History, LayoutGrid, User } from "lucide-react";

const DashboardMandor = () => {
  const navigate = useNavigate();

  // Dummy data sesuai ERD
  const proyekAktif = 4;
  const laporanHariIni = 1;
  const jadwalHariIni = { tanggal: "2025-11-23", jam: "08:00" };
  const desainBaru = 2;
  const notifBaru = 3;

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#0F0F0F", color: "white", fontFamily: "Inter" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "250px",
        backgroundColor: "#1A1A1A",
        borderRight: "1px solid #2A2A2A",
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #2A2A2A" }}>
          <h1 style={{ margin: 0, color: "#FF8A00", fontSize: "26px", fontWeight: "bold" }}>Renova Mandor</h1>
        </div>

        {/* Menu */}
        <nav style={{ padding: "10px", display: "flex", flexDirection: "column", gap: 6 }}>

          {/* Dashboard */}
          <MenuItem icon={<LayoutGrid size={18} />} label="Dashboard" active onClick={() => navigate("/mandor/DashboardMandor")} />

          <MenuItem icon={<Briefcase size={18} />} label="Proyek Saya" onClick={() => navigate("/mandor/ProyekMandor")} />

          <MenuItem icon={<ClipboardList size={18} />} label="Instruksi Arsitek" onClick={() => navigate("/mandor/InstruksiMandor")} />

          <MenuItem icon={<FileText size={18} />} label="Laporan Harian" onClick={() => navigate("/mandor/LaporanHarianMandor")} />

          <MenuItem icon={<Calendar size={18} />} label="Jadwal Kerja" onClick={() => navigate("/mandor/JadwalKerjaMandor")} />

          <MenuItem icon={<User size={18} />} label="Profil" onClick={() => navigate("/mandor/ProfilMandor")} />

        </nav>

        {/* Footer Profile */}
        <div style={{
          marginTop: "auto",
          padding: "15px",
          borderTop: "1px solid #2A2A2A",
          display: "flex",
          alignItems: "center",
          gap: 12
        }}>
          <div style={{
            width: 40, height: 40,
            background: "#FF8A00",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold"
          }}>
            MD
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Maman Darto</p>
            <p style={{ margin: 0, fontSize: 11, color: "#999" }}>Mandor</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <header style={{
          padding: "20px",
          borderBottom: "1px solid #222",
          backgroundColor: "#1A1A1A"
        }}>
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>Dashboard Mandor</h2>
        </header>

        <main style={{ padding: 20 }}>

          {/* Cards Section */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>

            <Card title="Proyek Aktif" value={proyekAktif} color="#FF8A00" />

            <Card title="Laporan Hari Ini" value={laporanHariIni} color="#4CAF50" />

            <Card title="Instruksi Baru" value={desainBaru} color="#00A8FF" />

          </div>

          {/* Jadwal Hari Ini */}
          <div style={{ marginTop: 30 }}>
            <h3 style={{ marginBottom: 10, color: "#FF8A00" }}>Jadwal Kerja Hari Ini</h3>
            <div style={{
              backgroundColor: "#1A1A1A",
              padding: 20,
              borderRadius: 10,
              border: "1px solid #2A2A2A"
            }}>
              <p style={{ margin: 0, fontSize: 15 }}>Tanggal: {jadwalHariIni.tanggal}</p>
              <p style={{ margin: 0, fontSize: 15 }}>Jam Masuk: {jadwalHariIni.jam}</p>
            </div>
          </div>

          {/* Notifikasi Terbaru */}
          <div style={{ marginTop: 30 }}>
            <h3 style={{ marginBottom: 10, color: "#FF8A00" }}>Notifikasi Terbaru</h3>
            <div style={{
              backgroundColor: "#1A1A1A",
              padding: 20,
              borderRadius: 10,
              border: "1px solid #2A2A2A"
            }}>
              <p style={{ margin: 0 }}>Kamu punya <b>{notifBaru}</b> notifikasi belum dibaca.</p>
            </div>
          </div>

        </main>
      </div>

    </div>
  );
};


// MENU COMPONENT (BIAR GAMPANG)
const MenuItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 12px",
      borderRadius: 8,
      cursor: "pointer",
      backgroundColor: active ? "#FF8A00" : "transparent",
      color: active ? "black" : "#ccc",
      fontWeight: active ? 600 : 500,
      transition: "0.2s"
    }}
    onMouseEnter={(e) => !active && (e.currentTarget.style.backgroundColor = "#2A2A2A")}
    onMouseLeave={(e) => !active && (e.currentTarget.style.backgroundColor = "transparent")}
  >
    {icon}
    <span>{label}</span>
  </div>
);


// CARD COMPONENT
const Card = ({ title, value, color }) => (
  <div style={{
    backgroundColor: "#1A1A1A",
    padding: 20,
    borderRadius: 10,
    border: "1px solid #2A2A2A"
  }}>
    <p style={{ margin: 0, color: "#999", fontSize: 14 }}>{title}</p>
    <h2 style={{ margin: "10px 0 0", fontSize: 28, color }}>{value}</h2>
  </div>
);

export default DashboardMandor;
