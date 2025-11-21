import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hover, setHover] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    try {
      // =============================
      // 🔥 1. Coba login sebagai admin
      // =============================
      let response = await fetch("http://localhost:5000/api/admins/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = await response.json();

      if (response.ok && data.admin) {
        localStorage.setItem("user", JSON.stringify(data.admin));
        navigate("/admin/dashboard");
        return;
      }

      // =============================
      // 🔥 2. Coba login sebagai arsitek
      // =============================
      response = await fetch("http://localhost:5000/api/arsitek/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      data = await response.json();

      if (response.ok && data.arsitek) {
        localStorage.setItem("user", JSON.stringify(data.arsitek));
        navigate("/arsitek/DashboardArsitek");
        return;
      }

      // =============================
      // 🔥 3. Coba login sebagai user
      // =============================
      response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      data = await response.json();

      if (response.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/user/dashboard");
        return;
      }

      setError(data.message || "Login gagal, periksa email & password!");
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan koneksi ke server!");
    }
  };

  return (
  <div
    style={{
      display: "flex",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #6fb1fc, #4364f7, #0052d4)",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "380px",
        padding: "35px",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 12px 25px rgba(0,0,0,0.15)",
        textAlign: "center",
        animation: "fadeIn 0.5s ease",
      }}
    >
      <h1 style={{ fontSize: "30px", fontWeight: "700", color: "#1a3cff" }}>
        RenovaHome
      </h1>
      <p style={{ color: "#666", marginBottom: "25px" }}>
        Masuk ke akun kamu
      </p>

      {error && (
        <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
          {error}
        </p>
      )}

      {/* INPUT */}
      <div style={{ textAlign: "left", width: "100%" }}>
        <label style={{ fontWeight: "600", fontSize: "14px" }}>Email</label>
        <input
          type="email"
          placeholder="Masukkan email"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "6px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #d0d0d0",
            background: "#fafafa",
            fontSize: "14px",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={{ fontWeight: "600", fontSize: "14px" }}>Password</label>
        <input
          type="password"
          placeholder="Masukkan password"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "6px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #d0d0d0",
            background: "#fafafa",
            fontSize: "14px",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* BUTTON */}
      <button
        style={{
          width: "100%",
          padding: "12px",
          background: hover
            ? "linear-gradient(135deg, #3957ff, #0038c9)"
            : "linear-gradient(135deg, #4d6bff, #1a3cff)",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontWeight: "700",
          fontSize: "15px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleLogin}
      >
        Masuk
      </button>

      {/* LINK */}
      <div style={{ marginTop: "20px", fontSize: "14px" }}>
        <p>
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/Registrasi")}
            style={{ color: "#1a3cff", cursor: "pointer", fontWeight: "600" }}
          >
            Daftar
          </span>
        </p>

        <p style={{ marginTop: "5px" }}>
          Admin?{" "}
          <span
            onClick={() => navigate("/RegistrasiAdmin")}
            style={{ color: "#1a3cff", cursor: "pointer", fontWeight: "600" }}
          >
            Daftar Admin
          </span>
        </p>

        <p style={{ marginTop: "5px" }}>
          Arsitek?{" "}
          <span
            onClick={() => navigate("/RegistrasiArsitek")}
            style={{ color: "#1a3cff", cursor: "pointer", fontWeight: "600" }}
          >
            Daftar Arsitek
          </span>
        </p>
      </div>
    </div>
  </div>
);

};

export default Login;
