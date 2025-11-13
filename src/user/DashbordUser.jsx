import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user dari localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // jika belum login, kembali ke halaman login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      padding: "30px",
      width: "100%",
      maxWidth: "600px",
      textAlign: "center",
    },
    title: {
      fontSize: "26px",
      fontWeight: "700",
      color: "#0056b3",
      marginBottom: "15px",
    },
    subtitle: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "25px",
    },
    infoBox: {
      backgroundColor: "#f9fafc",
      borderRadius: "10px",
      padding: "15px",
      textAlign: "left",
      marginBottom: "20px",
    },
    infoText: {
      fontSize: "15px",
      color: "#333",
      margin: "5px 0",
    },
    logoutButton: {
      padding: "10px 20px",
      backgroundColor: "#d9534f",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "0.3s",
    },
    logoutButtonHover: {
      backgroundColor: "#c9302c",
    },
  };

  const [hoverLogout, setHoverLogout] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Selamat Datang 👋</h1>
        {user ? (
          <>
            <p style={styles.subtitle}>
              Hai, <b>{user.Nama_Lengkap}</b>! Selamat datang di dashboard Anda.
            </p>

            <div style={styles.infoBox}>
              <p style={styles.infoText}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={styles.infoText}>
                <strong>Alamat:</strong> {user.alamat || "-"}
              </p>
              <p style={styles.infoText}>
                <strong>No. Telepon:</strong> {user.no_telp || "-"}
              </p>
              <p style={styles.infoText}>
                <strong>Role ID:</strong> {user.id_role}
              </p>
            </div>

            <button
              style={{
                ...styles.logoutButton,
                ...(hoverLogout ? styles.logoutButtonHover : {}),
              }}
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              onClick={handleLogout}
            >
              Keluar
            </button>
          </>
        ) : (
          <p>Memuat data pengguna...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardUser;
