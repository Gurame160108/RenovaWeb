import { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  LayoutGrid,
  Briefcase,
  ClipboardList,
  FileText,
  History,
  Bell,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ======================= SIDEBAR MANDOR ======================= */
const Sidebar = ({ navigate }) => (
  <div
    style={{
      width: 250,
      backgroundColor: "#1A1A1A",
      borderRight: "1px solid #2A2A2A",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Inter",
    }}
  >
    {/* HEADER */}
    <div style={{ padding: 20, borderBottom: "1px solid #2A2A2A" }}>
      <h1
        style={{
          margin: 0,
          color: "#FF8A00",
          fontSize: 26,
          fontWeight: "bold",
        }}
      >
        Renova Mandor
      </h1>
    </div>

    {/* MENU */}
    <nav
      style={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 6,
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
        active
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
      transition: "0.2s",
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

/* ======================= JADWAL KERJA ======================= */
const JadwalKerjaMandor = () => {
  const navigate = useNavigate();

  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");

  const [jadwal, setJadwal] = useState([
    { id: 1, tanggal: "2025-11-24", jam: "08:00", status: "approved" },
    { id: 2, tanggal: "2025-11-25", jam: "09:00", status: "pending" },
  ]);

  const submitJadwal = () => {
    if (!tanggal || !jam) {
      alert("Tanggal dan jam harus diisi!");
      return;
    }

    const newData = {
      id: jadwal.length + 1,
      tanggal,
      jam,
      status: "pending",
    };

    setJadwal([...jadwal, newData]);
    setTanggal("");
    setJam("");
    alert("Jadwal berhasil diajukan (menunggu persetujuan admin).");
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#0F0F0F",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Sidebar navigate={navigate} />

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 30 }}>
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>🗓 Jadwal Kerja Mandor</h2>

        {/* FORM BUAT JADWAL */}
        <div
          style={{
            background: "#1C1C1C",
            padding: 20,
            borderRadius: 12,
            marginBottom: 30,
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
        >
          <h3 style={{ marginBottom: 15 }}>Buat Jadwal Kerja</h3>

          <div style={{ display: "flex", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <label>Tanggal</label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>Jam Masuk</label>
              <input
                type="time"
                value={jam}
                onChange={(e) => setJam(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <button onClick={submitJadwal} style={btnPrimary}>
            <Plus size={16} /> Kirim Jadwal
          </button>
        </div>

        {/* LIST JADWAL */}
        <h3 style={{ marginBottom: 10 }}>Jadwal Anda</h3>

        {jadwal.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#1C1C1C",
              padding: 16,
              borderRadius: 10,
              marginBottom: 12,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderLeft: `5px solid ${
                item.status === "approved" ? "#3BEA62" : "#FF8A00"
              }`,
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 15 }}>
                <Calendar size={16} /> {item.tanggal}
              </p>
              <p style={{ margin: "4px 0", fontSize: 14 }}>
                <Clock size={16} /> {item.jam}
              </p>
            </div>

            <span
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                fontWeight: 600,
                background:
                  item.status === "approved" ? "#3BEA62" : "#FF8A00",
                color: "#000",
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ======================= STYLE ======================= */
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: 6,
  border: "1px solid #333",
  background: "#111",
  color: "white",
  marginTop: 6,
};

const btnPrimary = {
  marginTop: 20,
  background: "#FF8A00",
  border: "none",
  padding: "10px 16px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 8,
};

export default JadwalKerjaMandor;
