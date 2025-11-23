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
  Upload,
  X
} from "lucide-react";

const LaporanHarianMandor = () => {
  const navigate = useNavigate();

  const proyek = [
    { id: 1, nama: "Renovasi Rumah Pak Ahmad" },
    { id: 2, nama: "Pembangunan Ruko Bu Siti" }
  ];

  const [form, setForm] = useState({
    proyekId: "",
    tanggal: "",
    laporan: "",
    foto: null
  });

  const [previewFoto, setPreviewFoto] = useState(null);

  const [laporanList, setLaporanList] = useState([]);

  const [selected, setSelected] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setForm({ ...form, foto: files[0] });
      setPreviewFoto(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.proyekId || !form.tanggal || !form.laporan || !form.foto) {
      alert("Semua field wajib diisi!");
      return;
    }

    const projectName = proyek.find((p) => p.id == form.proyekId)?.nama;

    const newData = {
      id: laporanList.length + 1,
      proyek: projectName,
      tanggal: form.tanggal,
      laporan: form.laporan,
      foto: previewFoto
    };

    setLaporanList([...laporanList, newData]);

    // reset
    setForm({ proyekId: "", tanggal: "", laporan: "", foto: null });
    setPreviewFoto(null);
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
      <Sidebar navigate={navigate} />

      {/* MAIN */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <header
          style={{
            padding: 20,
            backgroundColor: "#1A1A1A",
            borderBottom: "1px solid #222"
          }}
        >
          <h2 style={{ margin: 0 }}>Laporan Harian Mandor</h2>
        </header>

        <main style={{ padding: 20 }}>
          {/* FORM */}
          <div
            style={{
              backgroundColor: "#1A1A1A",
              padding: 20,
              borderRadius: 10,
              border: "1px solid #2A2A2A",
              marginBottom: 20
            }}
          >
            <h3 style={{ marginTop: 0, color: "#FF8A00" }}>
              Buat Laporan Harian
            </h3>

            <form onSubmit={submit}>
              <label>Proyek</label>
              <select
                name="proyekId"
                value={form.proyekId}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">-- Pilih Proyek --</option>
                {proyek.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama}
                  </option>
                ))}
              </select>

              <label style={{ marginTop: 10 }}>Tanggal</label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                style={inputStyle}
              />

              <label style={{ marginTop: 10 }}>Laporan Pekerjaan</label>
              <textarea
                name="laporan"
                value={form.laporan}
                onChange={handleChange}
                style={{ ...inputStyle, height: 100 }}
              />

              <label style={{ marginTop: 10 }}>Upload Foto</label>
              <input
                type="file"
                accept="image/*"
                name="foto"
                onChange={handleChange}
                style={inputStyle}
              />

              {previewFoto && (
                <img
                  src={previewFoto}
                  alt="preview"
                  style={{
                    width: 200,
                    marginTop: 10,
                    borderRadius: 6,
                    border: "1px solid #333"
                  }}
                />
              )}

              <button
                type="submit"
                style={buttonStyle}
              >
                <Upload size={18} style={{ marginRight: 8 }} />
                Kirim Laporan
              </button>
            </form>
          </div>

          {/* TABLE */}
          <div
            style={{
              backgroundColor: "#1A1A1A",
              padding: 20,
              borderRadius: 10,
              border: "1px solid #2A2A2A"
            }}
          >
            <h3 style={{ marginTop: 0, color: "#FF8A00" }}>Riwayat Laporan</h3>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ color: "#FF8A00" }}>
                  <th style={th}>Proyek</th>
                  <th style={th}>Tanggal</th>
                  <th style={th}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {laporanList.map((lap) => (
                  <tr
                    key={lap.id}
                    style={{ borderBottom: "1px solid #2A2A2A" }}
                  >
                    <td style={td}>{lap.proyek}</td>
                    <td style={td}>{lap.tanggal}</td>
                    <td style={td}>
                      <button
                        onClick={() => setSelected(lap)}
                        style={lihatBtn}
                      >
                        Lihat
                      </button>
                    </td>
                  </tr>
                ))}

                {laporanList.length === 0 && (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: 20 }}>
                      Belum ada laporan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {selected && <DetailModal selected={selected} close={() => setSelected(null)} />}
    </div>
  );
};

/* ======================= STYLES ======================= */

const inputStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#2A2A2A",
  color: "white",
  border: "1px solid #444",
  borderRadius: 6,
  marginTop: 5
};

const buttonStyle = {
  marginTop: 20,
  padding: "10px 16px",
  backgroundColor: "#FF8A00",
  color: "black",
  fontWeight: 600,
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center"
};

const th = { padding: 12, textAlign: "left" };
const td = { padding: 12 };

const lihatBtn = {
  padding: "6px 14px",
  backgroundColor: "#FF8A00",
  color: "black",
  fontWeight: 600,
  border: "none",
  borderRadius: 6,
  cursor: "pointer"
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
        icon={<FileText size={18} />}
        label="Instruksi Arsitek"
        onClick={() => navigate("/mandor/InstruksiMandor")}
      />

      <MenuItem
        icon={<ClipboardList size={18} />}
        label="Laporan Harian"
        active
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

const DetailModal = ({ selected, close }) => (
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
        width: 600,
        backgroundColor: "#1A1A1A",
        borderRadius: 10,
        border: "1px solid #333"
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
        <h3 style={{ margin: 0 }}>Detail Laporan</h3>
        <button
          onClick={close}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa" }}
        >
          <X size={22} />
        </button>
      </div>

      <div style={{ padding: 20 }}>
        <p><strong>Proyek:</strong> {selected.proyek}</p>
        <p><strong>Tanggal:</strong> {selected.tanggal}</p>

        <div
          style={{
            width: "100%",
            height: 220,
            backgroundColor: "#333",
            borderRadius: 8,
            marginTop: 10,
            backgroundImage: `url(${selected.foto})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />

        <p style={{ marginTop: 15 }}>
          <strong>Laporan:</strong> {selected.laporan}
        </p>
      </div>
    </div>
  </div>
);

export default LaporanHarianMandor;
