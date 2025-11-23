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

const InstruksiMandor = () => {
  const navigate = useNavigate();

  // Dummy instruksi dari arsitek (sesuai ERD)
  const instruksiData = [
    {
      id: 1,
      id_proyek: 1,
      proyek: "Renovasi Rumah Pak Ahmad",
      arsitek: "Rafi Gunawan",
      tipe: "Desain Final",
      tanggal: "2025-11-12",
      gambar: "/img/desain1.jpg",
      catatan: "Gunakan cat eksterior warna putih sesuai permintaan klien.",
      revisi: "Revisi ruang tamu – layout diperbesar."
    },
    {
      id: 2,
      id_proyek: 1,
      proyek: "Renovasi Rumah Pak Ahmad",
      arsitek: "Rafi Gunawan",
      tipe: "Revisi",
      tanggal: "2025-11-20",
      gambar: "/img/revisi1.jpg",
      catatan: "Perubahan material keramik. Gunakan motif kayu.",
      revisi: "Keramik diganti ke 60x60 motif kayu."
    },
    {
      id: 3,
      id_proyek: 2,
      proyek: "Pembangunan Ruko Bu Siti",
      arsitek: "Fahri Pratama",
      tipe: "Desain Final",
      tanggal: "2025-10-05",
      gambar: "/img/desain2.jpg",
      catatan: "Ukuran pintu depan diperbesar 15 cm.",
      revisi: "Tidak ada revisi."
    }
  ];

  const [selected, setSelected] = useState(null);

  const openDetail = (item) => setSelected(item);
  const closeDetail = () => setSelected(null);

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
      <Sidebar navigate={navigate} />

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <header
          style={{
            padding: "20px",
            backgroundColor: "#1A1A1A",
            borderBottom: "1px solid #222"
          }}
        >
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600 }}>
            Instruksi Arsitek
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
                  <th style={{ padding: 12 }}>Proyek</th>
                  <th style={{ padding: 12 }}>Arsitek</th>
                  <th style={{ padding: 12 }}>Tipe</th>
                  <th style={{ padding: 12 }}>Tanggal</th>
                  <th style={{ padding: 12 }}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {instruksiData.map((item) => (
                  <tr
                    key={item.id}
                    style={{ borderBottom: "1px solid #2A2A2A" }}
                  >
                    <td style={{ padding: 12 }}>{item.proyek}</td>
                    <td style={{ padding: 12 }}>{item.arsitek}</td>
                    <td style={{ padding: 12 }}>{item.tipe}</td>
                    <td style={{ padding: 12 }}>{item.tanggal}</td>

                    <td style={{ padding: 12 }}>
                      <button
                        onClick={() => openDetail(item)}
                        style={{
                          padding: "6px 14px",
                          backgroundColor: "#FF8A00",
                          color: "black",
                          fontWeight: 600,
                          border: "none",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}
                      >
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* MODAL DETAIL */}
      {selected && (
        <DetailModal data={selected} closeDetail={closeDetail} />
      )}
    </div>
  );
};

/* ======================= SIDEBAR ======================= */

const Sidebar = ({ navigate }) => (
  <div
    style={{
      width: 250,
      backgroundColor: "#1A1A1A",
      borderRight: "1px solid #2A2A2A",
      display: "flex",
      flexDirection: "column"
    }}
  >
    <div style={{ padding: 20, borderBottom: "1px solid #2A2A2A" }}>
      <h1
        style={{
          margin: 0,
          color: "#FF8A00",
          fontSize: 26,
          fontWeight: "bold"
        }}
      >
        Renova Mandor
      </h1>
    </div>

    <nav
      style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}
    >
      <MenuItem
        icon={<LayoutGrid size={18} />}
        label="Dashboard"
        onClick={() => navigate("/mandor/DashboardMandor")}
      />

      <MenuItem
        icon={<Briefcase size={18} />}
        label="Proyek Saya"
        onClick={() => navigate("/mandor/ProyekMandor")}
      />

      <MenuItem
        icon={<ClipboardList size={18} />}
        label="Instruksi Arsitek"
        active
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
);

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

/* ======================= MODAL ======================= */

const DetailModal = ({ data, closeDetail }) => (
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
        width: 600,
        borderRadius: 10,
        border: "1px solid #2A2A2A"
      }}
    >
      <div
        style={{
          padding: 20,
          borderBottom: "1px solid #2A2A2A",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <h3 style={{ margin: 0 }}>Detail Instruksi</h3>
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
        <p><strong>Proyek:</strong> {data.proyek}</p>
        <p><strong>Arsitek:</strong> {data.arsitek}</p>
        <p><strong>Tipe Instruksi:</strong> {data.tipe}</p>
        <p><strong>Tanggal:</strong> {data.tanggal}</p>

        <div
          style={{
            marginTop: 15,
            width: "100%",
            height: 180,
            backgroundColor: "#333",
            borderRadius: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#777"
          }}
        >
          (Preview Gambar Dummy)
        </div>

        <p style={{ marginTop: 20 }}><strong>Catatan Arsitek:</strong> {data.catatan}</p>

        <p><strong>Revisi Terakhir:</strong> {data.revisi}</p>
      </div>
    </div>
  </div>
);

export default InstruksiMandor;
