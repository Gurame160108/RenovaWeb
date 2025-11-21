import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, MoreHorizontal } from "lucide-react";

const LaporanMandor = () => {
  const navigate = useNavigate();

  // Data dummy
  const laporanMandor = [
    {
      id_laporanProject: 201,
      id_mandor: "Mandor Andi",
      id_proyek: "Rumah Bpk. Ahmad",
      foto: "https://via.placeholder.com/150",
      tahap_project: "Pemasangan Atap",
      tanggal: "20 Nov 2025",
    },
    {
      id_laporanProject: 202,
      id_mandor: "Mandor Joko",
      id_proyek: "Villa Bali",
      foto: "https://via.placeholder.com/150",
      tahap_project: "Finishing Dinding",
      tanggal: "19 Nov 2025",
    },
    {
      id_laporanProject: 203,
      id_mandor: "Mandor Rudi",
      id_proyek: "Renovasi Kantor Tech Startup",
      foto: "https://via.placeholder.com/150",
      tahap_project: "Pengecatan Ruangan",
      tanggal: "18 Nov 2025",
    },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#0B0D1A", color: "#F3F4F6", fontFamily: "Inter, system-ui, sans-serif" }}>
      
      {/* === SIDEBAR (SAMA PERSIS) === */}
      <div style={{ width: "256px", backgroundColor: "#12142A", borderRight: "1px solid #1A1D35", display: "flex", flexDirection: "column" }}>
        
        <div style={{ padding: "24px", borderBottom: "1px solid #1A1D35" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "white", margin: 0 }}>Renova</h1>
        </div>

        <nav style={{ flex: 1, padding: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", color: "#9CA3AF", cursor: "pointer" }}
            onClick={() => navigate('/arsitek/dashboard')}>
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Dashboard</span>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", color: "#9CA3AF", cursor: "pointer" }}
            onClick={() => navigate('/arsitek/instruksiMandorA')}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Instruksi Mandor</span>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", color: "#9CA3AF", cursor: "pointer" }}
            onClick={() => navigate('/arsitek/jadwalKerjaA')}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Jadwal Kerja</span>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", color: "#9CA3AF", cursor: "pointer" }}
            onClick={() => navigate('/arsitek/laporanProject')}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Laporan Kerja</span>
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", color: "#9CA3AF", cursor: "pointer" }}
            onClick={() => navigate('/arsitek/DesainRevisiArsitek')}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Desain Revisi</span>
          </div>

          {/* ACTIVE */}
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
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)"
            }}
          >
            ● <span style={{ fontSize: "14px", fontWeight: "500" }}>Laporan Mandor</span>
          </div>
        </nav>

        {/* Profile Section */}
        <div style={{ padding: "16px", borderTop: "1px solid #1A1D35", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "14px" }}>
            AR
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "white", margin: 0 }}>Arsitek</p>
            <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>Renova Architect</p>
          </div>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div style={{ flex: 1, overflow: "auto", backgroundColor: "#0B0D1A" }}>
        
        {/* Header */}
        <header style={{ backgroundColor: "#12142A", padding: "20px 28px", borderBottom: "1px solid #1A1D35" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "white", margin: 0 }}>
            <FileText size={18} style={{ marginRight: 8 }} /> Laporan Mandor
          </h2>
        </header>

        {/* CONTENT */}
        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* List Card */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
            {laporanMandor.map((lap) => (
              <div
                key={lap.id_laporanProject}
                style={{
                  backgroundColor: "#12142A",
                  borderRadius: "12px",
                  border: "1px solid #1A1D35",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}
              >
                
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ fontSize: "15px", fontWeight: "600", margin: 0, color: "white" }}>
                    Laporan #{lap.id_laporanProject}
                  </h3>
                  <MoreHorizontal size={20} color="#6B7280" />
                </div>

                {/* FOTO */}
                <img
                  src={lap.foto}
                  alt="Foto Laporan"
                  style={{ width: "100%", height: "180px", borderRadius: "8px", objectFit: "cover" }}
                />

                {/* INFO */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p style={{ fontSize: "13px", color: "#9CA3AF" }}>Mandor: <span style={{ color: "white" }}>{lap.id_mandor}</span></p>
                  <p style={{ fontSize: "13px", color: "#9CA3AF" }}>Proyek: <span style={{ color: "white" }}>{lap.id_proyek}</span></p>
                  <p style={{ fontSize: "13px", color: "#9CA3AF" }}>Tahap: <span style={{ color: "#7C3AED" }}>{lap.tahap_project}</span></p>
                  <p style={{ fontSize: "12px", color: "#6B7280" }}>{lap.tanggal}</p>
                </div>

                {/* ACTION BUTTONS */}
                <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                  <button
                    style={{
                      flex: 1,
                      backgroundColor: "#7C3AED",
                      border: "none",
                      padding: "10px 0",
                      color: "white",
                      fontSize: "13px",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    Beri Instruksi
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
                      cursor: "pointer"
                    }}
                  >
                    Minta Perbaikan
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

export default LaporanMandor;
