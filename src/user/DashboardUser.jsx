import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [keperluan, setKeperluan] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBuatJanji = async () => {
    if (!keperluan.trim()) {
      setMessage("Keperluan tidak boleh kosong!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/janji", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keperluan: keperluan,
          id_user: user.id_user,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Janji berhasil dibuat!");
        setKeperluan(""); // reset form
      } else {
        setMessage(data.message || "Gagal membuat janji");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Terjadi kesalahan server");
    }

    setLoading(false);
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
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginTop: "10px",
      marginBottom: "20px",
      fontSize: "15px",
    },
    btnJanji: {
      padding: "10px 20px",
      backgroundColor: "#0275d8",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "0.3s",
      width: "100%",
      marginBottom: "15px",
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
      width: "100%",
    },
    message: {
      marginTop: "10px",
      fontWeight: "600",
      color: "green",
    },
  };

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

            {/* FORM BUAT JANJI */}
            <h3 style={{ marginBottom: "10px", color: "#0056b3" }}>
              Buat Janji Baru
            </h3>

            <textarea
              style={styles.input}
              rows="3"
              placeholder="Tuliskan keperluan janji..."
              value={keperluan}
              onChange={(e) => setKeperluan(e.target.value)}
            ></textarea>

            <button style={styles.btnJanji} onClick={handleBuatJanji} disabled={loading}>
              {loading ? "Mengirim..." : "Buat Janji"}
            </button>

            {message && <p style={styles.message}>{message}</p>}

            <button style={styles.logoutButton} onClick={handleLogout}>
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
