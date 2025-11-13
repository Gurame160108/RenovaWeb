import React, { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, Eye, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderManagement = () => {
  const navigate = useNavigate(); // Navigasi antar halaman

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    nama_proyek: "",
    tgl_proyek: "",
    status: "Proses",
    id_user: "",
    id_mandor: "",
    id_arsitek: ""
  });

  // Dummy data
  useEffect(() => {
    const dummyProjects = [
      {
        id_proyek: "ARS01",
        nama_proyek: "Renovasi Ruko",
        tgl_proyek: "2025-01-30",
        status: "Proses",
        id_user: 1,
        id_mandor: 2,
        id_arsitek: 3,
        mandor: "Mas Tris",
        arsitek: "Asep Rockey",
        client: "Udin Empayer"
      },
      {
        id_proyek: "ARS02",
        nama_proyek: "Renovasi Kantor",
        tgl_proyek: "2025-02-15",
        status: "Selesai",
        id_user: 2,
        id_mandor: 1,
        id_arsitek: 2,
        mandor: "Budi Santoso",
        arsitek: "John Doe",
        client: "PT. Maju Jaya"
      },
      {
        id_proyek: "ARS03",
        nama_proyek: "Renovasi Rumah",
        tgl_proyek: "2025-03-01",
        status: "Pending",
        id_user: 3,
        id_mandor: 3,
        id_arsitek: 1,
        mandor: "Ahmad Yani",
        arsitek: "Jane Smith",
        client: "Siti Nurhaliza"
      }
    ];
    setProjects(dummyProjects);
    setFilteredProjects(dummyProjects);
  }, []);

  // Filter & Search
  useEffect(() => {
    let filtered = projects;
    if (filterStatus !== "All") {
      filtered = filtered.filter(p => p.status === filterStatus);
    }
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.nama_proyek.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id_proyek.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProjects(filtered);
  }, [searchTerm, filterStatus, projects]);

  const handleOpenModal = (mode, project = null) => {
    setModalMode(mode);
    setSelectedProject(project);
    if (project) {
      setFormData({
        nama_proyek: project.nama_proyek,
        tgl_proyek: project.tgl_proyek,
        status: project.status,
        id_user: project.id_user,
        id_mandor: project.id_mandor,
        id_arsitek: project.id_arsitek
      });
    } else {
      setFormData({
        nama_proyek: "",
        tgl_proyek: "",
        status: "Proses",
        id_user: "",
        id_mandor: "",
        id_arsitek: ""
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "create") {
      const newProject = {
        id_proyek: `ARS0${projects.length + 1}`,
        ...formData,
        mandor: `Mandor ${formData.id_mandor}`,
        arsitek: `Arsitek ${formData.id_arsitek}`,
        client: `Client ${formData.id_user}`
      };
      setProjects([...projects, newProject]);
    } else if (modalMode === "edit") {
      setProjects(projects.map(p =>
        p.id_proyek === selectedProject.id_proyek
          ? { ...p, ...formData }
          : p
      ));
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      setProjects(projects.filter(p => p.id_proyek !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Selesai": return { bg: "rgba(34, 197, 94, 0.2)", color: "#4ADE80", border: "rgba(34, 197, 94, 0.3)" };
      case "Proses": return { bg: "rgba(251, 191, 36, 0.2)", color: "#FCD34D", border: "rgba(251, 191, 36, 0.3)" };
      case "Pending": return { bg: "rgba(239, 68, 68, 0.2)", color: "#F87171", border: "rgba(239, 68, 68, 0.3)" };
      default: return { bg: "rgba(124, 58, 237, 0.2)", color: "#A78BFA", border: "rgba(124, 58, 237, 0.3)" };
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: '#0B0D1A',
      color: '#F3F4F6',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '256px',
        backgroundColor: '#12142A',
        borderRight: '1px solid #1A1D35',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #1A1D35' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>Renova</h1>
        </div>

        <nav style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            onClick={() => navigate('/admin/dashboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '8px',
              color: '#9CA3AF', cursor: 'pointer'
            }}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Dashboard</span>
          </div>
          <div
            onClick={() => navigate('/admin/userManager')}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 12px', borderRadius: '8px',
              color: '#9CA3AF', cursor: 'pointer'
            }}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>User Management</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: '8px',
            backgroundColor: '#7C3AED', color: 'white',
            boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)'
          }}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Order Management</span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '10px 12px', borderRadius: '8px',
            color: '#9CA3AF', cursor: 'pointer'
          }}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Admin's Keys</span>
          </div>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #1A1D35', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: '#7C3AED', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '14px'
          }}>RG</div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: 0 }}>Roihan Galang</p>
            <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Admin account</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#0B0D1A' }}>
        <header style={{ backgroundColor: '#12142A', padding: '20px 28px', borderBottom: '1px solid #1A1D35' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Manajemen Proyek</h2>
        </header>

        <main style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { label: 'Total', value: projects.length },
              { label: 'Proses', value: projects.filter(p => p.status === 'Proses').length },
              { label: 'Selesai', value: projects.filter(p => p.status === 'Selesai').length },
              { label: 'Pending', value: projects.filter(p => p.status === 'Pending').length }
            ].map((stat, idx) => (
              <div key={idx} style={{
                backgroundColor: '#12142A', padding: '20px',
                borderRadius: '12px', border: '1px solid #1A1D35'
              }}>
                <span style={{
                  fontSize: '12px', color: '#9CA3AF', fontWeight: '500',
                  display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px'
                }}>
                  <span style={{ color: '#7C3AED' }}>●</span> {stat.label}
                </span>
                <p style={{ fontSize: '30px', fontWeight: 'bold', color: 'white', margin: 0 }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Search & Filter */}
          <div style={{
            backgroundColor: '#12142A', padding: '20px', borderRadius: '12px',
            border: '1px solid #1A1D35', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', gap: '16px'
          }}>
            <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                <Search size={18} style={{
                  position: 'absolute', left: '12px', top: '50%',
                  transform: 'translateY(-50%)', color: '#6B7280'
                }} />
                <input
                  type="text"
                  placeholder="Search proyek..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 12px 10px 40px',
                    backgroundColor: '#0B0D1A', border: '1px solid #1A1D35',
                    borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
                  }}
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  padding: '10px 16px', backgroundColor: '#0B0D1A',
                  border: '1px solid #1A1D35', borderRadius: '8px',
                  color: 'white', fontSize: '14px', cursor: 'pointer', outline: 'none'
                }}
              >
                <option value="All">All Status</option>
                <option value="Proses">Proses</option>
                <option value="Selesai">Selesai</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <button
              onClick={() => handleOpenModal('create')}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 20px', backgroundColor: '#7C3AED',
                color: 'white', border: 'none', borderRadius: '8px',
                fontSize: '14px', fontWeight: '500', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
              }}
            >
              <Plus size={18} /> Tambah Proyek
            </button>
          </div>

          {/* Table */}
          <div style={{
            backgroundColor: '#12142A', borderRadius: '12px',
            border: '1px solid #1A1D35', overflow: 'hidden'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{
                    textAlign: 'left', fontSize: '12px', color: '#6B7280',
                    borderBottom: '1px solid #1A1D35', backgroundColor: '#0B0D1A'
                  }}>
                    {['ID Proyek', 'Nama Proyek', 'Klien', 'Mandor', 'Arsitek', 'Tanggal', 'Status', 'Actions'].map((header, idx) => (
                      <th key={idx} style={{
                        padding: '16px 20px', fontWeight: '500',
                        textAlign: idx === 7 ? 'center' : 'left'
                      }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {idx < 7 && <span style={{ color: '#7C3AED' }}>●</span>}
                          {header}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="8" style={{
                        padding: '40px', textAlign: 'center',
                        color: '#9CA3AF', fontSize: '14px'
                      }}>
                        Tidak ada proyek ditemukan
                      </td>
                    </tr>
                  ) : (
                    filteredProjects.map((project, idx) => (
                      <tr key={idx} style={{
                        borderBottom: '1px solid #1A1D35',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0B0D1A'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: 'white', fontWeight: '600' }}>
                          {project.id_proyek}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: 'white' }}>
                          {project.nama_proyek}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '13px', color: '#9CA3AF' }}>
                          {project.client}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '13px', color: '#9CA3AF' }}>
                          {project.mandor}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '13px', color: '#9CA3AF' }}>
                          {project.arsitek}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '13px', color: '#9CA3AF' }}>
                          {new Date(project.tgl_proyek).toLocaleDateString('id-ID')}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{
                            padding: '4px 12px', borderRadius: '20px',
                            fontSize: '12px', fontWeight: '500',
                            backgroundColor: getStatusColor(project.status).bg,
                            color: getStatusColor(project.status).color,
                            border: `1px solid ${getStatusColor(project.status).border}`
                          }}>
                            {project.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button onClick={() => handleOpenModal('view', project)} style={{
                              padding: '8px', backgroundColor: 'rgba(59, 130, 246, 0.2)',
                              border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              <Eye size={16} color="#60A5FA" />
                            </button>
                            <button onClick={() => handleOpenModal('edit', project)} style={{
                              padding: '8px', backgroundColor: 'rgba(251, 191, 36, 0.2)',
                              border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '6px',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              <Edit2 size={16} color="#FCD34D" />
                            </button>
                            <button onClick={() => handleDelete(project.id_proyek)} style={{
                              padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.2)',
                              border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px',
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              <Trash2 size={16} color="#F87171" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#12142A', borderRadius: '12px',
            border: '1px solid #1A1D35', width: '90%', maxWidth: '600px',
            maxHeight: '90vh', overflow: 'auto'
          }}>
            <div style={{
              padding: '24px', borderBottom: '1px solid #1A1D35',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>
                {modalMode === 'create' ? 'Tambah Proyek Baru' :
                 modalMode === 'edit' ? 'Edit Proyek' : 'Detail Proyek'}
              </h3>
              <button onClick={handleCloseModal} style={{
                backgroundColor: 'transparent', border: 'none',
                cursor: 'pointer', padding: '4px'
              }}>
                <X size={20} color="#9CA3AF" />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>
                    Nama Proyek
                  </label>
                  <input
                    type="text"
                    name="nama_proyek"
                    value={formData.nama_proyek}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    required
                    style={{
                      width: '100%', padding: '10px 12px',
                      backgroundColor: '#0B0D1A', border: '1px solid #1A1D35',
                      borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>
                    Tanggal Proyek
                  </label>
                  <input
                    type="date"
                    name="tgl_proyek"
                    value={formData.tgl_proyek}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    required
                    style={{
                      width: '100%', padding: '10px 12px',
                      backgroundColor: '#0B0D1A', border: '1px solid #1A1D35',
                      borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    style={{
                      width: '100%', padding: '10px 12px',
                      backgroundColor: '#0B0D1A', border: '1px solid #1A1D35',
                      borderRadius: '8px', color: 'white', fontSize: '14px',
                      cursor: 'pointer', outline: 'none'
                    }}
                  >
                    <option value="Proses">Proses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>
                    ID User/Client
                  </label>
                  <input
                    type="number"
                    name="id_user"
                    value={formData.id_user}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    required
                    style={{
                      width: '100%', padding: '10px 1212px',
                      backgroundColor: '#0B0D1A', border: '1px solid #1A1D35',
                      borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>
                    ID Mandor
                  </label>
                  <input
                    type="number"
                    name="id_mandor"
                    value={formData.id_mandor}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    required
                    style={{
                      width: '100%', padding: '10px 12px',
                      backgroundColor: '#0B0D1A', border: '1px solid #1A1D35',
                      borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '8px' }}>
                    ID Arsitek
                  </label>
                  <input
                    type="number"
                    name="id_arsitek"
                    value={formData.id_arsitek}
                    onChange={handleInputChange}
                    disabled={modalMode === 'view'}
                    required
                    style={{
                      width: '100%', padding: '10px 12px',
                      backgroundColor: '#0B0D1A', border: '1px solid #1A1D35',
                      borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none'
                    }}
                  />
                </div>
              </div>

              {modalMode !== 'view' && (
                <div style={{
                  display: 'flex', gap: '12px', marginTop: '24px',
                  paddingTop: '24px', borderTop: '1px solid #1A1D35'
                }}>
                  <button type="button" onClick={handleCloseModal} style={{
                    flex: 1, padding: '12px', backgroundColor: 'transparent',
                    border: '1px solid #1A1D35', borderRadius: '8px',
                    color: '#9CA3AF', fontSize: '14px', fontWeight: '500', cursor: 'pointer'
                  }}>
                    Batal
                  </button>
                  <button type="submit" style={{
                    flex: 1, padding: '12px', backgroundColor: '#7C3AED',
                    border: 'none', borderRadius: '8px', color: 'white',
                    fontSize: '14px', fontWeight: '500', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
                  }}>
                    {modalMode === 'create' ? 'Tambah Proyek' : 'Simpan Perubahan'}
                  </button>
                </div>
              )}

              {modalMode === 'view' && (
                <div style={{
                  marginTop: '24px', paddingTop: '24px',
                  borderTop: '1px solid #1A1D35'
                }}>
                  <button type="button" onClick={handleCloseModal} style={{
                    width: '100%', padding: '12px', backgroundColor: '#7C3AED',
                    border: 'none', borderRadius: '8px', color: 'white',
                    fontSize: '14px', fontWeight: '500', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
                  }}>
                    Tutup
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;