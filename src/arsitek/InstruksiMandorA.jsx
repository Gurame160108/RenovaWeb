import React from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, MoreHorizontal } from "lucide-react";

const InstruksiMandorA = () => {
  const navigate = useNavigate();

  // Data Dummy Instruksi (sesuai ERD: laporanDesign)
  const instruksiList = [
    {
      id_design: 501,
      id_proyek: "Rumah Bpk. Ahmad",
      id_user: "Arsitek Rina",
      keterangan: "Gunakan cat eksterior anti air warna abu muda untuk dinding depan.",
      gambar: "https://via.placeholder.com/150",
      tanggal: "20 Nov 2025",
    },
    {
      id_design: 502,
      id_proyek: "Villa Bali",
      id_user: "Arsitek Tono",
      keterangan: "Perbaiki kemiringan atap kayu, gunakan material kelas A.",
      gambar: "https://via.placeholder.com/150",
      tanggal: "19 Nov 2025",
    },
    {
      id_design: 503,
      id_proyek: "Renovasi Kantor Tech Startup",
      id_user: "Arsitek Rina",
      keterangan: "Tambahkan gypsum pada ruangan meeting dan rapikan instalasi kabel.",
      gambar: "https://via.placeholder.com/150",
      tanggal: "17 Nov 2025",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#0B0D1A",
        color: "#F3F4F6",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* === SIDEBAR (SAMA 100%) === */}
      <div
        style={{
          width: "256px",
          backgroundColor: "#12142A",
          borderRight: "1px solid #1A1D35",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #1A1D35",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
              margin: 0,
            }}
          >
            Renova
          </h1>
        </div>

        <nav
          style={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#9CA3AF",
              cursor: "pointer",
            }}
            onClick={() => navigate("/arsitek/dashboard")}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Dashboard</span>
          </div>
                    {/* ACTIVE PAGE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              backgroundColor: "#7C3AED",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
            }}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>
              Instruksi Mandor
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#9CA3AF",
              cursor: "pointer",
            }}
            onClick={() => navigate("/arsitek/jadwalKerjaA")}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Jadwal Kerja</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#9CA3AF",
              cursor: "pointer",
            }}
            onClick={() => navigate("/arsitek/laporanProject")}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Laporan Kerja</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#9CA3AF",
              cursor: "pointer",
            }}
            onClick={() => navigate("/arsitek/DesainRevisiArsitek")}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Desain Revisi</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "8px",
              color: "#9CA3AF",
              cursor: "pointer",
            }}
            onClick={() => navigate("/arsitek/laporanMandor")}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Laporan Mandor</span>
          </div>
        </nav>

        {/* Profile */}
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #1A1D35",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#7C3AED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            AR
          </div>
          <div>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
                margin: 0,
              }}
            >
              Arsitek
            </p>
            <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>
              Renova Architect
            </p>
          </div>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          backgroundColor: "#0B0D1A",
        }}
      >
        {/* Header */}
        <header
          style={{
            backgroundColor: "#12142A",
            padding: "20px 28px",
            borderBottom: "1px solid #1A1D35",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "white",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ClipboardList size={18} /> Instruksi Mandor
          </h2>
        </header>

        {/* CONTENT */}
        <main
          style={{
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {/* CARD GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "20px",
            }}
          >
            {instruksiList.map((ins) => (
              <div
                key={ins.id_design}
                style={{
                  backgroundColor: "#12142A",
                  borderRadius: "12px",
                  border: "1px solid #1A1D35",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      margin: 0,
                      color: "white",
                    }}
                  >
                    Instruksi #{ins.id_design}
                  </h3>
                  <MoreHorizontal size={20} color="#6B7280" />
                </div>

                {/* Gambar */}
                <img
                  src={ins.gambar}
                  alt="Instruksi"
                  style={{
                    width: "100%",
                    height: "180px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />

                {/* Detail */}
                <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
                  Proyek: <span style={{ color: "white" }}>{ins.id_proyek}</span>
                </p>
                <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
                  Dari: <span style={{ color: "white" }}>{ins.id_user}</span>
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#D1D5DB",
                    marginTop: "4px",
                  }}
                >
                  {ins.keterangan}
                </p>
                <p style={{ fontSize: "12px", color: "#6B7280" }}>{ins.tanggal}</p>

                {/* ACTIONS */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    style={{
                      flex: 1,
                      backgroundColor: "#7C3AED",
                      border: "none",
                      padding: "10px 0",
                      color: "white",
                      fontSize: "13px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Kirim ke Mandor
                  </button>

                  <button
                    style={{
                      flex: 1,
                      backgroundColor: "#F59E0B",
                      border: "none",
                      padding: "10px 0",
                      color: "#0B0D1A",
                      fontSize: "13px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Edit Instruksi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstruksiMandorA;
