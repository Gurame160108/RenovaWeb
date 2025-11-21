import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Search, Filter, Eye, Download, Send, FileText, CheckCircle, Clock, User, MessageSquare, Upload } from "lucide-react";

const DesainRevisiArsitek = () => {
  const navigate = useNavigate();

  // Data dummy desain
  const [designs, setDesigns] = useState([
    {
      id: 1,
      nama_project: "Renovasi Rumah Bpk. Ahmad",
      user: "Ahmad Susanto",
      tanggal_upload: "2025-11-10",
      jenis: "Desain Awal",
      status: "Final",
      file: "desain_rumah_ahmad_v1.pdf",
      keterangan: "Desain awal renovasi rumah 2 lantai",
      revisi_dari: null,
      komentar_user: "Desain sudah bagus, tapi mohon penyesuaian untuk kamar tidur"
    },
    {
      id: 2,
      nama_project: "Bangun Gedung Kantor PT. XYZ",
      user: "PT. XYZ Indonesia",
      tanggal_upload: "2025-11-12",
      jenis: "Desain Awal",
      status: "Menunggu Review",
      file: "gedung_kantor_xyz_v1.pdf",
      keterangan: "Desain struktur gedung 5 lantai",
      revisi_dari: null,
      komentar_user: null
    },
    {
      id: 3,
      nama_project: "Renovasi Rumah Bpk. Ahmad",
      user: "Ahmad Susanto",
      tanggal_upload: "2025-11-15",
      jenis: "Revisi",
      status: "Proses",
      file: "desain_rumah_ahmad_v2.pdf",
      keterangan: "Revisi desain kamar tidur dan tambahan taman",
      revisi_dari: 1,
      komentar_user: "Perlu penambahan taman di belakang rumah"
    },
    {
      id: 4,
      nama_project: "Interior Apartemen Green Lake",
      user: "Diana Putri",
      tanggal_upload: "2025-11-08",
      jenis: "Desain Awal",
      status: "Final",
      file: "interior_apartemen_diana.pdf",
      keterangan: "Desain interior apartemen tipe 2BR",
      revisi_dari: null,
      komentar_user: "Sangat suka dengan konsep yang ditawarkan"
    }
  ]);

  // Data dummy permintaan revisi dari user
  const [permintaanRevisi, setPermintaanRevisi] = useState([
    {
      id: 1,
      nama_project: "Renovasi Rumah Bpk. Ahmad",
      user: "Ahmad Susanto",
      permintaan: "Perubahan layout kamar tidur utama",
      keterangan: "Mohon kamar tidur utama dibuat lebih luas dengan walk-in closet",
      tanggal: "2025-11-14",
      status: "Proses",
      prioritas: "Tinggi"
    },
    {
      id: 2,
      nama_project: "Bangun Gedung Kantor PT. XYZ",
      user: "PT. XYZ Indonesia",
      permintaan: "Penambahan ruang meeting",
      keterangan: "Perlu tambahan 2 ruang meeting di lantai 3",
      tanggal: "2025-11-13",
      status: "Proses",
      prioritas: "Sedang"
    },
    {
      id: 3,
      nama_project: "Desain Vila Puncak",
      user: "Bapak Santoso",
      permintaan: "Perubahan material atap",
      keterangan: "Ingin mengganti material atap dari genteng ke kayu",
      tanggal: "2025-11-11",
      status: "Selesai",
      prioritas: "Rendah"
    },
    {
      id: 4,
      nama_project: "Interior Apartemen Green Lake",
      user: "Diana Putri",
      permintaan: "Penambahan storage",
      keterangan: "Minta tambahan storage di bawah tangga",
      tanggal: "2025-11-09",
      status: "Selesai",
      prioritas: "Sedang"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterJenis, setFilterJenis] = useState("all");
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedRevisi, setSelectedRevisi] = useState(null);
  const [showDesignModal, setShowDesignModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRevisiModal, setShowRevisiModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [formData, setFormData] = useState({
    project: "",
    keterangan: "",
    file: null
  });

  // Data arsitek (dummy data)
  const [arsitek] = useState({
    Nama_Lengkap: "Roihan Galang"
  });

  const getStatusBadge = (status) => {
    const styles = {
      "Final": { bg: "rgba(34, 197, 94, 0.2)", color: "#86EFAC", border: "rgba(34, 197, 94, 0.3)", icon: CheckCircle },
      "Proses": { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)", icon: Clock },
      "Menunggu Review": { bg: "rgba(251, 191, 36, 0.2)", color: "#FDE047", border: "rgba(251, 191, 36, 0.3)", icon: Clock },
      "Selesai": { bg: "rgba(34, 197, 94, 0.2)", color: "#86EFAC", border: "rgba(34, 197, 94, 0.3)", icon: CheckCircle }
    };
    return styles[status] || styles["Proses"];
  };

  const getPrioritasBadge = (prioritas) => {
    const styles = {
      "Tinggi": { bg: "rgba(239, 68, 68, 0.2)", color: "#FCA5A5", border: "rgba(239, 68, 68, 0.3)" },
      "Sedang": { bg: "rgba(251, 191, 36, 0.2)", color: "#FDE047", border: "rgba(251, 191, 36, 0.3)" },
      "Rendah": { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)" }
    };
    return styles[prioritas] || styles["Sedang"];
  };

  const getJenisBadge = (jenis) => {
    const styles = {
      "Desain Awal": { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)" },
      "Revisi": { bg: "rgba(168, 85, 247, 0.2)", color: "#D8B4FE", border: "rgba(168, 85, 247, 0.3)" }
    };
    return styles[jenis] || styles["Desain Awal"];
  };

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.nama_project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || design.status === filterStatus;
    const matchesJenis = filterJenis === "all" || design.jenis === filterJenis;
    return matchesSearch && matchesStatus && matchesJenis;
  });

  const filteredRevisi = permintaanRevisi.filter(revisi => {
    const matchesSearch = revisi.nama_project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         revisi.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || revisi.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleLihatDetail = (design) => {
    setSelectedDesign(design);
    setShowDetailModal(true);
  };

  const handleKirimRevisi = (revisi) => {
    setSelectedRevisi(revisi);
    setShowRevisiModal(true);
  };

  const handleSetFinal = (designId) => {
    setDesigns(designs.map(design => 
      design.id === designId 
        ? { ...design, status: "Final" }
        : design
    ));
    alert("Desain berhasil ditandai sebagai final!");
  };

  const handleSelesaiRevisi = (revisiId) => {
    setPermintaanRevisi(permintaanRevisi.map(revisi =>
      revisi.id === revisiId
        ? { ...revisi, status: "Selesai" }
        : revisi
    ));
    alert("Permintaan revisi ditandai sebagai selesai!");
  };

  const handleUploadDesain = () => {
    setShowUploadModal(true);
    setFormData({
      project: "",
      keterangan: "",
      file: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmitDesain = () => {
    if (!formData.project || !formData.keterangan || !formData.file) {
      alert("Semua field harus diisi!");
      return;
    }

    const newDesign = {
      id: Math.max(...designs.map(d => d.id), 0) + 1,
      nama_project: formData.project,
      user: "User Baru", // Ini bisa disesuaikan
      tanggal_upload: new Date().toISOString().split('T')[0],
      jenis: "Desain Awal",
      status: "Menunggu Review",
      file: formData.file.name,
      keterangan: formData.keterangan,
      revisi_dari: null,
      komentar_user: null
    };

    setDesigns([...designs, newDesign]);
    setShowUploadModal(false);
    alert("Desain berhasil diupload!");
  };

  const handleSubmitRevisi = () => {
    if (!selectedRevisi) return;

    const newDesign = {
      id: Math.max(...designs.map(d => d.id), 0) + 1,
      nama_project: selectedRevisi.nama_project,
      user: selectedRevisi.user,
      tanggal_upload: new Date().toISOString().split('T')[0],
      jenis: "Revisi",
      status: "Proses",
      file: "revisi_" + selectedRevisi.nama_project.toLowerCase().replace(/ /g, '_') + ".pdf",
      keterangan: `Revisi: ${selectedRevisi.permintaan}`,
      revisi_dari: selectedRevisi.id,
      komentar_user: selectedRevisi.keterangan
    };

    setDesigns([...designs, newDesign]);
    setShowRevisiModal(false);
    alert("Revisi desain berhasil dikirim!");
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0B0D1A', color: '#F3F4F6', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Sidebar */}
      <div style={{ width: '256px', backgroundColor: '#12142A', borderRight: '1px solid #1A1D35', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #1A1D35' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Renova</h1>
        </div>

        <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '10px 12px', 
              borderRadius: '8px', 
              color: '#9CA3AF', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => navigate('/arsitek/dashboard')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
          </div>
          
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '10px 12px', 
              borderRadius: '8px', 
              color: '#9CA3AF', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => navigate('/arsitek/instruksiMandorA')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Instruksi Mandor</span>
          </div>          
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '10px 12px', 
              borderRadius: '8px', 
              color: '#9CA3AF', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => navigate('/arsitek/jadwalKerjaA')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Jadwal Kerja</span>
          </div>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '10px 12px', 
              borderRadius: '8px', 
              color: '#9CA3AF', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => navigate('/arsitek/laporanProject')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
          
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Laporan Kerja</span>
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
              boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' 
            }}
          >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Desain & Revisi</span>
          </div>
                    <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '10px 12px', 
              borderRadius: '8px', 
              color: '#9CA3AF', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onClick={() => navigate('/arsitek/laporanMandor')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
          
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Laporan Mandor</span>
          </div>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #1A1D35', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
            RG
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Manajemen Desain & Revisi</h2>
        </header>

        <main style={{ padding: '28px' }}>
          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '300px' }}>
                <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Cari project atau user..."
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
                  <option value="Final">Final</option>
                  <option value="Proses">Proses</option>
                  <option value="Menunggu Review">Menunggu Review</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>
              <div style={{ position: 'relative' }}>
                <Filter size={18} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <select
                  value={filterJenis}
                  onChange={(e) => setFilterJenis(e.target.value)}
                  style={{ padding: '10px 12px 10px 40px', backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                  <option value="all">Semua Jenis</option>
                  <option value="Desain Awal">Desain Awal</option>
                  <option value="Revisi">Revisi</option>
                </select>
              </div>
            </div>
            <button onClick={handleUploadDesain} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#7C3AED', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <Upload size={18} /> Upload Desain
            </button>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Total Desain</p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0 }}>{designs.length}</p>
            </div>
            <div style={{ backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Desain Final</p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#86EFAC', margin: 0 }}>{designs.filter(d => d.status === 'Final').length}</p>
            </div>
            <div style={{ backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Permintaan Revisi</p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#FDE047', margin: 0 }}>{permintaanRevisi.filter(r => r.status === 'Proses').length}</p>
            </div>
            <div style={{ backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>Revisi Selesai</p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#93C5FD', margin: 0 }}>{permintaanRevisi.filter(r => r.status === 'Selesai').length}</p>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid #1A1D35' }}>
            <button 
              onClick={() => setShowDesignModal(false)}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: !showDesignModal ? '#7C3AED' : 'transparent', 
                border: 'none', 
                borderRadius: '8px 8px 0 0',
                color: !showDesignModal ? 'white' : '#9CA3AF',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Daftar Desain
            </button>
            <button 
              onClick={() => setShowDesignModal(true)}
              style={{ 
                padding: '12px 24px', 
                backgroundColor: showDesignModal ? '#7C3AED' : 'transparent', 
                border: 'none', 
                borderRadius: '8px 8px 0 0',
                color: showDesignModal ? 'white' : '#9CA3AF',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Permintaan Revisi ({permintaanRevisi.filter(r => r.status === 'Proses').length})
            </button>
          </div>

          {/* Content berdasarkan tab */}
          {!showDesignModal ? (
            /* Tabel Daftar Desain */
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '12px', color: '#6B7280', borderBottom: '1px solid #1A1D35', backgroundColor: '#0B0D1A' }}>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Project</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>User</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Tanggal</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Jenis</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>File</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDesigns.map((design) => {
                      const statusStyle = getStatusBadge(design.status);
                      const jenisStyle = getJenisBadge(design.jenis);
                      
                      return (
                        <tr key={design.id} style={{ borderBottom: "1px solid #1A1D35" }}>
                          <td style={{ padding: "16px 24px", color: "white" }}>{design.nama_project}</td>
                          <td style={{ padding: "16px 24px", color: "#9CA3AF" }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <User size={14} />
                              {design.user}
                            </div>
                          </td>
                          <td style={{ padding: "16px 24px", color: "#9CA3AF" }}>{design.tanggal_upload}</td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "12px", ...jenisStyle }}>
                              {design.jenis}
                            </span>
                          </td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "12px", ...statusStyle }}>
                              {design.status}
                            </span>
                          </td>
                          <td style={{ padding: "16px 24px", color: "#9CA3AF" }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <FileText size={14} />
                              {design.file}
                            </div>
                          </td>
                          <td style={{ padding: "16px 24px", display: "flex", gap: "8px" }}>
                            <Eye
                              size={16}
                              color="#93C5FD"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleLihatDetail(design)}
                            />
                            <Download
                              size={16}
                              color="#86EFAC"
                              style={{ cursor: "pointer" }}
                              onClick={() => alert(`Download: ${design.file}`)}
                            />
                            {design.status !== "Final" && (
                              <CheckCircle
                                size={16}
                                color="#FDE047"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleSetFinal(design.id)}
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredDesigns.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                  Tidak ada desain yang ditemukan
                </div>
              )}
            </div>
          ) : (
            /* Tabel Permintaan Revisi */
            <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '12px', color: '#6B7280', borderBottom: '1px solid #1A1D35', backgroundColor: '#0B0D1A' }}>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Project</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>User</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Permintaan</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Tanggal</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Prioritas</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Status</th>
                      <th style={{ padding: '12px 24px', fontWeight: 600 }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRevisi.map((revisi) => {
                      const statusStyle = getStatusBadge(revisi.status);
                      const prioritasStyle = getPrioritasBadge(revisi.prioritas);
                      
                      return (
                        <tr key={revisi.id} style={{ borderBottom: "1px solid #1A1D35" }}>
                          <td style={{ padding: "16px 24px", color: "white" }}>{revisi.nama_project}</td>
                          <td style={{ padding: "16px 24px", color: "#9CA3AF" }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <User size={14} />
                              {revisi.user}
                            </div>
                          </td>
                          <td style={{ padding: "16px 24px", color: "white" }}>
                            <div>
                              <p style={{ margin: '0 0 4px 0', fontWeight: '500' }}>{revisi.permintaan}</p>
                              <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>{revisi.keterangan}</p>
                            </div>
                          </td>
                          <td style={{ padding: "16px 24px", color: "#9CA3AF" }}>{revisi.tanggal}</td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "12px", ...prioritasStyle }}>
                              {revisi.prioritas}
                            </span>
                          </td>
                          <td style={{ padding: "16px 24px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "12px", ...statusStyle }}>
                              {revisi.status}
                            </span>
                          </td>
                          <td style={{ padding: "16px 24px", display: "flex", gap: "8px" }}>
                            {revisi.status === "Proses" && (
                              <>
                                <Send
                                  size={16}
                                  color="#93C5FD"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleKirimRevisi(revisi)}
                                />
                                <CheckCircle
                                  size={16}
                                  color="#86EFAC"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleSelesaiRevisi(revisi.id)}
                                />
                              </>
                            )}
                            <Eye
                              size={16}
                              color="#FDE047"
                              style={{ cursor: "pointer" }}
                              onClick={() => alert(`Lihat detail permintaan revisi`)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredRevisi.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                  Tidak ada permintaan revisi yang ditemukan
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Modal Detail Desain */}
      {showDetailModal && selectedDesign && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', width: '600px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Detail Desain</h3>
              <button onClick={() => setShowDetailModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: '0 0 4px 0' }}>{selectedDesign.nama_project}</h4>
                  <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>Upload: {selectedDesign.tanggal_upload}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>User</p>
                    <p style={{ fontSize: '14px', color: 'white', margin: 0 }}>{selectedDesign.user}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Jenis</p>
                    <span style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '12px', ...getJenisBadge(selectedDesign.jenis) }}>
                      {selectedDesign.jenis}
                    </span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Status</p>
                  <span style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', ...getStatusBadge(selectedDesign.status) }}>
                    {selectedDesign.status}
                  </span>
                </div>

                <div>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>File</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#0B0D1A', borderRadius: '8px', border: '1px solid #1A1D35' }}>
                    <FileText size={20} color="#93C5FD" />
                    <span style={{ color: 'white' }}>{selectedDesign.file}</span>
                  </div>
                </div>

                <div>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Keterangan</p>
                  <p style={{ fontSize: '14px', color: 'white', margin: 0, lineHeight: '1.6' }}>{selectedDesign.keterangan}</p>
                </div>

                {selectedDesign.komentar_user && (
                  <div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 4px 0' }}>Komentar User</p>
                    <div style={{ padding: '12px', backgroundColor: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <p style={{ fontSize: '14px', color: '#FDE047', margin: 0, lineHeight: '1.6' }}>{selectedDesign.komentar_user}</p>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={() => setShowDetailModal(false)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#1A1D35', border: '1px solid #2D3748', borderRadius: '8px', color: '#9CA3AF', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Tutup
                </button>
                <button onClick={() => alert(`Download: ${selectedDesign.file}`)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Download size={16} /> Download File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Upload Desain */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', width: '500px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Upload Desain Baru</h3>
              <button onClick={() => setShowUploadModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Project *</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
                  >
                    <option value="">Pilih Project</option>
                    <option value="Renovasi Rumah Bpk. Ahmad">Renovasi Rumah Bpk. Ahmad</option>
                    <option value="Bangun Gedung Kantor PT. XYZ">Bangun Gedung Kantor PT. XYZ</option>
                    <option value="Interior Apartemen Green Lake">Interior Apartemen Green Lake</option>
                    <option value="Desain Vila Puncak">Desain Vila Puncak</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>File Desain *</label>
                  <input 
                    type="file" 
                    onChange={handleFileChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Keterangan *</label>
                  <textarea 
                    name="keterangan"
                    value={formData.keterangan}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Tambahkan keterangan tentang desain..."
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={() => setShowUploadModal(false)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#1A1D35', border: '1px solid #2D3748', borderRadius: '8px', color: '#9CA3AF', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Batal
                </button>
                <button onClick={handleSubmitDesain}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)' }}>
                  Upload Desain
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Kirim Revisi */}
      {showRevisiModal && selectedRevisi && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', width: '500px', maxHeight: '90vh', overflow: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>Kirim Revisi Desain</h3>
              <button onClick={() => setShowRevisiModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '14px', color: 'white', margin: '0 0 8px 0' }}>
                  Project: <strong>{selectedRevisi.nama_project}</strong>
                </p>
                <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 8px 0' }}>
                  Permintaan: {selectedRevisi.permintaan}
                </p>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                  Keterangan: {selectedRevisi.keterangan}
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>File Revisi *</label>
                  <input 
                    type="file" 
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Keterangan Revisi</label>
                  <textarea 
                    rows="4"
                    placeholder="Tambahkan keterangan tentang revisi yang dikirim..."
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={() => setShowRevisiModal(false)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#1A1D35', border: '1px solid #2D3748', borderRadius: '8px', color: '#9CA3AF', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                  Batal
                </button>
                <button onClick={handleSubmitRevisi}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#7C3AED', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)' }}>
                  Kirim Revisi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesainRevisiArsitek;