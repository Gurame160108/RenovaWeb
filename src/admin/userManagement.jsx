import React, { useState, useEffect } from "react";
import { MoreHorizontal, Plus, X, Search, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const navigate = useNavigate(); 
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([
    { id_role: 1, role: "admin" },
    { id_role: 2, role: "user" },
    { id_role: 3, role: "arsitek" },
    { id_role: 4, role: "mandor" },
    { id_role: 5, role: "ceo" }
  ]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    Nama_Lengkap: "",
    email: "",
    password: "",
    alamat: "",
    no_telp: "",
    id_role: "2"
  });

  const API_BASE_URL = "http://localhost:5000/api";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Gagal mengambil data user");
    } finally {
      setLoading(false);
    }
  };

  // Hapus fetchRoles karena kita menggunakan static roles
  // atau gunakan fallback seperti di bawah

  useEffect(() => {
    fetchUsers();
    // Tidak perlu fetch roles karena sudah didefinisikan static
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = async () => {
    setSubmitLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          id_role: parseInt(formData.id_role)
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("User berhasil ditambahkan dan otomatis terdaftar di tabel role terkait!");
        setShowModal(false);
        resetForm();
        fetchUsers();
      } else {
        alert(result.message || result.error || "Gagal menambahkan user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Terjadi kesalahan saat menambahkan user");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditUser = async () => {
    setSubmitLoading(true);
    try {
      const updateData = { 
        ...formData,
        id_role: parseInt(formData.id_role)
      };
      delete updateData.password;

      const response = await fetch(`${API_BASE_URL}/users/${selectedUser.id_user}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("User berhasil diupdate! Data role otomatis disesuaikan.");
        setShowModal(false);
        resetForm();
        fetchUsers();
      } else {
        alert(result.message || result.error || "Gagal mengupdate user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Terjadi kesalahan saat mengupdate user");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus user ini? Data akan dihapus dari semua tabel terkait.")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("User berhasil dihapus dari semua tabel!");
        fetchUsers();
      } else {
        const result = await response.json();
        alert(result.error || "Gagal menghapus user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Terjadi kesalahan saat menghapus user");
    }
  };

  const openAddModal = () => {
    setModalType("add");
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setModalType("edit");
    setSelectedUser(user);
    setFormData({
      Nama_Lengkap: user.Nama_Lengkap,
      email: user.email,
      password: "",
      alamat: user.alamat || "",
      no_telp: user.no_telp || "",
      id_role: user.id_role.toString()
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      Nama_Lengkap: "",
      email: "",
      password: "",
      alamat: "",
      no_telp: "",
      id_role: "2"
    });
    setSelectedUser(null);
    setShowPassword(false);
  };

  const getRoleName = (id_role) => {
    const role = roles.find(r => r.id_role === id_role);
    return role ? role.role : "Unknown";
  };

  const getRoleDescription = (id_role) => {
    const descriptions = {
      1: "Admin - Akses penuh sistem",
      2: "User - Customer biasa",
      3: "Arsitek - Profesional desain bangunan",
      4: "Mandor - Pengawas lapangan proyek", 
      5: "CEO - Pimpinan perusahaan"
    };
    return descriptions[id_role] || "Unknown role";
  };

  const filteredUsers = users.filter(user =>
    user.Nama_Lengkap?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRoleName(user.id_role)?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (!formData.Nama_Lengkap.trim() || !formData.email.trim()) {
      alert("Nama dan Email wajib diisi!");
      return;
    }
    
    if (modalType === "add") {
      if (!formData.password) {
        alert("Password wajib diisi!");
        return;
      }
      if (formData.password.length < 6) {
        alert("Password minimal 6 karakter!");
        return;
      }
      handleAddUser();
    } else {
      handleEditUser();
    }
  };

  // ... (kode JSX tetap sama seperti sebelumnya)
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
        <div style={{ 
          padding: '24px',
          borderBottom: '1px solid #1A1D35'
        }}>
          <h1 style={{ 
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0
          }}>Renova</h1>
        </div>

        <nav style={{ 
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
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
            onClick={() => navigate('/admin/dashboard')}
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
              backgroundColor: '#7C3AED',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>User Management</span>
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
            onClick={() => navigate('/admin/orderManegement')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Order Management</span>
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
            onClick={() => navigate('/admin/jadwalKerja')}
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
            onClick={() => navigate('/admin/janjiView')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Janji Konsultasi</span>
          </div>
        </nav>

        <div style={{ 
          padding: '16px',
          borderTop: '1px solid #1A1D35',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#7C3AED',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px'
          }}>RG</div>
          <div>
            <p style={{ 
              fontSize: '14px',
              fontWeight: '600',
              color: 'white',
              margin: 0
            }}>Roihan Galang</p>
            <p style={{ 
              fontSize: '12px',
              color: '#6B7280',
              margin: 0
            }}>Admin account</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1,
        overflow: 'auto',
        backgroundColor: '#0B0D1A'
      }}>
        <header style={{ 
          backgroundColor: '#12142A',
          padding: '20px 28px',
          borderBottom: '1px solid #1A1D35'
        }}>
          <h2 style={{ 
            fontSize: '20px',
            fontWeight: '600',
            color: 'white',
            margin: 0
          }}>User Management</h2>
          <p style={{ 
            fontSize: '14px',
            color: '#9CA3AF',
            margin: '4px 0 0 0'
          }}>
            Kelola pengguna sistem - Data otomatis tersinkronisasi dengan tabel role terkait
          </p>
        </header>

        <main style={{ 
          padding: '28px'
        }}>
          {/* Action Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={18} color="#6B7280" style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                type="text"
                placeholder="Cari nama, email, atau role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  backgroundColor: '#12142A',
                  border: '1px solid #1A1D35',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
            <button
              onClick={openAddModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                backgroundColor: '#7C3AED',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <Plus size={18} />
              Tambah User
            </button>
          </div>

          {/* Users Table */}
          <div style={{
            backgroundColor: '#12142A',
            borderRadius: '12px',
            border: '1px solid #1A1D35',
            overflow: 'hidden'
          }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                Memuat data user...
              </div>
            ) : filteredUsers.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                {searchTerm ? "Tidak ada user yang sesuai dengan pencarian" : "Belum ada data user"}
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ 
                      textAlign: 'left',
                      fontSize: '12px',
                      color: '#6B7280',
                      borderBottom: '1px solid #1A1D35',
                      backgroundColor: '#0B0D1A'
                    }}>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>ID</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Nama</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Email</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Telepon</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Alamat</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Role</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id_user} style={{ 
                        borderBottom: '1px solid #1A1D35'
                      }}>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white' }}>
                          {user.id_user}
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white', fontWeight: '500' }}>
                          {user.Nama_Lengkap}
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                          {user.email}
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                          {user.no_telp || '-'}
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {user.alamat || '-'}
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '600',
                            backgroundColor: 
                              user.id_role === 1 ? 'rgba(239, 68, 68, 0.2)' :
                              user.id_role === 3 ? 'rgba(59, 130, 246, 0.2)' :
                              user.id_role === 4 ? 'rgba(34, 197, 94, 0.2)' :
                              user.id_role === 5 ? 'rgba(251, 191, 36, 0.2)' :
                              'rgba(124, 58, 237, 0.2)',
                            color: 
                              user.id_role === 1 ? '#FCA5A5' :
                              user.id_role === 3 ? '#93C5FD' :
                              user.id_role === 4 ? '#86EFAC' :
                              user.id_role === 5 ? '#FDE047' :
                              '#A78BFA',
                            border: '1px solid ' + (
                              user.id_role === 1 ? 'rgba(239, 68, 68, 0.3)' :
                              user.id_role === 3 ? 'rgba(59, 130, 246, 0.3)' :
                              user.id_role === 4 ? 'rgba(34, 197, 94, 0.3)' :
                              user.id_role === 5 ? 'rgba(251, 191, 36, 0.3)' :
                              'rgba(124, 58, 237, 0.3)'
                            )
                          }}>
                            {getRoleName(user.id_role).toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => openEditModal(user)}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                borderRadius: '6px',
                                color: '#93C5FD',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id_user)}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '6px',
                                color: '#FCA5A5',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                            >
                              Hapus
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

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#12142A',
            borderRadius: '12px',
            border: '1px solid #1A1D35',
            width: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #1A1D35',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'white',
                margin: 0
              }}>
                {modalType === "add" ? "Tambah User Baru" : "Edit User"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6B7280',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  padding: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="Nama_Lengkap"
                    value={formData.Nama_Lengkap}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#0B0D1A',
                      border: '1px solid #1A1D35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#0B0D1A',
                      border: '1px solid #1A1D35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    placeholder="contoh@email.com"
                  />
                </div>

                {modalType === "add" && (
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>
                      Password *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '10px 12px 10px 12px',
                          backgroundColor: '#0B0D1A',
                          border: '1px solid #1A1D35',
                          borderRadius: '8px',
                          color: 'white',
                          fontSize: '14px',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        placeholder="Minimal 6 karakter"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#6B7280',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          padding: '4px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    name="no_telp"
                    value={formData.no_telp}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#0B0D1A',
                      border: '1px solid #1A1D35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Contoh: 081234567890"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>
                    Alamat
                  </label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#0B0D1A',
                      border: '1px solid #1A1D35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Masukkan alamat lengkap"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>
                    Role *
                  </label>
                  <select
                    name="id_role"
                    value={formData.id_role}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: '#0B0D1A',
                      border: '1px solid #1A1D35',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                  >
                    {roles.map(role => (
                      <option key={role.id_role} value={role.id_role}>
                        {role.role.charAt(0).toUpperCase() + role.role.slice(1)}
                      </option>
                    ))}
                  </select>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>
                    {getRoleDescription(parseInt(formData.id_role))}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '24px'
              }}>
                <button
                  onClick={() => setShowModal(false)}
                  disabled={submitLoading}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#1A1D35',
                    border: '1px solid #2D3748',
                    borderRadius: '8px',
                    color: '#9CA3AF',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    opacity: submitLoading ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => !submitLoading && (e.currentTarget.style.backgroundColor = '#2D3748')}
                  onMouseLeave={(e) => !submitLoading && (e.currentTarget.style.backgroundColor = '#1A1D35')}
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitLoading}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: submitLoading ? '#6B7280' : '#7C3AED',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: submitLoading ? 'not-allowed' : 'pointer',
                    boxShadow: submitLoading ? 'none' : '0 4px 12px rgba(124, 58, 237, 0.4)',
                    transition: 'all 0.2s'
                  }}
                >
                  {submitLoading ? 'Memproses...' : (modalType === "add" ? "Tambah User" : "Update User")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;