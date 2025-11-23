import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Briefcase,
  ClipboardList,
  FileText,
  Calendar,
  History,
  Bell,
  User,
  X
} from "lucide-react";

const ProyekMandor = () => {
  const navigate = useNavigate();

  // Dummy proyek (sesuai ERD)
  const dataProyek = [
    {
      id_proyek: 1,
      nama_proyek: "Renovasi Rumah Pak Ahmad",
      user: "Ahmad Surya",
      arsitek: "Rafi Gunawan",
      status: "On Progress",
      desain: "/img/desain1.jpg",
      catatan: "Gunakan cat eksterior warna putih sesuai revisi.",
      revisi: "Perubahan desain ruang tamu – layout diperbesar 1 meter."
    },
    {
      id_proyek: 2,
      nama_proyek: "Pembangunan Ruko Bu Siti",
      user: "Siti Rahma",
      arsitek: "Fahri Pratama",
      status: "Pending",
      desain: "/img/desain2.jpg",
      catatan: "Tunggu konfirmasi revisi tahap ke-2.",
      revisi: "Revisi atap – material diganti ke spandek."
    },
    {
      id_proyek: 3,
      nama_proyek: "Villa Batu Malang",
      user: "Budi Santoso",
      arsitek: "Ganang Permadi",
      status: "Completed",
      desain: "/img/desain3.jpg",
      catatan: "Proyek selesai. Menunggu serah terima.",
      revisi: "Tidak ada revisi."
    }
  ];

  const [selected, setSelected] = useState(null);

  const openDetail = (item) => {
    setSelected(item);
  };

  const closeDetail = () => {
    setSelected(null);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#0F0F0F",
        color: "white",
        fontFamily: "Inter"
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#1A1A1A",
          borderRight: "1px solid #2A2A2A",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{ padding: "20px", borderBottom: "1px solid #2A2A2A" }}
        >
          <h1
            style={{
              margin: 0,
              color: "#FF8A00",
              fontSize: "26px",
              fontWeight: "bold"
            }}
          >
            Renova Mandor
          </h1>
        </div>

        <nav
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: 6
          }}
        >
          <MenuItem
            icon={<LayoutGrid size={18} />}
            label="Dashboard"
            onClick={() => navigate("/mandor/DashboardMandor")}
          />

          <MenuItem
            icon={<Briefcase size={18} />}
            label="Proyek Saya"
            active
            onClick={() => navigate("/mandor/ProyekMandor")}
          />

          <MenuItem
            icon={<ClipboardList size={18} />}
            label="Instruksi Arsitek"
            onClick={() => navigate("/mandor/InstruksiMandor")}
          />

          <MenuItem
            icon={<FileText size={18} />}
            label="Laporan Harian"
            onClick={() => navigate("/mandor/LaporanHarianMandor")}
          />

          <MenuItem
            icon={<Calendar size={18} />}
            label="Jadwal Kerja"
            onClick={() => navigate("/mandor/JadwalKerjaMandor")}
          />

          <MenuItem
            icon={<User size={18} />}
            label="Profil"
            onClick={() => navigate("/mandor/ProfilMandor")}
          />
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <header
          style={{
            padding: "20px",
            borderBottom: "1px solid #222",
            backgroundColor: "#1A1A1A"
          }}
        >
          <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>
            Proyek Saya
          </h2>
        </header>

        <main style={{ padding: 20 }}>
          <div
            style={{
              backgroundColor: "#1A1A1A",
              padding: 20,
              borderRadius: 10,
              border: "1px solid #2A2A2A"
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#FF8A00", textAlign: "left" }}>
                  <th style={{ padding: 12 }}>ID</th>
                  <th style={{ padding: 12 }}>Proyek</th>
                  <th style={{ padding: 12 }}>Klien</th>
                  <th style={{ padding: 12 }}>Arsitek</th>
                  <th style={{ padding: 12 }}>Status</th>
                  <th style={{ padding: 12 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataProyek.map((item) => (
                  <tr key={item.id_proyek} style={{ borderBottom: "1px solid #2A2A2A" }}>
                    <td style={{ padding: 12 }}>{item.id_proyek}</td>
                    <td style={{ padding: 12 }}>{item.nama_proyek}</td>
                    <td style={{ padding: 12 }}>{item.user}</td>
                    <td style={{ padding: 12 }}>{item.arsitek}</td>
                    <td style={{ padding: 12 }}>{item.status}</td>
                    <td style={{ padding: 12 }}>
                      <button
                        onClick={() => openDetail(item)}
                        style={{
                          padding: "6px 14px",
                          backgroundColor: "#FF8A00",
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer",
                          color: "black",
                          fontWeight: 600
                        }}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* POPUP DETAIL PROYEK */}
      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 20
          }}
        >
          <div
            style={{
              backgroundColor: "#1A1A1A",
              width: "600px",
              borderRadius: 10,
              border: "1px solid #2A2A2A"
            }}
          >
            <div
              style={{
                padding: "20px",
                borderBottom: "1px solid #2A2A2A",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <h3 style={{ margin: 0 }}>Detail Proyek</h3>
              <button
                onClick={closeDetail}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#999"
                }}
              >
                <X size={22} />
              </button>
            </div>

            <div style={{ padding: 20 }}>

              <p><strong>Nama Proyek:</strong> {selected.nama_proyek}</p>
              <p><strong>Klien:</strong> {selected.user}</p>
              <p><strong>Arsitek:</strong> {selected.arsitek}</p>
              <p><strong>Status:</strong> {selected.status}</p>

              <hr style={{ borderColor: "#2A2A2A", margin: "16px 0" }} />

              <p style={{ color: "#FF8A00", fontWeight: 600 }}>Desain Final:</p>
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  backgroundColor: "#333",
                  borderRadius: 8,
                  marginBottom: 15,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#777"
                }}
              >
                (Preview Gambar Dummy)
              </div>

              <p><strong>Catatan Arsitek:</strong> {selected.catatan}</p>

              <p><strong>Revisi Terakhir:</strong> {selected.revisi}</p>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
    onMouseEnter={(e) =>
      !active && (e.currentTarget.style.backgroundColor = "#2A2A2A")
    }
    onMouseLeave={(e) =>
      !active && (e.currentTarget.style.backgroundColor = "transparent")
    }
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default ProyekMandor;
