  import React, { useState } from "react";
  import { Calendar, FileText, Home, Clock, CheckCircle, AlertCircle, MoreHorizontal } from "lucide-react";
  import { useNavigate } from "react-router-dom";

    const DashboardArsitek = () => {
    const navigate = useNavigate();

    // Data dummy untuk arsitek
    const arsitek = { Nama_Lengkap: "Budi Santoso", email: "budi@renova.com", id_role: 3 };

    // Project yang sedang dikerjakan
    const ongoingProjects = [
      { id: 101, nama: "Renovasi Rumah Bpk. Ahmad", lokasi: "Jakarta Selatan", progress: 65, status: "onprogress" },
      { id: 102, nama: "Desain Villa Bali", lokasi: "Ubud, Bali", progress: 40, status: "onprogress" },
      { id: 103, nama: "Interior Kantor Tech Startup", lokasi: "Bandung", progress: 90, status: "review" },
    ];

    // Jadwal kerja minggu ini
    const jadwalMingguIni = [
      { hari: "Senin", tanggal: "17 Nov", proyek: "Site Visit - Rumah Bpk. Ahmad", waktu: "09:00 - 12:00" },
      { hari: "Rabu", tanggal: "19 Nov", proyek: "Presentasi Desain Villa Bali", waktu: "14:00 - 16:00" },
      { hari: "Kamis", tanggal: "20 Nov", proyek: "Revisi Gambar Kantor Tech", waktu: "10:00 - 15:00" },
      { hari: "Jumat", tanggal: "21 Nov", proyek: "Meeting dengan Mandor", waktu: "13:00 - 14:30" },
    ];

    // History laporan kerja
    const historyLaporan = [
      { id: 12, tanggal: "15 Nov 2025", proyek: "Rumah Bpk. Ahmad", status: "Disetujui", catatan: "Revisi atap sudah OK" },
      { id: 11, tanggal: "10 Nov 2025", proyek: "Villa Bali", status: "Menunggu Revisi", catatan: "Client minta tambah kolam" },
      { id: 10, tanggal: "08 Nov 2025", proyek: "Kantor Tech Startup", status: "Disetujui", catatan: "Desain interior final" },
    ];

    const getStatusBadge = (status) => {
      const styles = {
        onprogress: { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)" },
        review: { bg: "rgba(251, 191, 36, 0.2)", color: "#FDE047", border: "rgba(251, 191, 36, 0.3)" },
        completed: { bg: "rgba(34, 197, 94, 0.2)", color: "#86EFAC", border: "rgba(34, 197, 94, 0.3)" },
      };
      return styles[status] || styles.onprogress;
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
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}
              onClick={() => navigate('/arsitek/InstruksiMandorA')}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Instruksi Mandor</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}
              onClick={() => navigate('/arsitek/jadwalKerjaA')}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Jadwal Kerja</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}
              onClick={() => navigate('/arsitek/laporanProject')}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Laporan Kerja</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}
              onClick={() => navigate('/arsitek/DesainRevisiArsitek')}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Desain Revisi</span>
            </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}
              onClick={() => navigate('/arsitek/laporanMandor')}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Laporan Mandor</span>
            </div>
          </nav>

          <div style={{ padding: '16px', borderTop: '1px solid #1A1D35', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
              BS
            </div>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: 0 }}>{arsitek.Nama_Lengkap}</p>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Arsitek</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#0B0D1A' }}>
          <header style={{ backgroundColor: '#12142A', padding: '20px 28px', borderBottom: '1px solid #1A1D35' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Dashboard Arsitek</h2>
          </header>

          <main style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {[
                { icon: Home, label: "Total Project", value: "24", color: "#7C3AED" },
                { icon: CheckCircle, label: "Selesai", value: "18", color: "#22C55E" },
                { icon: Clock, label: "Sedang Dikerjakan", value: "4", color: "#3B82F6" },
                { icon: AlertCircle, label: "Menunggu Review", value: "2", color: "#F59E0B" },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: '#12142A', padding: '20px', borderRadius: '12px', border: '1px solid #1A1D35' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <stat.icon size={20} color={stat.color} />
                    <MoreHorizontal size={16} color="#6B7280" />
                  </div>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: '8px 0 4px' }}>{stat.value}</p>
                  <p style={{ fontSize: '13px', color: '#9CA3AF' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Ongoing Projects + Jadwal */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              {/* Ongoing Projects */}
              <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Project Sedang Dikerjakan</h3>
                  <button onClick={() => navigate('/arsitek/project')} style={{ color: '#7C3AED', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Lihat Semua →
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {ongoingProjects.map(proyek => {
                    const badge = getStatusBadge(proyek.status);
                    return (
                      <div key={proyek.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: '500', color: 'white', margin: '0 0 4px' }}>{proyek.nama}</p>
                          <p style={{ fontSize: '12px', color: '#9CA3AF' }}>{proyek.lokasi}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '100px', height: '8px', backgroundColor: '#1A1D35', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{ width: `${proyek.progress}%`, height: '100%', backgroundColor: '#7C3AED' }} />
                          </div>
                          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{proyek.progress}%</span>
                          <span style={{
                            padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '600',
                            backgroundColor: badge.bg, color: badge.color, border: `1px solid ${badge.border}`
                          }}>
                            {proyek.status === "onprogress" ? "On Progress" : "Review"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Jadwal Minggu Ini */}
              <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>
                    <Calendar size={18} style={{ display: 'inline', marginRight: '8px' }} />
                    Jadwal Minggu Ini
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {jadwalMingguIni.map((jadwal, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{jadwal.hari}</p>
                        <p style={{ fontSize: '11px', color: '#9CA3AF' }}>{jadwal.tanggal}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '13px', color: '#E5E7EB' }}>{jadwal.proyek}</p>
                        <p style={{ fontSize: '11px', color: '#7C3AED' }}>{jadwal.waktu}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* History Laporan Kerja */}
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>
                  <FileText size={18} style={{ display: 'inline', marginRight: '8px' }} />
                  History Laporan Kerja
                </h3>
                <button onClick={() => navigate('/arsitek/laporan')} style={{ color: '#7C3AED', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Lihat Semua →
                </button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', fontSize: '12px', color: '#6B7280', backgroundColor: '#0B0D1A' }}>
                    <th style={{ padding: '12px 24px' }}>ID</th>
                    <th style={{ padding: '12px 24px' }}>Tanggal</th>
                    <th style={{ padding: '12px 24px' }}>Proyek</th>
                    <th style={{ padding: '12px 24px' }}>Status</th>
                    <th style={{ padding: '12px 24px' }}>Catatan</th>
                  </tr>
                </thead>
                <tbody>
                  {historyLaporan.map(laporan => (
                    <tr key={laporan.id} style={{ borderBottom: '1px solid #1A1D35' }}>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white' }}>#LP{laporan.id}</td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>{laporan.tanggal}</td>
                      <td style={{ padding: '16px 24px', fontSize: '13px', color: 'white' }}>{laporan.proyek}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{
                          padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                          backgroundColor: laporan.status === "Disetujui" ? "rgba(34, 197, 94, 0.2)" : "rgba(251, 191, 36, 0.2)",
                          color: laporan.status === "Disetujui" ? "#86EFAC" : "#FDE047",
                          border: `1px solid ${laporan.status === "Disetujui" ? "rgba(34, 197, 94, 0.3)" : "rgba(251, 191, 36, 0.3)"}`
                        }}>
                          {laporan.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>{laporan.catatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  };

  export default DashboardArsitek;