import React from "react";
import { HardHat, MapPin, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProyekMandor = () => {
  const navigate = useNavigate();

  const daftarProyek = [
    {
      id: 201,
      nama: "Renovasi Rumah Bpk. Ahmad",
      lokasi: "Jakarta Selatan",
      progress: 58,
      deadline: "28 Des 2025",
      status: "onprogress"
    },
    {
      id: 202,
      nama: "Bangun Kos 3 Lantai",
      lokasi: "Depok",
      progress: 35,
      deadline: "12 Jan 2026",
      status: "onprogress"
    },
    {
      id: 203,
      nama: "Perbaikan Gedung Sekolah",
      lokasi: "Tangerang",
      progress: 92,
      deadline: "20 Nov 2025",
      status: "finishing"
    },
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
          <div onClick={() => navigate('/mandor/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}>
            <HardHat size={16} />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard Mandor</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '8px',
              backgroundColor: '#7C3AED',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)',
            }}>
            <HardHat size={16} />
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Proyek Saya</span>
          </div>

          <div onClick={() => navigate('/mandor/tim')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}>
            <span>👥</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Tim Pekerja</span>
          </div>

          <div onClick={() => navigate('/mandor/absensi')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer' }}>
            <span>🗓️</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Absensi & Laporan</span>
          </div>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #1A1D35', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
            SR
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: 0 }}>Slamet Riyadi</p>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Mandor Lapangan</p>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#0B0D1A' }}>
        <header style={{ backgroundColor: '#12142A', padding: '20px 28px', borderBottom: '1px solid #1A1D35' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Proyek Saya</h2>
        </header>

        <main style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {daftarProyek.map((p) => {
              const badge = getStatusBadge(p.status);

              return (
                <div key={p.id}
                  style={{
                    backgroundColor: '#12142A',
                    borderRadius: '14px',
                    border: '1px solid #1A1D35',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  
                  <div>
                    <p style={{ fontSize: '16px', color: 'white', fontWeight: '600', marginBottom: '4px' }}>{p.nama}</p>
                    <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '2px 0' }}>
                      <MapPin size={14} style={{ marginRight: '6px' }} />
                      {p.lokasi}
                    </p>

                    {/* Progress bar */}
                    <div style={{ marginTop: '10px', width: '200px' }}>
                      <div style={{ width: '100%', height: '7px', backgroundColor: '#1A1D35', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${p.progress}%`, height: '100%', backgroundColor: '#7C3AED' }} />
                      </div>
                      <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>{p.progress}%</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '600',
                      backgroundColor: badge.bg,
                      color: badge.color,
                      border: `1px solid ${badge.border}`
                    }}>
                      {p.status === "finishing" ? "Finishing" : "On Progress"}
                    </span>

                    <button
                      onClick={() => navigate(`/mandor/proyek/${p.id}`)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#7C3AED',
                        fontSize: '13px'
                      }}>
                      Detail Proyek <ChevronRight size={14} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
};

export default ProyekMandor;
