import React, { useState, useEffect } from "react";
import { MoreHorizontal, Plus, X, Search, Calendar, Users, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProgramKerja = () => {
  const navigate = useNavigate();

  // Data dummy (ganti dengan fetch API nanti)
  const [schedules, setSchedules] = useState([
    { id: 1, nama_program: "Renovasi Rumah Bpk. Ahmad", tanggal_mulai: "2025-11-10", tanggal_selesai: "2025-12-25", mandor: "Slamet Riyadi", status: "onprogress" },
    { id: 2, nama_program: "Bangun Gedung Kantor PT. XYZ", tanggal_mulai: "2025-10-01", tanggal_selesai: "2026-03-15", mandor: "Budi Santoso", status: "onprogress" },
    { id: 3, nama_program: "Interior Apartemen Green Lake", tanggal_mulai: "2025-09-20", tanggal_selesai: "2025-11-05", mandor: "Agus Pranoto", status: "completed" },
    { id: 4, nama_program: "Perbaikan Atap Gudang", tanggal_mulai: "2025-11-01", tanggal_selesai: "2025-11-20", mandor: "Wahyu", status: "pending" },
    { id: 5, nama_program: "Proyek Villa Bali", tanggal_mulai: "2025-08-15", tanggal_selesai: "2025-10-30", mandor: "Komang Adi", status: "cancelled" },
  ]);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" atau "edit"
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const [formData, setFormData] = useState({
    nama_program: "",
    tanggal_mulai: "",
    tanggal_selesai: "",
    mandor: "",
    status: "pending",
  });

  const openAddModal = () => {
    setModalType("add");
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (sched) => {
    setModalType("edit");
    setSelectedSchedule(sched);
    setFormData({
      nama_program: sched.nama_program,
      tanggal_mulai: sched.tanggal_mulai,
      tanggal_selesai: sched.tanggal_selesai,
      mandor: sched.mandor,
      status: sched.status,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      nama_program: "",
      tanggal_mulai: "",
      tanggal_selesai: "",
      mandor: "",
      status: "pending",
    });
    setSelectedSchedule(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.nama_program || !formData.tanggal_mulai || !formData.tanggal_selesai || !formData.mandor) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (modalType === "add") {
      const newId = Math.max(...schedules.map(s => s.id), 0) + 1;
      setSchedules([...schedules, { id: newId, ...formData }]);
      alert("Program kerja berhasil ditambahkan!");
    } else {
      setSchedules(schedules.map(s => s.id === selectedSchedule.id ? { ...s, ...formData } : s));
      alert("Program kerja berhasil diupdate!");
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (!confirm("Yakin ingin menghapus program kerja ini?")) return;
    setSchedules(schedules.filter(s => s.id !== id));
    alert("Program kerja dihapus!");
  };

  const getStatusBadge = (status) => {
    const styles = {
      onprogress: { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)" },
      completed: { bg: "rgba(34, 197, 94, 0.2)", color: "#86EFAC", border: "rgba(34, 197, 94, 0.3)" },
      pending: { bg: "rgba(251, 191, 36, 0.2)", color: "#FDE047", border: "rgba(251, 191, 36, 0.3)" },
      cancelled: { bg: "rgba(239, 68, 68, 0.2)", color: "#FCA5A5", border: "rgba(239, 68, 68, 0.3)" },
    };
    const s = styles[status] || styles.pending;
    return {
      backgroundColor: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
    };
  };

  const filteredSchedules = schedules.filter(s =>
    s.nama_program.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.mandor.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px',backgroundColor: '#7C3AED', borderRadius: '8px', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}
            onClick={() => navigate('/admin/jadwalKerja')}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Jadwal Kerja</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Program Kerja</h2>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari nama program atau mandor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 40px', backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <button onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#7C3AED', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)' }}>
              <Plus size={18} /> Add Schedule
            </button>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading...</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '12px', color: '#6B7280', borderBottom: '1px solid #1A1D35', backgroundColor: '#0B0D1A' }}>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>ID</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Nama Program</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Mulai</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Selesai</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Mandor</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Status</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedules.map((sched) => (
                      <tr key={sched.id} style={{ borderBottom: '1px solid #1A1D35' }}>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white' }}>{sched.id}</td>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white', fontWeight: '500' }}>{sched.nama_program}</td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>{sched.tanggal_mulai}</td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>{sched.tanggal_selesai}</td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>{sched.mandor}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            ...getStatusBadge(sched.status)
                          }}>
                            {sched.status === "onprogress" ? "On Progress" : sched.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => openEditModal(sched)} style={{ padding: '6px 12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#93C5FD', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(sched.id)} style={{ padding: '6px 12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#FCA5A5', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal Add / Edit */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', width: '520px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>
                {modalType === "add" ? "Tambah Program Kerja" : "Edit Program Kerja"}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Nama Program *</label>
                  <input type="text" name="nama_program" value={formData.nama_program} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Tanggal Mulai *</label>
                  <input type="date" name="tanggal_mulai" value={formData.tanggal_mulai} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Tanggal Selesai *</label>
                  <input type="date" name="tanggal_selesai" value={formData.tanggal_selesai} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Mandor *</label>
                  <input type="text" name="mandor" value={formData.mandor} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                    <option value="pending">Pending</option>
                    <option value="onprogress">On Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={() => setShowModal(false)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#1A1D35', border: '1px solid #2D3748', borderRadius: '8px', color: '#9CA3AF', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleSubmit}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)' }}>
                  {modalType === "add" ? "Tambah Program" : "Update Program"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramKerja;