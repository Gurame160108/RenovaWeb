import React, { useState, useEffect } from "react";
import { Plus, X, Search, Calendar, Clock, User, Phone, MessageSquare, CheckCircle, XCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JanjiView = () => {

  const navigate = useNavigate();

  const [janjiList, setJanjiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedJanji, setSelectedJanji] = useState(null);

  // Fetch data janji dari API
  useEffect(() => {
    fetchJanji();
  }, []);

  const fetchJanji = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching janji konsultasi...");
      const response = await fetch("http://localhost:5000/api/janji/all");
      console.log("📡 Response Status:", response.status);
      
      if (!response.ok) {
        throw new Error(`API failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Janji Data:", data);
      
      // Pastikan data adalah array
      const janjiData = Array.isArray(data) ? data : [];
      setJanjiList(janjiData);
      
      if (janjiData.length === 0) {
        console.warn("⚠️ Tidak ada data janji ditemukan");
      }
    } catch (error) {
      console.error("❌ Error fetching janji:", error);
      alert(`Gagal memuat data janji: ${error.message}\n\nPastikan backend sudah running di http://localhost:5000`);
      setJanjiList([]);
    } finally {
      setLoading(false);
    }
  };

  const openDetailModal = (janji) => {
    setSelectedJanji(janji);
    setShowModal(true);
  };

  const handleStatusChange = async (id_janji, newStatus) => {
    try {
      console.log(`🔄 Updating janji ${id_janji} to status: ${newStatus}`);
      
      const response = await fetch(`http://localhost:5000/api/janji/${id_janji}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengubah status');
      }

      const result = await response.json();
      console.log("✅ Status updated:", result);
      
      // Update status di frontend
      setJanjiList(janjiList.map(j => 
        j.id_janji === id_janji ? { ...j, status: newStatus } : j
      ));
      
      const statusText = newStatus === "Diterima" ? "diterima" : 
                        newStatus === "Ditolak" ? "ditolak" : 
                        newStatus === "Selesai" ? "diselesaikan" : "diubah";
      
      alert(`Janji konsultasi telah ${statusText}!`);
    } catch (error) {
      console.error("❌ Error updating status:", error);
      alert(`Gagal mengubah status janji: ${error.message}`);
      // Rollback dengan refresh data
      fetchJanji();
    }
  };

  const getStatusStyle = (status) => {
    const statusLower = status?.toLowerCase() || "";
    
    if (statusLower.includes("pending") || statusLower.includes("menunggu")) {
      return { bg: "rgba(251, 191, 36, 0.2)", color: "#FDE047", border: "rgba(251, 191, 36, 0.3)", text: status || "PENDING" };
    } else if (statusLower.includes("terima") || statusLower.includes("accept")) {
      return { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)", text: status || "DITERIMA" };
    } else if (statusLower.includes("selesai") || statusLower.includes("complete")) {
      return { bg: "rgba(34, 197, 94, 0.2)", color: "#86EFAC", border: "rgba(34, 197, 94, 0.3)", text: status || "SELESAI" };
    } else if (statusLower.includes("tolak") || statusLower.includes("reject")) {
      return { bg: "rgba(239, 68, 68, 0.2)", color: "#FCA5A5", border: "rgba(239, 68, 68, 0.3)", text: status || "DITOLAK" };
    }
    
    return { bg: "rgba(124, 58, 237, 0.2)", color: "#A78BFA", border: "rgba(124, 58, 237, 0.3)", text: status || "UNKNOWN" };
  };

  const filteredJanji = janjiList.filter(j => {
    const searchLower = searchTerm.toLowerCase();
    return (
      j.nama_user?.toLowerCase().includes(searchLower) ||
      j.keperluan?.toLowerCase().includes(searchLower) ||
      j.status?.toLowerCase().includes(searchLower)
    );
  });

  const handleNavigation = (path) => {
    alert(`Navigasi ke: ${path}`);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0B0D1A', color: '#F3F4F6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '256px', backgroundColor: '#12142A', borderRight: '1px solid #1A1D35', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #1A1D35' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Renova</h1>
        </div>
        <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => navigate('/admin/dashboard')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => navigate('/admin/userManager')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>User Management</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => navigate('/admin/orderMane  gement')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Order Management</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => navigate('/admin/jadwalKerja')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Jadwal Kerja</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', backgroundColor: '#7C3AED', borderRadius: '8px', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}>
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
              <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Cari nama, keperluan, atau status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 40px', backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <button onClick={fetchJanji} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#7C3AED', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              🔄 Refresh
            </button>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading...</div>
            ) : filteredJanji.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                <MessageSquare size={48} color="#374151" style={{ margin: '0 auto 16px' }} />
                <p>Tidak ada data janji konsultasi ditemukan</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '12px', color: '#6B7280', borderBottom: '1px solid #1A1D35', backgroundColor: '#0B0D1A' }}>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>ID</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Nama User</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Keperluan</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Status</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJanji.map((janji) => {
                      const statusStyle = getStatusStyle(janji.status);
                      const isPending = janji.status?.toLowerCase().includes("pending") || 
                                       janji.status?.toLowerCase().includes("menunggu");
                      const isDiterima = janji.status?.toLowerCase().includes("terima");
                      
                      return (
                        <tr key={janji.id_janji} style={{ borderBottom: '1px solid #1A1D35' }}>
                          <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white' }}>{janji.id_janji}</td>
                          <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white', fontWeight: '500' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <User size={16} color="#9CA3AF" />
                              {janji.nama_user || 'User Tidak Diketahui'}
                            </div>
                          </td>
                          <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF', maxWidth: '300px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <MessageSquare size={14} />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {janji.keperluan || '-'}
                              </span>
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
                              border: `1px solid ${statusStyle.border}`,
                              textTransform: 'uppercase'
                            }}>
                              {statusStyle.text}
                            </span>
                          </td>
                          <td style={{ padding: '16px 24px' }}>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {isPending && (
                                <>
                                  <button onClick={() => handleStatusChange(janji.id_janji, "Diterima")}
                                    title="Terima Janji"
                                    style={{ padding: '6px 10px', backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '6px', color: '#86EFAC', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'}>
                                    <CheckCircle size={14} />
                                  </button>
                                  <button onClick={() => handleStatusChange(janji.id_janji, "Ditolak")}
                                    title="Tolak Janji"
                                    style={{ padding: '6px 10px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#FCA5A5', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}>
                                    <XCircle size={14} />
                                  </button>
                                </>
                              )}
                              {isDiterima && (
                                <button onClick={() => handleStatusChange(janji.id_janji, "Selesai")}
                                  title="Tandai Selesai"
                                  style={{ padding: '6px 12px', backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '6px', color: '#86EFAC', fontSize: '11px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.2)'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.1)'}>
                                  Selesai
                                </button>
                              )}
                              <button onClick={() => openDetailModal(janji)}
                                title="Lihat Detail"
                                style={{ padding: '6px 10px', backgroundColor: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '6px', color: '#A78BFA', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.1)'}>
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
            )}
          </div>
        </main>
      </div>

      {/* Modal Detail Janji */}
      {showModal && selectedJanji && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
          onClick={() => setShowModal(false)}>
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', width: '520px' }}
            onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Detail Janji Konsultasi</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: '4px' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 6px 0' }}>ID Janji</p>
                  <p style={{ fontSize: '16px', color: 'white', fontWeight: '600' }}>#{selectedJanji.id_janji}</p>
                </div>
                
                <div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 6px 0' }}>Nama User</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} color="#7C3AED" />
                    <p style={{ fontSize: '16px', color: 'white', fontWeight: '500', margin: 0 }}>
                      {selectedJanji.nama_user || 'User Tidak Diketahui'}
                    </p>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 8px 0' }}>Keperluan / Pesan</p>
                  <p style={{ fontSize: '15px', color: '#E5E7EB', lineHeight: '1.6', padding: '16px', backgroundColor: '#0B0D1A', borderRadius: '8px', border: '1px solid #1A1D35', margin: 0, minHeight: '80px' }}>
                    {selectedJanji.keperluan || 'Tidak ada keterangan'}
                  </p>
                </div>

                <div>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 8px 0' }}>Status</p>
                  <span style={{
                    display: 'inline-block',
                    padding: '8px 20px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    ...getStatusStyle(selectedJanji.status)
                  }}>
                    {getStatusStyle(selectedJanji.status).text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JanjiView;