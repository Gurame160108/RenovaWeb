import React from "react";
import { Users, Calendar, HardHat, Clock, CheckCircle, AlertCircle, Package, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardMandor = () => {
  const navigate = useNavigate();
  const mandor = { Nama_Lengkap: "Slamet Riyadi", email: "slamet@renova.com", id_role: 4 };

  const proyekDiawasi = [
    { id: 201, nama: "Renovasi Rumah Bpk. Ahmad", lokasi: "Jakarta Selatan", progress: 58, status: "onprogress" },
    { id: 202, nama: "Bangun Kos 3 Lantai", lokasi: "Depok", progress: 35, status: "onprogress" },
    { id: 203, nama: "Perbaikan Gedung Sekolah", lokasi: "Tangerang", progress: 92, status: "finishing" },
  ];

  const timPekerja = [
    { nama: "Joko Susilo", jabatan: "Tukang Kayu", status: "Hadir", telat: false },
    { nama: "Suparman", jabatan: "Tukang Batu", status: "Hadir", telat: false },
    { nama: "Wahyudi", jabatan: "Tukang Cat", status: "Izin", telat: false },
    { nama: "Agus Santoso", jabatan: "Pembantu", status: "Hadir", telat: true },
  ];

  const jadwalHariIni = {
    aktivitas: "Pengecoran Lantai 2 - Rumah Bpk. Ahmad",
    waktu: "07:00 - 16:00",
    lokasi: "Jakarta Selatan",
  };

  const laporanHarian = [
    { tanggal: "14 Nov 2025", proyek: "Rumah Bpk. Ahmad", progress: "+5%", material: "Semen 25 sak, Pasir 2 truk" },
    { tanggal: "13 Nov 2025", proyek: "Kos Depok", progress: "+8%", material: "Batu Bata 3000 pcs" },
    { tanggal: "12 Nov 2025", proyek: "Gedung Sekolah", progress: "+3%", material: "Cat Tembok 15 galon" },
  ];

  const getStatusBadge = (status) => {
    const map = {
      onprogress: { bg: "rgba(124, 58, 237, 0.15)", color: "#C4B5FD", border: "rgba(124, 58, 237, 0.25)" },
      finishing: { bg: "rgba(251, 191, 36, 0.15)", color: "#FDE047", border: "rgba(251, 191, 36, 0.25)" },
    };
    return map[status] || map.onprogress;
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#0B0D1A", color: "#F3F4F6" }}>
      {/* SIDEBAR */}
      <div style={{ width: "260px", backgroundColor: "#12142A", borderRight: "1px solid #1A1D35", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid #1A1D35" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", color: "white" }}>Renova</h1>
        </div>

        <nav style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          {/* Active menu */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "#7C3AED",
              color: "white",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <HardHat size={18} />
            Dashboard Mandor
          </div>

          <div
            onClick={() => navigate("/mandor/proyek")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "8px",
              color: "#A1A1AA",
              cursor: "pointer",
            }}
          >
            <HardHat size={18} />
            Proyek Saya
          </div>

          <div
            onClick={() => navigate("/mandor/tim")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "8px",
              color: "#A1A1AA",
              cursor: "pointer",
            }}
          >
            <Users size={18} />
            Tim Pekerja
          </div>

          <div
            onClick={() => navigate("/mandor/absensi")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "8px",
              color: "#A1A1AA",
              cursor: "pointer",
            }}
          >
            <Calendar size={18} />
            Absensi & Laporan
          </div>
        </nav>

        {/* Profile */}
        <div style={{ padding: "16px", borderTop: "1px solid #1A1D35", display: "flex", alignItems: "center", gap: "12px" }}>
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
            }}
          >
            SR
          </div>
          <div>
            <p style={{ margin: 0, color: "white", fontSize: "14px", fontWeight: 600 }}>{mandor.Nama_Lengkap}</p>
            <p style={{ margin: 0, color: "#6B7280", fontSize: "12px" }}>Mandor Lapangan</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <header style={{ backgroundColor: "#12142A", padding: "22px 28px", borderBottom: "1px solid #1A1D35" }}>
          <h2 style={{ color: "white", fontSize: "20px", fontWeight: 600 }}>Dashboard Mandor</h2>
        </header>

        <main style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* KOTAK STATISTIK */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {[
              { icon: HardHat, label: "Proyek Diawasi", value: "3", color: "#7C3AED" },
              { icon: Users, label: "Total Pekerja", value: "12", color: "#3B82F6" },
              { icon: CheckCircle, label: "Hadir Hari Ini", value: "10", color: "#22C55E" },
              { icon: Package, label: "Material Tersedia", value: "87%", color: "#F59E0B" },
            ].map((stat, i) => (
              <div key={i} style={{ backgroundColor: "#12142A", padding: "20px", borderRadius: "12px", border: "1px solid #1A1D35" }}>
                <stat.icon size={22} color={stat.color} />
                <p style={{ fontSize: "28px", fontWeight: "bold", color: "white", marginTop: "10px", marginBottom: "4px" }}>{stat.value}</p>
                <p style={{ fontSize: "13px", color: "#9CA3AF" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* JADWAL + PROYEK */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
            {/* Jadwal Hari Ini */}
            <div style={{ backgroundColor: "#12142A", padding: "24px", borderRadius: "12px", border: "1px solid #1A1D35" }}>
              <h3 style={{ color: "white", fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
                <Calendar size={16} style={{ marginRight: 6 }} /> Jadwal Hari Ini
              </h3>

              <div style={{ backgroundColor: "#0B0D1A", padding: "16px", borderRadius: "8px", border: "1px solid #1A1D35" }}>
                <p style={{ color: "white", fontWeight: 600 }}>{jadwalHariIni.aktivitas}</p>
                <p style={{ fontSize: "12px", color: "#9CA3AF", marginTop: 4 }}>
                  <Clock size={14} style={{ marginRight: 4 }} />
                  {jadwalHariIni.waktu}
                </p>
                <p style={{ color: "#7C3AED", fontSize: "12px" }}>{jadwalHariIni.lokasi}</p>
              </div>
            </div>

            {/* Proyek Diawasi */}
            <div style={{ backgroundColor: "#12142A", padding: "24px", borderRadius: "12px", border: "1px solid #1A1D35" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 style={{ color: "white", fontSize: "16px", fontWeight: 600 }}>Proyek Diawasi</h3>
                <button
                  onClick={() => navigate("/mandor/proyek")}
                  style={{ background: "none", border: "none", color: "#7C3AED", fontSize: "13px", cursor: "pointer" }}
                >
                  Lihat Semua →
                </button>
              </div>

              {proyekDiawasi.map((p) => {
                const badge = getStatusBadge(p.status);
                return (
                  <div key={p.id} style={{ padding: "12px 0", borderBottom: "1px solid #1A1D35", display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ color: "white", fontSize: "14px", fontWeight: 500 }}>{p.nama}</p>
                      <p style={{ color: "#9CA3AF", fontSize: "12px" }}>{p.lokasi}</p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "90px", height: "6px", backgroundColor: "#1A1D35", borderRadius: "4px", overflow: "hidden" }}>
                        <div style={{ width: `${p.progress}%`, height: "100%", backgroundColor: "#7C3AED" }} />
                      </div>
                      <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{p.progress}%</span>
                      <span
                        style={{
                          padding: "4px 10px",
                          fontSize: "10px",
                          borderRadius: "20px",
                          backgroundColor: badge.bg,
                          border: `1px solid ${badge.border}`,
                          color: badge.color,
                          fontWeight: 600,
                        }}
                      >
                        {p.status === "finishing" ? "Finishing" : "On Progress"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TIM PEKERJA + LAPORAN */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Tim */}
            <div style={{ backgroundColor: "#12142A", padding: "24px", borderRadius: "12px", border: "1px solid #1A1D35" }}>
              <h3 style={{ color: "white", fontSize: "16px", marginBottom: "16px" }}>
                <Users size={16} style={{ marginRight: 6 }} /> Tim Pekerja Hari Ini
              </h3>

              {timPekerja.map((p, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                  <div>
                    <p style={{ color: "white", fontSize: "14px", fontWeight: p.telat ? 600 : 500 }}>{p.nama}</p>
                    <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{p.jabatan}</p>
                  </div>

                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      backgroundColor:
                        p.status === "Hadir"
                          ? p.telat
                            ? "rgba(251, 191, 36, 0.2)"
                            : "rgba(34, 197, 94, 0.2)"
                          : "rgba(239, 68, 68, 0.2)",
                      color:
                        p.status === "Hadir"
                          ? p.telat
                            ? "#FDE047"
                            : "#86EFAC"
                          : "#FCA5A5",
                      border:
                        p.status === "Hadir"
                          ? p.telat
                            ? "1px solid rgba(251, 191, 36, 0.3)"
                            : "1px solid rgba(34, 197, 94, 0.3)"
                          : "1px solid rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    {p.status} {p.telat ? "(Telat)" : ""}
                  </span>
                </div>
              ))}
            </div>

            {/* Laporan Harian */}
            <div style={{ backgroundColor: "#12142A", padding: "24px", borderRadius: "12px", border: "1px solid #1A1D35" }}>
              <h3 style={{ color: "white", fontSize: "16px", marginBottom: "16px" }}>
                <FileText size={16} style={{ marginRight: 6 }} /> Laporan Harian Terakhir
              </h3>

              {laporanHarian.map((l, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: i < laporanHarian.length - 1 ? "1px solid #1A1D35" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "12px", color: "#9CA3AF" }}>{l.tanggal}</p>
                    <p style={{ fontSize: "12px", color: "#7C3AED" }}>{l.progress}</p>
                  </div>

                  <p style={{ color: "white", fontSize: "14px", marginTop: 4 }}>{l.proyek}</p>

                  <p style={{ fontSize: "12px", color: "#9CA3AF" }}>
                    <Package size={12} style={{ marginRight: 4 }} />
                    {l.material}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardMandor;
