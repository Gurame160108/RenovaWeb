import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JadwalKerjaA = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("arsitek");
  const [searchTerm, setSearchTerm] = useState("");

  // --- DATA JADWAL MANDOR ---
  const [jadwalArsitek] = useState([
    { id: 1, nama_program: "Renovasi Rumah Bpk. Ahmad", tanggal_kerja: "2025-11-21", jam_masuk: "08:00", status_persetujuan: "disetujui", admin: "paeng" },
    { id: 2, nama_program: "Bangun Gedung Kantor PT. XYZ", tanggal_kerja: "2025-11-21", jam_masuk: "09:30", status_persetujuan: "menunggu", admin: "paeng" },
    { id: 3, nama_program: "Interior Apartemen Green Lake", tanggal_kerja: "2025-11-20", jam_masuk: "07:45", status_persetujuan: "ditolak", admin: "paeng" },
  ]);

  // --- DATA JADWAL KONSULTASI ---
  const [jadwalKonsultasi] = useState([
    { id_janji: 11, nama_user: "Budi", tanggal_kerja: "2025-11-22", jam_masuk: "13:00", status: "disetujui" },
    { id_janji: 12, nama_user: "Cici", tanggal_kerja: "2025-11-23", jam_masuk: "10:00", status: "menunggu" },
    { id_janji: 13, nama_user: "Eka", tanggal_kerja: "2025-11-23", jam_masuk: "15:30", status: "ditolak" },
  ]);

  const getStatusBadge = (status) => {
    const map = {
      disetujui: { bg: "#15803D33", color: "#86EFAC" },
      menunggu: { bg: "#D9770633", color: "#FDE047" },
      ditolak: { bg: "#B91C1C33", color: "#FCA5A5" },
    };
    return {
      ...map[status] || map.menunggu,
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "11px",
      fontWeight: "600",
      textTransform: "uppercase",
    };
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#0B0D1A", color: "#F3F4F6", fontFamily: "Inter, sans-serif" }}>
      
      {/* SIDEBAR */}
      <div style={{ width: "256px", backgroundColor: "#12142A", borderRight: "1px solid #1A1D35", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #1A1D35" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>Renova</h1>
        </div>

        {/* MENU */}
        <nav style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          
          {/* LIST MENU */}
          <div
            onClick={() => navigate("/arsitek/dashboard")}
            style={{ ...menuItemStyle(false) }}
          >
            <span style={dotStyle}>●</span> Dashboard
          </div>

          <div
            onClick={() => navigate("/arsitek/InstruksiMandorA")}
            style={menuItemStyle(false)}
          >
            <span style={dotStyle}>●</span> Instruksi Mandor
          </div>

          {/* --- MENU JADWAL (ACTIVE) --- */}
          <div
            onClick={() => navigate("/arsitek/JadwalKerjaA")}
            style={menuItemStyle(true)}
          >
            <span style={dotStyle}>●</span> Jadwal Kerja
          </div>

          {/* SUBMENU (DITARUH DI BAWAH JADWAL) */}
          <div style={{ marginLeft: "34px", marginTop: "6px", display: "flex", flexDirection: "column", gap: "6px" }}>
            
            <div
              onClick={() => setActiveTab("arsitek")}
              style={{
                ...submenuStyle,
                backgroundColor: activeTab === "arsitek" ? "#7C3AED55" : "transparent",
                color: activeTab === "arsitek" ? "white" : "#9CA3AF",
              }}
            >
              • Jadwal Arsitek
            </div>

            <div
              onClick={() => setActiveTab("konsultasi")}
              style={{
                ...submenuStyle,
                backgroundColor: activeTab === "konsultasi" ? "#7C3AED55" : "transparent",
                color: activeTab === "konsultasi" ? "white" : "#9CA3AF",
              }}
            >
              • Jadwal Konsultasi
            </div>

          </div>

          <div
            onClick={() => navigate("/arsitek/laporanProject")}
            style={menuItemStyle(false)}
          >
            <span style={dotStyle}>●</span> Laporan Kerja
          </div>

          <div
            onClick={() => navigate("/arsitek/DesainRevisiArsitek")}
            style={menuItemStyle(false)}
          >
            <span style={dotStyle}>●</span> Desain Revisi
          </div>

          <div
            onClick={() => navigate("/arsitek/laporanMandor")}
            style={menuItemStyle(false)}
          >
            <span style={dotStyle}>●</span> Laporan Mandor
          </div>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflow: "auto", padding: "28px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "24px" }}>
          {activeTab === "arsitek" ? "Jadwal Kerja Arsitek" : "Jadwal Konsultasi"}
        </h2>

        {/* SEARCH */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
          <div style={{ position: "relative", width: "320px" }}>
            <Search
              size={18}
              color="#6B7280"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={searchInputStyle}
            />
          </div>
        </div>

        {/* TABLE */}
        <div style={tableCardStyle}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={tableHeaderRowStyle}>
                {activeTab === "arsitek" ? (
                  <>
                    <th style={thStyle}>ID</th>
                    <th style={thStyle}>Nama Program</th>
                    <th style={thStyle}>Tanggal Kerja</th>
                    <th style={thStyle}>Jam Masuk</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Admin</th>
                  </>
                ) : (
                  <>
                    <th style={thStyle}>ID Janji</th>
                    <th style={thStyle}>Nama Klien</th>
                    <th style={thStyle}>Tanggal</th>
                    <th style={thStyle}>Jam</th>
                    <th style={thStyle}>Status</th>
                  </>
                )}
              </tr>
            </thead>

            <tbody>
              {activeTab === "arsitek"
                ? jadwalArsitek.map((s) => (
                    <tr key={s.id} style={tableRowStyle}>
                      <td style={tdStyle}>{s.id}</td>
                      <td style={{ ...tdStyle, fontWeight: "500" }}>{s.nama_program}</td>
                      <td style={tdMuted}>{s.tanggal_kerja}</td>
                      <td style={tdMuted}>{s.jam_masuk}</td>
                      <td style={tdStyle}>
                        <span style={getStatusBadge(s.status_persetujuan)}>{s.status_persetujuan}</span>
                      </td>
                      <td style={tdMuted}>{s.admin}</td>
                    </tr>
                  ))
                : jadwalKonsultasi.map((j) => (
                    <tr key={j.id_janji} style={tableRowStyle}>
                      <td style={tdStyle}>{j.id_janji}</td>
                      <td style={{ ...tdStyle, fontWeight: "500" }}>{j.nama_user}</td>
                      <td style={tdMuted}>{j.tanggal_kerja}</td>
                      <td style={tdMuted}>{j.jam_masuk}</td>
                      <td style={tdStyle}>
                        <span style={getStatusBadge(j.status)}>{j.status}</span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ---------- STYLE OBJECTS ---------- */
const menuItemStyle = (active) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "10px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  backgroundColor: active ? "#7C3AED" : "transparent",
  color: active ? "white" : "#9CA3AF",
  fontSize: "14px",
});

const submenuStyle = {
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "13px",
};

const dotStyle = { fontSize: "16px" };

const searchInputStyle = {
  width: "100%",
  padding: "10px 12px 10px 40px",
  borderRadius: "8px",
  border: "1px solid #1A1D35",
  background: "#12142A",
  color: "white",
  outline: "none",
};

const tableCardStyle = {
  background: "#12142A",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #1A1D35",
};

const tableHeaderRowStyle = {
  color: "#6B7280",
  fontSize: "12px",
  borderBottom: "1px solid #1A1D35",
};

const thStyle = { padding: "12px 24px", textAlign: "left" };

const tableRowStyle = {
  borderBottom: "1px solid #1A1D35",
  color: "white",
};

const tdStyle = { padding: "16px 24px" };

const tdMuted = {
  padding: "16px 24px",
  color: "#9CA3AF",
};

export default JadwalKerjaA;
  