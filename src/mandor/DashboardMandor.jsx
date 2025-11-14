import React, { useState } from "react";
import { Users, Calendar, HardHat, Clock, CheckCircle, AlertCircle, Package, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardMandor = () => {
  const navigate = useNavigate();

  const mandor = { Nama_Lengkap: "Slamet Riyadi", email: "slamet@renova.com", id_role: 4 };

  // Project yang sedang diawasi mandor
  const proyekDiawasi = [
    { id: 201, nama: "Renovasi Rumah Bpk. Ahmad", lokasi: "Jakarta Selatan", progress: 58, status: "onprogress" },
    { id: 202, nama: "Bangun Kos 3 Lantai", lokasi: "Depok", progress: 35, status: "onprogress" },
    { id: 203, nama: "Perbaikan Gedung Sekolah", lokasi: "Tangerang", progress: 92, status: "finishing" },
  ];

  // Tim pekerja di bawah mandor
  const timPekerja = [
    { nama: "Joko Susilo", jabatan: "Tukang Kayu", status: "Hadir", telat: false },
    { nama: "Suparman", jabatan: "Tukang Batu", status: "Hadir", telat: false },
    { nama: "Wahyudi", jabatan: "Tukang Cat", status: "Izin", telat: false },
    { nama: "Agus Santoso", jabatan: "Pembantu", status: "Hadir", telat: true },
  ];

  // Jadwal hari ini & minggu ini
  const jadwalHariIni = { aktivitas: "Pengecoran Lantai 2 - Rumah Bpk. Ahmad", waktu: "07:00 - 16:00", lokasi: "Jakarta Selatan" };
  const jadwalMinggu = [
    { hari: "Selasa", aktivitas: "Pasang Keramik Kamar Mandi", proyek: "Kos Depok" },
    { hari: "Rabu", aktivitas: "Cat Dinding Luar", proyek: "Gedung Sekolah" },
    { hari: "Kamis", aktivitas: "Pemasangan Atap Baja Ringan", proyek: "Rumah Bpk. Ahmad" },
    { hari: "Jumat", aktivitas: "Finishing Plafon", proyek: "Gedung Sekolah" },
  ];

  // Laporan material & progress harian
  const laporanHarian = [
    { tanggal: "14 Nov 2025", proyek: "Rumah Bpk. Ahmad", progress: "+5%", material: "Semen 25 sak, Pasir 2 truk" },
    { tanggal: "13 Nov 2025", proyek: "Kos Depok", progress: "+8%", material: "Batu Bata 3000 pcs" },
    { tanggal: "12 Nov 2025", proyek: "Gedung Sekolah", progress: "+3%", material: "Cat Tembok 15 galon" },
  ];

  const getStatusBadge = (status) => {
    const map = {
      onprogress: { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)" },
      finishing: { bg: "rgba(251, 191, 36, 0.2)", color: "#FDE047", border: "rgba(251, 191, 36, 0.3)" },
      completed: { bg: "rgba(34, 197, 94, 0.2)", color: "#86EFAC", border: "rgba(34, 197, 94, 0.3)" },
    };
    return map[status] || map.onprogress;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0B0D1A', color: '#F3F4F6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '256px', backgroundColor: '#12142A', borderRight: '1px solid #1A1D35', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #1A1D35' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Renova</h1>
        </div>

        <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#7C3AED', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}>
            <span style={{ fontSize: '16px' }}>Hard Hat Icon</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard Mandor</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}
            onClick={() => navigate('/mandor/proyek')}>
            <span style={{ fontSize: '16px' }}>Hard Hat Icon</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Proyek Saya</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}
            onClick={() => navigate('/mandor/tim')}>
            <span style={{ fontSize: '16px' }}>Users Icon</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Tim Pekerja</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}
            onClick={() => navigate('/mandor/absensi')}>
            <span style={{ fontSize: '16px' }}>Calendar Icon</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Absensi & Laporan</span>
          </div>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #1A1D35', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
            SR
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: 0 }}>{mandor.Nama_Lengkap}</p>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Mandor Lapangan</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#0B0D1A' }}>
        <header style={{ backgroundColor: '#12142A', padding: '20px 28px', borderBottom: '1px solid #1A1D35' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Dashboard Mandor</h2>
        </header>

        <main style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Statistik Singkat */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { icon: HardHat, label: "Proyek Diawasi", value: "3", color: "#7C3AED" },
              { icon: Users, label: "Total Pekerja", value: "12", color: "#3B82F6" },
              { icon: CheckCircle, label: "Hadir Hari Ini", value: "10", color: "#22C55E" },
              { icon: Package, label: "Material Tersedia", value: "87%", color: "#F59E0B" },
            ].map((stat, i) => (
              <div key={i} style={{ backgroundColor: '#12142A', padding: '20px', borderRadius: '12px', border: '1px solid #1A1D35' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <stat.icon size={22} color={stat.color} />
                </div>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '8px 0 4px' }}>{stat.value}</p>
                <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Jadwal Hari Ini + Proyek Diawasi */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            {/* Jadwal Hari Ini */}
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
                <Calendar size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Jadwal Hari Ini
              </h3>
              <div style={{ backgroundColor: '#0B0D1A', padding: '16px', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                <p style={{ fontSize: '15px', fontWeight: '600', color: 'white', margin: '0 0 8px' }}>{jadwalHariIni.aktivitas}</p>
                <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '4px 0' }}>
                  <Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />
                  {jadwalHariIni.waktu}
                </p>
                <p style={{ fontSize: '12px', color: '#7C3AED' }}>{jadwalHariIni.lokasi}</p>
              </div>
            </div>

            {/* Proyek Diawasi */}
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Proyek Diawasi</h3>
                <button onClick={() => navigate('/mandor/proyek')} style={{ color: '#7C3AED', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Lihat Semua →
                </button>
              </div>
              {proyekDiawasi.map(p => {
                const badge = getStatusBadge(p.status);
                return (
                  <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1A1D35' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{p.nama}</p>
                      <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{p.lokasi}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '90px', height: '6px', backgroundColor: '#1A1D35', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: '#7C3AED' }} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{p.progress}%</span>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '600',
                        backgroundColor: badge.bg, color: badge.color, border: `1px solid ${badge.border}`
                      }}>
                        {p.status === "finishing" ? "Finishing" : "On Progress"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tim Pekerja + Laporan Harian */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Tim Pekerja */}
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
                <Users size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Tim Pekerja Hari Ini
              </h3>
              {timPekerja.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                  <div>
                    <p style={{ fontSize: '14px', color: 'white', fontWeight: p.telat ? '600' : '500' }}>{p.nama}</p>
                    <p style={{ fontSize: '11px', color: '#9CA3AF' }}>{p.jabatan}</p>
                  </div>
                  <span style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                    backgroundColor: p.status === "Hadir" ? (p.telat ? "rgba(251, 191, 36, 0.2)" : "rgba(34, 197, 94, 0.2)") : "rgba(239, 68, 68, 0.2)",
                    color: p.status === "Hadir" ? (p.telat ? "#FDE047" : "#86EFAC") : "#FCA5A5",
                    border: `1px solid ${p.status === "Hadir" ? (p.telat ? "rgba(251, 191, 36, 0.3)" : "rgba(34, 197, 94, 0.3)") : "rgba(239, 68, 68, 0.3)"}`
                  }}>
                    {p.status}{p.telat ? " (Telat)" : ""}
                  </span>
                </div>
              ))}
            </div>

            {/* Laporan Harian */}
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '16px' }}>
                <FileText size={18} style={{ display: 'inline', marginRight: '8px' }} />
                Laporan Harian Terakhir
              </h3>
              {laporanHarian.map((l, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: i < laporanHarian.length - 1 ? '1px solid #1A1D35' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{l.tanggal}</p>
                    <span style={{ fontSize: '12px', color: '#7C3AED' }}>{l.progress}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: 'white', margin: '4px 0' }}>{l.proyek}</p>
                  <p style={{ fontSize: '11px', color: '#9CA3AF' }}>
                    <Package size={12} style={{ display: 'inline', marginRight: '4px' }} />
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