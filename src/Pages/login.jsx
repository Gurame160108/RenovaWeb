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
        navigate("/arsitek/dashboard");
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
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#f2f4f7" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          margin: "auto",
          width: "400px",
          height: "480px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#0056b3" }}>
          RenovaHome
        </h1>
        <p style={{ color: "#666", marginBottom: "30px" }}>Masuk ke akun Anda</p>

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <label>Email</label>
        <input
          type="email"
          placeholder="Masukkan email kamu"
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Masukkan password"
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            width: "80%",
            padding: "10px",
            backgroundColor: hover ? "#003f82" : "#0056b3",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleLogin}
        >
          Masuk
        </button>

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Belum punya akun?{" "}
          <span
            style={{ color: "#0056b3", cursor: "pointer", fontWeight: "600" }}
            onClick={() => navigate("/Registrasi")}
          >
            Daftar di sini
          </span>
        </p>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Daftar sebagai admin?{" "}
          <span
            style={{ color: "#0056b3", cursor: "pointer", fontWeight: "600" }}
            onClick={() => navigate("/RegistrasiAdmin")}
          >
            Daftar Admin
          </span>
        </p>

        <p style={{ marginTop: "10px", fontSize: "14px" }}>
          Daftar sebagai arsitek?{" "}
          <span
            style={{ color: "#0056b3", cursor: "pointer", fontWeight: "600" }}
            onClick={() => navigate("/RegistrasiArsitek")}
          >
            Daftar Arsitek
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
