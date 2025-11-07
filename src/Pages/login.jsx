import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ubah dari Navigate ke useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hover, setHover] = useState(false);
  const navigate = useNavigate(); // ✅ tambahkan ini

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f2f4f7",
    },
    left: {
      flex: 1,
      backgroundImage: "url('/renovasi.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderTopRightRadius: "20px",
      borderBottomRightRadius: "20px",
      display: "none",
    },
    right: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
      boxShadow: "0 0 20px rgba(0,0,0,0.1)",
      borderRadius: "10px",
      margin: "auto",
      width: "400px",
      height: "480px",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#0056b3",
      marginBottom: "5px",
    },
    subtitle: {
      color: "#666",
      marginBottom: "30px",
    },
    form: {
      width: "80%",
    },
    label: {
      display: "block",
      fontWeight: "600",
      marginBottom: "5px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#0056b3",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s",
    },
    buttonHover: {
      backgroundColor: "#003f82",
    },
    registerText: {
      textAlign: "center",
      fontSize: "14px",
      marginTop: "20px",
      color: "#555",
    },
    link: {
      color: "#0056b3",
      textDecoration: "none",
      fontWeight: "600",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}></div>

      <div style={styles.right}>
        <h1 style={styles.title}>RenovaHome</h1>
        <p style={styles.subtitle}>Masuk ke akun Anda</p>

        <form style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Masukkan email kamu"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Masukkan password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            style={{
              ...styles.button,
              ...(hover ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Masuk
          </button>

          <p style={styles.registerText}>
            Belum punya akun?{" "}
            <span style={styles.link} onClick={() => navigate("/Registrasi")}>
              Daftar di sini
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
