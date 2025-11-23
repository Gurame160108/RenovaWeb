import { useState } from "react";
import {
  LayoutGrid,
  Briefcase,
  ClipboardList,
  FileText,
  Calendar,
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
    <div style={{ padding: 20, borderBottom: "1px solid #2A2A2A" }}>
      <h1 style={{ margin: 0, color: "#FF8A00", fontSize: 26, fontWeight: "bold" }}>
        Renova Mandor
      </h1>
    </div>

    <nav style={{ padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
      <MenuItem icon={<LayoutGrid size={18} />} label="Dashboard" onClick={() => navigate("/mandor/DashboardMandor")} />
      <MenuItem icon={<Briefcase size={18} />} label="Proyek Saya" onClick={() => navigate("/mandor/ProyekMandor")} />
      <MenuItem icon={<ClipboardList size={18} />} label="Instruksi Arsitek" onClick={() => navigate("/mandor/InstruksiMandor")} />
      <MenuItem icon={<FileText size={18} />} label="Laporan Harian" onClick={() => navigate("/mandor/LaporanHarianMandor")} />
      <MenuItem icon={<Calendar size={18} />} label="Jadwal Kerja" onClick={() => navigate("/mandor/JadwalKerjaMandor")} />
      <MenuItem icon={<User size={18} />} active label="Profil" />
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
    onMouseEnter={(e) => !active && (e.currentTarget.style.backgroundColor = "#2A2A2A")}
    onMouseLeave={(e) => !active && (e.currentTarget.style.backgroundColor = "transparent")}
  >
    {icon}
    <span>{label}</span>
  </div>
);

/* ======================= PROFIL MANDOR ======================= */
const ProfilMandor = () => {
  const navigate = useNavigate();

  // Dummy data sesuai ERD (user + mandor)
  const [form, setForm] = useState({
    nama: "Slamet Riyadi",
    email: "slamet@renova.com",
    telp: "08123456789",
    alamat: "Jl. Merpati No. 12, Jakarta",
    status: "Aktif",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    alert("Profil berhasil diperbarui!");
  };

  return (
    <div style={{ display: "flex", background: "#0F0F0F", color: "#fff", minHeight: "100vh" }}>
      <Sidebar navigate={navigate} />

      {/* CONTENT */}
      <div style={{ flex: 1, padding: 30 }}>
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>👤 Profil Mandor</h2>

        {/* CARD */}
        <div
          style={{
            background: "#1C1C1C",
            padding: 25,
            borderRadius: 12,
            width: "70%",
            boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          }}
        >
          <h3 style={{ marginBottom: 20 }}>Data Diri</h3>

          {/* FORM */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>No. Telepon</label>
              <input
                type="text"
                name="telp"
                value={form.telp}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label>Alamat</label>
              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                style={{ ...inputStyle, height: 80, resize: "none" }}
              />
            </div>

            <div>
              <label>Status</label>
              <input
                type="text"
                value={form.status}
                disabled
                style={{ ...inputStyle, background: "#333", color: "#999" }}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button onClick={saveProfile} style={btnPrimary}>
            Simpan Perubahan
          </button>
        </div>
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
  marginTop: 25,
  background: "#FF8A00",
  border: "none",
  padding: "12px 18px",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 15,
  display: "inline-block",
};

export default ProfilMandor;
