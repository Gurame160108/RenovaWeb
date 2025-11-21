import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";



const DashboardAdmin = () => {
  const [admin] = useState({
    Nama_Lengkap: "Roihan Galang",
    email: "admin@renova.com",
    id_role: 1
  });

  const navigate = useNavigate(); // <-- Panggil di sini

  const chartData = [
    { month: "Jan", bar1: 45, bar2: 70, bar3: 55 },
    { month: "Feb", bar1: 60, bar2: 95, bar3: 70 },
    { month: "Mar", bar1: 75, bar2: 115, bar3: 85 },
    { month: "Apr", bar1: 55, bar2: 85, bar3: 65 },
    { month: "May", bar1: 80, bar2: 135, bar3: 95 },
    { month: "Jun", bar1: 65, bar2: 100, bar3: 75 },
    { month: "Jul", bar1: 70, bar2: 105, bar3: 80 },
    { month: "Aug", bar1: 95, bar2: 155, bar3: 110 },
    { month: "Sep", bar1: 80, bar2: 120, bar3: 90 },
    { month: "Oct", bar1: 90, bar2: 140, bar3: 100 },
    { month: "Nov", bar1: 75, bar2: 115, bar3: 85 },
    { month: "Dec", bar1: 70, bar2: 105, bar3: 80 }
  ];

  const orders = [
    { id: "VN001", status: "New", date: "Feb 28, 2023", customer: "Cameron", campaign: "Super Sale" },
    { id: "VN002", status: "Email", date: "Feb 28, 2023", customer: "Alexander", campaign: "Valentine" },
    { id: "VN003", status: "Design", date: "Mar 02, 2024", customer: "Gustavo", campaign: "Campaign 1" },
    { id: "VN004", status: "Complete", date: "Mar 05, 2024", customer: "Alfredo", campaign: "New Product" }
  ];

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
              backgroundColor: '#7C3AED',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)'
            }}
            onClick={() => useNavigate('/admin/dashboard')}
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
              boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)'
            }}
            onClick={() => navigate('/admin/userManager')}   // <-- pindah ke User Management
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
              boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)'
            }}
            onClick={() => navigate('/admin/orderManegement')}   // <-- pindah ke User Management
          >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>order Management</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            color: '#9CA3AF',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)'
          }}
          onClick={() => navigate('/admin/jadwalKerja')} >
            <span style={{ fontSize: '16px' }}>●</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Jadwal Kerja</span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            color: '#9CA3AF',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.3)'
          }}
          onClick={() => navigate('/admin/janjiView')} >
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
            }}>{admin.Nama_Lengkap}</p>
            <p style={{ 
              fontSize: '12px',
              color: '#6B7280',
              margin: 0
            }}>Admin account</p>
          </div>
          <div
                style={{
                  marginTop: "12px",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  backgroundColor: "#EF4444",
                  color: "white",
                  textAlign: "center",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
              >
          Logout
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
          }}>Dashboard Admin</h2>
        </header>

        <main style={{ 
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {/* Stats Cards */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px'
          }}>
            {[
              { label: 'People Total', value: '4' },
              { label: 'People Status', value: '5' },
              { label: 'Sale Products', value: '756' },
              { label: 'Average Revenue', value: '2.3K' }
            ].map((stat, idx) => (
              <div key={idx} style={{
                backgroundColor: '#12142A',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #1A1D35'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#9CA3AF',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#7C3AED' }}>●</span> {stat.label}
                  </span>
                  <MoreHorizontal size={16} color="#4B5563" style={{ cursor: 'pointer' }} />
                </div>
                <p style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0
                }}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px'
          }}>
            {/* Website Visitors */}
            <div style={{
              backgroundColor: '#12142A',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #1A1D35'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  margin: 0
                }}>Website Visitors</h3>
                <button style={{
                  fontSize: '12px',
                  color: '#6B7280',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}>Export ↓</button>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '32px'
              }}>
                <div style={{ position: 'relative', width: '180px', height: '180px' }}>
                  <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
                    <circle 
                      cx="90" 
                      cy="90" 
                      r="68" 
                      fill="none" 
                      stroke="#1A1D35" 
                      strokeWidth="16"
                    />
                    <circle 
                      cx="90" 
                      cy="90" 
                      r="68" 
                      fill="none" 
                      stroke="url(#gradient)" 
                      strokeWidth="16"
                      strokeDasharray="427"
                      strokeDashoffset="107"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="1" />
                        <stop offset="50%" stopColor="#EC4899" stopOpacity="1" />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <p style={{
                      fontSize: '36px',
                      fontWeight: 'bold',
                      color: 'white',
                      margin: 0
                    }}>150k</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { color: '#7C3AED', label: 'Organic', value: '30%' },
                  { color: '#EC4899', label: 'Social', value: '50%' },
                  { color: '#06B6D4', label: 'Direct', value: '20%' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: item.color
                      }}></div>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{item.label}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div style={{
              backgroundColor: '#12142A',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #1A1D35'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'white',
                    margin: 0
                  }}>Revenue per customer type</h3>
                  <button style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>Export ↓</button>
                </div>
                <p style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: '0 0 12px 0'
                }}>240.8K</p>
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '10px',
                  color: '#6B7280'
                }}>
                  {[
                    { color: '#06B6D4', label: 'Existing clients' },
                    { color: '#7C3AED', label: 'Subscriptions' },
                    { color: '#EC4899', label: 'New customers' },
                    { color: '#4B5563', label: 'Old Time' }
                  ].map((item, idx) => (
                    <span key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: item.color
                      }}></span>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={170}>
                <BarChart data={chartData} barGap={1} barCategoryGap="15%">
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#6B7280', fontSize: 10 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#6B7280', fontSize: 10 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Bar dataKey="bar1" radius={[4, 4, 0, 0]} maxBarSize={10} fill="#06B6D4" />
                  <Bar dataKey="bar2" radius={[4, 4, 0, 0]} maxBarSize={10} fill="#7C3AED" />
                  <Bar dataKey="bar3" radius={[4, 4, 0, 0]} maxBarSize={10} fill="#EC4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Orders Table */}
          <div style={{
            backgroundColor: '#12142A',
            borderRadius: '12px',
            border: '1px solid #1A1D35',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid #1A1D35',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                margin: 0
              }}>Orders Status</h3>
              <button style={{
                fontSize: '12px',
                color: '#7C3AED',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}>See more →</button>
            </div>
            
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
                    {['Name', 'Email', 'Design', 'Complete', 'Campaign', ''].map((header, idx) => (
                      <th key={idx} style={{ padding: '12px 24px', fontWeight: '500' }}>
                        {header && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ color: '#7C3AED' }}>●</span> {header}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={idx} style={{ 
                      borderBottom: '1px solid #1A1D35'
                    }}>
                      <td style={{ padding: '16px 24px' }}>
                        <div>
                          <p style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'white',
                            margin: '0 0 4px 0'
                          }}>{order.id}</p>
                          <p style={{
                            fontSize: '12px',
                            color: '#6B7280',
                            margin: 0
                          }}>{order.date}</p>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                        {order.customer}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                        {order.date}
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '12px', color: '#9CA3AF' }}>
                        {order.date}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '500',
                          backgroundColor: 'rgba(124, 58, 237, 0.2)',
                          color: '#A78BFA',
                          border: '1px solid rgba(124, 58, 237, 0.3)'
                        }}>
                          {order.campaign}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{
                            padding: '6px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}>✏️</button>
                          <button style={{
                            padding: '6px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;