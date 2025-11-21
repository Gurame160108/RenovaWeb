  import React, { useState } from "react";
  import { Plus, X, Search, Download, Eye, Filter, Calendar } from "lucide-react";
  import { useNavigate } from "react-router-dom";

  const LaporanProject = () => {
    const [reports, setReports] = useState([
      { 
        id: 1, 
        nama_project: "Renovasi Rumah Bpk. Ahmad", 
        tanggal_laporan: "2025-11-15", 
        progress: 65, 
        mandor: "Slamet Riyadi",
        status: "onprogress",
        biaya_actual: "Rp 45.000.000",
        biaya_estimasi: "Rp 50.000.000",
        catatan: "Progress berjalan lancar, material sudah 80% terpenuhi"
      },
      { 
        id: 2, 
        nama_project: "Bangun Gedung Kantor PT. XYZ", 
        tanggal_laporan: "2025-11-14", 
        progress: 40, 
        mandor: "Budi Santoso",
        status: "onprogress",
        biaya_actual: "Rp 250.000.000",
        biaya_estimasi: "Rp 500.000.000",
        catatan: "Fondasi sudah selesai, mulai pengerjaan struktur"
      },
      { 
        id: 3, 
        nama_project: "Interior Apartemen Green Lake", 
        tanggal_laporan: "2025-11-05", 
        progress: 100, 
        mandor: "Agus Pranoto",
        status: "completed",
        biaya_actual: "Rp 35.000.000",
        biaya_estimasi: "Rp 35.000.000",
        catatan: "Project selesai tepat waktu dan sesuai budget"
      },
      { 
        id: 4, 
        nama_project: "Perbaikan Atap Gudang", 
        tanggal_laporan: "2025-11-10", 
        progress: 30, 
        mandor: "Wahyu",
        status: "pending",
        biaya_actual: "Rp 8.000.000",
        biaya_estimasi: "Rp 15.000.000",
        catatan: "Menunggu material atap dari supplier"
      },
    ]);

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [modalType, setModalType] = useState("add");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    const [formData, setFormData] = useState({
      nama_project: "",
      tanggal_laporan: "",
      progress: 0,
      mandor: "",
      status: "pending",
      biaya_actual: "",
      biaya_estimasi: "",
      catatan: "",
    });

    const openAddModal = () => {
      setModalType("add");
      resetForm();
      setShowModal(true);
    };

    const openEditModal = (report) => {
      setModalType("edit");
      setSelectedReport(report);
      setFormData({
        nama_project: report.nama_project,
        tanggal_laporan: report.tanggal_laporan,
        progress: report.progress,
        mandor: report.mandor,
        status: report.status,
        biaya_actual: report.biaya_actual,
        biaya_estimasi: report.biaya_estimasi,
        catatan: report.catatan,
      });
      setShowModal(true);
    };

    const openDetailModal = (report) => {
      setSelectedReport(report);
      setShowDetailModal(true);
    };

    const resetForm = () => {
      setFormData({
        nama_project: "",
        tanggal_laporan: "",
        progress: 0,
        mandor: "",
        status: "pending",
        biaya_actual: "",
        biaya_estimasi: "",
        catatan: "",
      });
      setSelectedReport(null);
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
      if (!formData.nama_project || !formData.tanggal_laporan || !formData.mandor) {
        alert("Field wajib harus diisi!");
        return;
      }

      if (modalType === "add") {
        const newId = Math.max(...reports.map(r => r.id), 0) + 1;
        setReports([...reports, { id: newId, ...formData }]);
        alert("Laporan berhasil ditambahkan!");
      } else {
        setReports(reports.map(r => r.id === selectedReport.id ? { ...r, ...formData } : r));
        alert("Laporan berhasil diupdate!");
      }

      setShowModal(false);
      resetForm();
    };

    const handleDelete = (id) => {
      if (window.confirm("Yakin ingin menghapus laporan ini?")) {
        setReports(reports.filter(r => r.id !== id));
        alert("Laporan dihapus!");
      }
    };

    const handleExport = (report) => {
      alert(`Mengekspor laporan: ${report.nama_project}`);
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

    const getProgressColor = (progress) => {
      if (progress >= 80) return "#86EFAC";
      if (progress >= 50) return "#93C5FD";
      if (progress >= 30) return "#FDE047";
      return "#FCA5A5";
    };

    const filteredReports = reports.filter(r => {
      const matchesSearch = r.nama_project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            r.mandor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || r.status === filterStatus;
      return matchesSearch && matchesFilter;
    });


    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
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
              onClick={() => handleNavigation('/arsitek/dashboard')}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => handleNavigation('/arsitek/InstruksiMandorA')}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Instruksi Mandor</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => handleNavigation('/arsitek/jadwalKerjaA')}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Jadwal Kerja</span>
            </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', backgroundColor: '#7C3AED', borderRadius: '8px', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Laporan Project</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => handleNavigation('/arsitek/DesainRevisiArsitek')}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Desain Revisi</span>
            </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
              onClick={() => handleNavigation('/arsitek/laporanMandor')}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <span style={{ fontSize: '16px' }}>●</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Laporan Mandor</span>
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
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Laporan Project</h2>
          </header>

          <main style={{ padding: '28px' }}>
            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '300px' }}>
                  <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder="Cari project atau mandor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px 10px 40px', backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none' }}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <Filter size={18} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ padding: '10px 12px 10px 40px', backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                    <option value="all">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="onprogress">On Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <button onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#7C3AED', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <Plus size={18} /> Tambah Laporan
              </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '12px', padding: '20px' }}>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Total Project</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>{reports.length}</p>
              </div>
              <div style={{ backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '12px', padding: '20px' }}>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>On Progress</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#93C5FD', margin: 0 }}>{reports.filter(r => r.status === 'onprogress').length}</p>
              </div>
              <div style={{ backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '12px', padding: '20px' }}>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Completed</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#86EFAC', margin: 0 }}>{reports.filter(r => r.status === 'completed').length}</p>
              </div>
              <div style={{ backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '12px', padding: '20px' }}>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Pending</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#FDE047', margin: 0 }}>{reports.filter(r => r.status === 'pending').length}</p>
              </div>
            </div>

            {/* Table */}
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', overflow: 'hidden' }}>
              {loading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading...</div>
              ) : filteredReports.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Tidak ada data yang ditemukan</div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left', fontSize: '12px', color: '#6B7280', borderBottom: '1px solid #1A1D35', backgroundColor: '#0B0D1A' }}>
                        <th style={{ padding: '12px 24px', fontWeight: 600 }}>Nama Project</th>
                        <th style={{ padding: '12px 24px', fontWeight: 600 }}>Tanggal</th>
                        <th style={{ padding: '12px 24px', fontWeight: 600 }}>Progress</th>
                        <th style={{ padding: '12px 24px', fontWeight: 600 }}>Mandor</th>
                        <th style={{ padding: '12px 24px', fontWeight: 600 }}>Status</th>
                        <th style={{ padding: '12px 24px', fontWeight: 600 }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((r) => (
                        <tr key={r.id} style={{ borderBottom: "1px solid #1A1D35" }}>
                          <td style={{ padding: "16px 24px", color: "white" }}>{r.nama_project}</td>

                          <td style={{ padding: "16px 24px", color: "#9CA3AF" }}>
                            {r.tanggal_laporan}
                          </td>

                          <td style={{ padding: "16px 24px" }}>
                            <div
                              style={{
                                height: "8px",
                                backgroundColor: "#1A1D35",
                                borderRadius: "4px",
                                width: "100px",
                                position: "relative",
                              }}
                            >
                              <div
                                style={{
                                  width: `${r.progress}%`,
                                  height: "8px",
                                  backgroundColor: getProgressColor(r.progress),
                                  borderRadius: "4px",
                                }}
                              ></div>
                            </div>
                          </td>

                          <td style={{ padding: "16px 24px", color: "#9CA3AF" }}>{r.mandor}</td>

                          <td style={{ padding: "16px 24px" }}>
                            <span
                              style={{
                                padding: "4px 10px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                ...getStatusBadge(r.status),
                              }}
                            >
                              {r.status}
                            </span>
                          </td>

                          <td style={{ padding: "16px 24px", display: "flex", gap: "10px" }}>
                            <Eye
                              size={18}
                              color="#93C5FD"
                              style={{ cursor: "pointer" }}
                              onClick={() => openDetailModal(r)}
                            />
                            <Download
                              size={18}
                              color="#86EFAC"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleExport(r)}
                            />
                            <X
                              size={18}
                              color="#FCA5A5"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(r.id)}
                            />
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
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', width: '580px', maxHeight: '90vh', overflow: 'auto' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>
                  {modalType === "add" ? "Tambah Laporan Project" : "Edit Laporan Project"}
                </h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Nama Project *</label>
                    <input type="text" name="nama_project" value={formData.nama_project} onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Tanggal Laporan *</label>
                      <input type="date" name="tanggal_laporan" value={formData.tanggal_laporan} onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Progress (%)</label>
                      <input type="number" name="progress" min="0" max="100" value={formData.progress} onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Mandor *</label>
                    <input type="text" name="mandor" value={formData.mandor} onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Biaya Actual</label>
                      <input type="text" name="biaya_actual" value={formData.biaya_actual} onChange={handleInputChange}
                        placeholder="Rp 0"
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Biaya Estimasi</label>
                      <input type="text" name="biaya_estimasi" value={formData.biaya_estimasi} onChange={handleInputChange}
                        placeholder="Rp 0"
                        style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
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

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Catatan</label>
                    <textarea name="catatan" value={formData.catatan} onChange={handleInputChange}
                      rows="3"
                      placeholder="Tambahkan catatan atau update progress..."
                      style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button onClick={() => setShowModal(false)}
                    style={{ flex: 1, padding: '10px', backgroundColor: '#1A1D35', border: '1px solid #2D3748', borderRadius: '8px', color: '#9CA3AF', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button onClick={handleSubmit}
                    style={{ flex: 1, padding: '10px', backgroundColor: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)' }}>
                    {modalType === "add" ? "Tambah Laporan" : "Update Laporan"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detail */}
        {showDetailModal && selectedReport && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', width: '600px', maxHeight: '90vh', overflow: 'auto' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Detail Laporan Project</h3>
                <button onClick={() => setShowDetailModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <h4 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>{selectedReport.nama_project}</h4>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Laporan tanggal: {selectedReport.tanggal_laporan}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ backgroundColor: '#0B0D1A', padding: '16px', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 6px 0' }}>Progress</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ flex: 1, height: '8px', backgroundColor: '#1A1D35', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${selectedReport.progress}%`, height: '100%', backgroundColor: getProgressColor(selectedReport.progress) }}></div>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', color: getProgressColor(selectedReport.progress) }}>{selectedReport.progress}%</span>
                      </div>
                    </div>

                    <div style={{ backgroundColor: '#0B0D1A', padding: '16px', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 6px 0' }}>Status</p>
                      <span style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        display: 'inline-block',
                        ...getStatusBadge(selectedReport.status)
                      }}>
                        {selectedReport.status === "onprogress" ? "On Progress" : selectedReport.status}
                      </span>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#0B0D1A', padding: '16px', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Mandor</p>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: 'white', margin: 0 }}>{selectedReport.mandor}</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ backgroundColor: '#0B0D1A', padding: '16px', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Biaya Actual</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#93C5FD', margin: 0 }}>{selectedReport.biaya_actual}</p>
                    </div>

                    <div style={{ backgroundColor: '#0B0D1A', padding: '16px', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Biaya Estimasi</p>
                      <p style={{ fontSize: '16px', fontWeight: '600', color: '#9CA3AF', margin: 0 }}>{selectedReport.biaya_estimasi}</p>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#0B0D1A', padding: '16px', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Catatan</p>
                    <p style={{ fontSize: '14px', color: 'white', margin: 0, lineHeight: '1.6' }}>{selectedReport.catatan || 'Tidak ada catatan'}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button onClick={() => setShowDetailModal(false)}
                    style={{ flex: 1, padding: '10px', backgroundColor: '#1A1D35', border: '1px solid #2D3748', borderRadius: '8px', color: '#9CA3AF', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                    Close
                  </button>
                  <button onClick={() => handleExport(selectedReport)}
                    style={{ flex: 1, padding: '10px', backgroundColor: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Download size={16} /> Export PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default LaporanProject;