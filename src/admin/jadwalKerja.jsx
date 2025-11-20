import React, { useState, useEffect } from "react";
import { Plus, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JadwalKerja = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [listArsitek, setListArsitek] = useState([]);
  const [listMandor, setListMandor] = useState([]);
  
  const [formData, setFormData] = useState({
    tanggal_Kerja: "",
    jam_masuk: "",
    nama: "",
    tipe: "arsitek",
  });

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    fetchSchedules();
    fetchListArsitek();
    fetchListMandor();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const arsitekRes = await fetch(`${API_BASE_URL}/jadwal/arsitek`);
      if (!arsitekRes.ok) throw new Error('Failed to fetch arsitek schedules');
      const arsitekData = await arsitekRes.json();
     
      const mandorRes = await fetch(`${API_BASE_URL}/jadwal/mandor`);
      if (!mandorRes.ok) throw new Error('Failed to fetch mandor schedules');
      const mandorData = await mandorRes.json();
      
      const combinedSchedules = [
        ...arsitekData.map(item => ({ ...item, tipe: "arsitek" })),
        ...mandorData.map(item => ({ ...item, tipe: "mandor" }))
      ];
      
      combinedSchedules.sort((a, b) =>
        new Date(b.tanggal_Kerja) - new Date(a.tanggal_Kerja)
      );
      
      setSchedules(combinedSchedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      alert("Gagal memuat data jadwal");
    } finally {
      setLoading(false);
    }
  };

  const fetchListArsitek = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/jadwal/list/arsitek`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setListArsitek(data);
    } catch (error) {
      console.error("Error fetching arsitek list:", error);
      // Fallback: coba fetch dari endpoint users dengan filter role arsitek
      try {
        const usersRes = await fetch(`${API_BASE_URL}/users`);
        if (usersRes.ok) {
          const users = await usersRes.json();
          const arsitekUsers = users.filter(user => user.id_role === 3);
          setListArsitek(arsitekUsers.map(user => ({
            id_arsitek: user.id_user,
            Nama_Lengkap: user.Nama_Lengkap,
            status: 'aktif'
          })));
        }
      } catch (fallbackError) {
        console.error("Fallback juga gagal:", fallbackError);
      }
    }
  };

  const fetchListMandor = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/jadwal/list/mandor`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setListMandor(data);
    } catch (error) {
      console.error("Error fetching mandor list:", error);
      // Fallback: coba fetch dari endpoint users dengan filter role mandor
      try {
        const usersRes = await fetch(`${API_BASE_URL}/users`);
        if (usersRes.ok) {
          const users = await usersRes.json();
          const mandorUsers = users.filter(user => user.id_role === 4);
          setListMandor(mandorUsers.map(user => ({
            id_mandor: user.id_user,
            Nama_Lengkap: user.Nama_Lengkap,
            status: 'aktif'
          })));
        }
      } catch (fallbackError) {
        console.error("Fallback juga gagal:", fallbackError);
      }
    }
  };

  const openAddModal = () => {
    setModalType("add");
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (sched) => {
    setModalType("edit");
    setSelectedSchedule(sched);
    setFormData({
      tanggal_Kerja: sched.tanggal_Kerja,
      jam_masuk: sched.jam_masuk,
      nama: sched.tipe === "arsitek" ? sched.id_arsitek : sched.id_mandor,
      tipe: sched.tipe,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      tanggal_Kerja: "",
      jam_masuk: "",
      nama: "",
      tipe: "arsitek",
    });
    setSelectedSchedule(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.tanggal_Kerja || !formData.jam_masuk || !formData.nama) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      const baseEndpoint = formData.tipe === "arsitek" 
        ? `${API_BASE_URL}/jadwal/arsitek`
        : `${API_BASE_URL}/jadwal/mandor`;

      const payload = {
        tanggal_Kerja: formData.tanggal_Kerja,
        jam_masuk: formData.jam_masuk,
        [formData.tipe === "arsitek" ? "id_arsitek" : "id_mandor"]: formData.nama
      };

      let response;
      
      if (modalType === "add") {
        // CREATE operation
        response = await fetch(baseEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // UPDATE operation
        const id = selectedSchedule.id;
        response = await fetch(`${baseEndpoint}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        fetchSchedules();
        setShowModal(false);
        resetForm();
      } else {
        const error = await response.json();
        alert(error.error || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleDelete = async (schedule) => {
    if (!window.confirm(`Yakin ingin menghapus jadwal ${schedule.tipe} ini?`)) {
      return;
    }

    try {
      const baseEndpoint = schedule.tipe === "arsitek" 
        ? `${API_BASE_URL}/jadwal/arsitek`
        : `${API_BASE_URL}/jadwal/mandor`;

      const response = await fetch(`${baseEndpoint}/${schedule.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        fetchSchedules(); // Refresh data
      } else {
        const error = await response.json();
        alert(error.error || "Gagal menghapus jadwal");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menghapus data");
    }
  };

  const getTypeBadge = (tipe) => {
    const styles = {
      arsitek: { bg: "rgba(124, 58, 237, 0.2)", color: "#C4B5FD", border: "rgba(124, 58, 237, 0.3)" },
      mandor: { bg: "rgba(59, 130, 246, 0.2)", color: "#93C5FD", border: "rgba(59, 130, 246, 0.3)" },
    };
    const s = styles[tipe];
    return {
      backgroundColor: s.bg,
      color: s.color,
      border: `1px solid ${s.border}`,
    };
  };

  const filteredSchedules = schedules.filter(s => {
    const searchLower = searchTerm.toLowerCase();
    const nama = s.tipe === "arsitek" ? s.nama_arsitek : s.nama_mandor;
    return (
      s.tanggal_Kerja?.toLowerCase().includes(searchLower) ||
      nama?.toString().toLowerCase().includes(searchLower) ||
      s.tipe?.toLowerCase().includes(searchLower)
    );
  });

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
            onClick={() => navigate('/admin/orderManegement')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Order Management</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', backgroundColor: '#7C3AED', borderRadius: '8px', color: 'white', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)' }}>
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Jadwal Kerja</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', color: '#9CA3AF', cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => navigate('/admin/janjiView')}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
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
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Jadwal Kerja (Arsitek & Mandor)</h2>
        </header>
        <main style={{ padding: '28px' }}>
          {/* Action Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ position: 'relative', width: '320px' }}>
              <Search size={18} color="#6B7280" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Cari tanggal, nama, atau tipe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 40px', backgroundColor: '#12142A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none' }}
              />
            </div>
            <button onClick={openAddModal} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#7C3AED', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <Plus size={18} /> Add Schedule
            </button>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: '#12142A', borderRadius: '12px', border: '1px solid #1A1D35', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading...</div>
            ) : filteredSchedules.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
                {searchTerm ? "Tidak ada data yang sesuai dengan pencarian" : "Tidak ada data jadwal kerja"}
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', fontSize: '12px', color: '#6B7280', borderBottom: '1px solid #1A1D35', backgroundColor: '#0B0D1A' }}>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>ID</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Tipe</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Nama</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Tanggal Kerja</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Jam Masuk</th>
                      <th style={{ padding: '12px 24px', fontWeight: '500' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchedules.map((sched, index) => (
                      <tr key={`${sched.tipe}-${sched.id}-${index}`} style={{ borderBottom: '1px solid #1A1D35' }}>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white' }}>{sched.id}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            ...getTypeBadge(sched.tipe)
                          }}>
                            {sched.tipe}
                          </span>
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white' }}>
                          {sched.tipe === "arsitek" ? sched.nama_arsitek : sched.nama_mandor}
                        </td>
                        <td style={{ padding: '16px 24px', fontSize: '14px', color: 'white' }}>{sched.tanggal_Kerja}</td>
                        <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>{sched.jam_masuk}</td>
                        <td style={{ padding: '16px 24px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => openEditModal(sched)} style={{ padding: '6px 12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '6px', color: '#93C5FD', fontSize: '12px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(sched)} style={{ padding: '6px 12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', color: '#FCA5A5', fontSize: '12px', cursor: 'pointer', fontWeight: '500', transition: 'all 0.2s' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}>
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
                {modalType === "add" ? "Tambah Jadwal" : "Edit Jadwal"}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Tipe *</label>
                  <select name="tipe" value={formData.tipe} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                    <option value="arsitek">Arsitek</option>
                    <option value="mandor">Mandor</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Tanggal Kerja *</label>
                  <input type="date" name="tanggal_Kerja" value={formData.tanggal_Kerja} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>Jam Masuk *</label>
                  <input type="time" name="jam_masuk" value={formData.jam_masuk} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', color: '#9CA3AF', marginBottom: '6px' }}>
                    {formData.tipe === "arsitek" ? "Nama Arsitek" : "Nama Mandor"} *
                  </label>
                  <select name="nama" value={formData.nama} onChange={handleInputChange}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0B0D1A', border: '1px solid #1A1D35', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none', cursor: 'pointer' }}>
                    <option value="">-- Pilih {formData.tipe === "arsitek" ? "Arsitek" : "Mandor"} --</option>
                    {(formData.tipe === "arsitek" ? listArsitek : listMandor).map((person) => (
                      <option key={formData.tipe === "arsitek" ? person.id_arsitek : person.id_mandor}
                              value={formData.tipe === "arsitek" ? person.id_arsitek : person.id_mandor}>
                        {person.Nama_Lengkap}
                      </option>
                    ))}
                  </select>
                  {(formData.tipe === "arsitek" ? listArsitek.length === 0 : listMandor.length === 0) && (
                    <p style={{ fontSize: '12px', color: '#EF4444', margin: '4px 0 0 0' }}>
                      Tidak ada {formData.tipe === "arsitek" ? "arsitek" : "mandor"} yang tersedia
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={() => setShowModal(false)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#1A1D35', border: '1px solid #2D3748', borderRadius: '8px', color: '#9CA3AF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2D3748'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1A1D35'}>
                  Cancel
                </button>
                <button onClick={handleSubmit}
                  disabled={(formData.tipe === "arsitek" ? listArsitek.length === 0 : listMandor.length === 0)}
                  style={{ 
                    flex: 1, 
                    padding: '10px', 
                    backgroundColor: (formData.tipe === "arsitek" ? listArsitek.length === 0 : listMandor.length === 0) ? '#6B7280' : '#7C3AED', 
                    border: 'none', 
                    borderRadius: '8px', 
                    color: 'white', 
                    fontSize: '14px', 
                    fontWeight: '500', 
                    cursor: (formData.tipe === "arsitek" ? listArsitek.length === 0 : listMandor.length === 0) ? 'not-allowed' : 'pointer', 
                    boxShadow: (formData.tipe === "arsitek" ? listArsitek.length === 0 : listMandor.length === 0) ? 'none' : '0 4px 12px rgba(124, 58, 237, 0.4)', 
                    transition: 'all 0.2s' 
                  }}
                  onMouseEnter={(e) => {
                    if (!(formData.tipe === "arsitek" ? listArsitek.length === 0 : listMandor.length === 0)) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(formData.tipe === "arsitek" ? listArsitek.length === 0 : listMandor.length === 0)) {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}>
                  {modalType === "add" ? "Tambah Jadwal" : "Update Jadwal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalKerja;