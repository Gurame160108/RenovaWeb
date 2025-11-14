import React, { useState } from "react";
import { Plus, X, Search, Calendar, Clock, User, Phone, MessageSquare, CheckCircle, XCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JanjiView = () => {
  const navigate = useNavigate();

  // Data dummy janji konsultasi
  const [janjiList, setJanjiList] = useState([
    { id: 1, nama: "Budi Santoso", no_telp: "081234567890", tanggal: "2025-11-20", waktu: "10:00", pesan: "Mau konsultasi renovasi rumah 2 lantai", status: "pending" },
    { id: 2, nama: "Siti Aminah", no_telp: "085712345678", tanggal: "2025-11-18", waktu: "14:30", pesan: "Desain interior minimalis untuk apartemen", status: "accepted" },
    { id: 3, nama: "Ahmad Rizki", no_telp: "082198765432", tanggal: "2025-11-15", waktu: "09:00", pesan: "Renovasi total rumah lama", status: "completed" },
    { id: 4, nama: "Dewi Lestari", no_telp: "089912345678", tanggal: "2025-11-22", waktu: "16:00", pesan: "Konsultasi bangun kos-kosan", status: "rejected" },
    { id: 5, nama: "Rudi Hartono", no_telp: "081987654321", tanggal: "2025-11-25", waktu: "11:00", pesan: "Perlu arsitek untuk villa", status: "pending" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedJanji, setSelectedJanji] = useState(null);
  const [modalType, setModalType] = useState("detail"); // detail, add

  const openDetailModal = (janji) => {
    setSelectedJanji(janji);
    setModalType("detail");
    setShowModal(true);
  };

  const handleStatusChange = (id, newStatus) => {
    setJanjiList(janjiList.map(j => j.id === id ? { ...j, status: newStatus } : j));
    alert(`Janji konsultasi telah di-${newStatus === "accepted" ? "terima" : newStatus === "rejected" ? "tolak" : "selesai"}!`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending": return { bg: "rgba(251, 191, 36, 0.2)", color: "#FDE047", border: "rgba(251, 191, 36, 0.3)", text: "PENDING" };
      case "accepted": return { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)", text: "ACCEPTED" };
      case "completed": return { bg: "rgba(34, 197, 94, 0.2)", color: "#86EFAC", border: "rgba(34, 197, 94, 0.3)", text: "COMPLETED" };
      case "rejected": return { bg: "rgba(239, 68, 68, 0.2)", color: "#FCA5A5", border: "rgba(239, 68, 68, 0.3)", text: "REJECTED" };
      default: return { bg: "rgba(124, 58, 237, 0.2)", color: "#A78BFA", border: "rgba(124, 58, 237, 0.3)", text: "UNKNOWN" };
    }
  };

  const filteredJanji = janjiList.filter(j =>
    j.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.no_telp.includes(searchTerm) ||
    j.pesan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0B0D1A', color: '#F3F4F6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '256px', backgroundColor: '#12142A', borderRight: '1px solid #1A1D35', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #1A1D35' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Renova</h1>
        </div>
        <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer',boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}
            onClick={() => navigate('/admin/dashboard')}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer',boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}
            onClick={() => navigate('/admin/userManager')}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>User Management</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer',boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}
            onClick={() => navigate('/admin/orderManegement')}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Order Management</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}
            onClick={() => navigate('/admin/jadwalKerja')}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Jadwal Kerja</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', backgroundColor: '#7C3AED', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}
            onClick={() => navigate('/admin/janjiView')}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Janji Konsultasi</span>
          </div>
        </nav>
        <div style={{ padding: '16px', borderTop: '1px solid #1A1D35', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>RG</div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: 0 }}>Roihan Galang</p>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Admin account</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#0B0D1A' }}>
        <header style={{ backgroundColor: '#12142A', padding: '20px 28px', borderBottom: '1px solid #1A1D35' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Janji Konsultasi</h2>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari nama, no telp, atau pesan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 40px', backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', fontSize: '12px', color: '#6B7280', borderBottom: '1px solid #1A1D35', backgroundColor: '#0B0D1A' }}>
                    <th style={{ padding: '12px 24px', fontWeight: '500' }}>ID</th>
                    <th style={{ padding: '12px 24px', fontWeight: '500' }}>Nama</th>
                    <th style={{ padding: '12px 24px', fontWeight: '500' }}>No. Telp</th>
                    <th style={{ padding: '12px 24px', fontWeight: '500' }}>Tanggal & Waktu</th>
                    <th style={{ padding: '12px 24px', fontWeight: '500' }}>Pesan</th>
                    <th style={{ padding: '12px 24px', fontWeight: '500' }}>Status</th>
                    <th style={{ padding: '12px 24px', fontWeight: '500' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJanji.map((janji) => {
                    const statusStyle = getStatusStyle(janji.status);
                    return (
                      <tr key={janji.id} style={{ borderBottom: '1px solid #1A1D35' }}>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white' }}>{janji.id}</td>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white', fontWeight: '500' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <User size={16} color="#9CA3AF" />
                            {janji.nama}
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Phone size={14} />
                            {janji.no_telp}
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Calendar size={14} />
                            {janji.tanggal}
                            <Clock size={14} />
                            {janji.waktu}
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <MessageSquare size={14} />
                            {janji.pesan}
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '600',
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`
                          }}>
                            {statusStyle.text}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {janji.status === "pending" && (
                              <>
                                <button onClick={() => handleStatusChange(janji.id, "accepted")}
                                  style={{ padding: '6px 10px', backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '6px', color: '#86EFAC', fontSize: '11px', cursor: 'pointer' }}>
                                  <CheckCircle size={14} />
                                </button>
                                <button onClick={() => handleStatusChange(janji.id, "rejected")}
                                  style={{ padding: '6px 10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#FCA5A5', fontSize: '11px', cursor: 'pointer' }}>
                                  <XCircle size={14} />
                                </button>
                              </>
                            )}
                            <button onClick={() => openDetailModal(janji)}
                              style={{ padding: '6px 10px', backgroundColor: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '6px', color: '#A78BFA', fontSize: '11px', cursor: 'pointer' }}>
                              <Eye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Detail Janji */}
      {showModal && selectedJanji && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', width: '520px' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Detail Janji Konsultasi</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 4px 0' }}>Nama Lengkap</p>
                  <p style={{ fontSize: '16px', color: 'white', fontWeight: '500' }}>{selectedJanji.nama}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 4px 0' }}>No. Telepon</p>
                  <p style={{ fontSize: '16px', color: '#93C5FD' }}>{selectedJanji.no_telp}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 4px 0' }}>Tanggal</p>
                  <p style={{ fontSize: '16px', color: 'white' }}>{selectedJanji.tanggal}</p>
                </div>
                <div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 4px 0' }}>Waktu</p>
                  <p style={{ fontSize: '16px', color: 'white' }}>{selectedJanji.waktu}</p>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 8px 0' }}>Pesan / Kebutuhan</p>
                <p style={{ fontSize: '15px', color: '#E5E7EB', lineHeight: '1.5', padding: '12px', backgroundColor: '#0B0D1A', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                  {selectedJanji.pesan}
                </p>
              </div>
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <span style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  ...getStatusStyle(selectedJanji.status)
                }}>
                  {getStatusStyle(selectedJanji.status).text}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JanjiView;

