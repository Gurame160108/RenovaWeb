import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Registrasi() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    password: "",
    alamat: "",
    noTelp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Registrasi:", formData);
    alert("Registrasi berhasil (dummy, belum konek backend)");
    navigate("/login");
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        body {
          background-color: #f8faff;
        }

        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #0044cc, #0066ff);
        }

        .register-card {
          background-color: #fff;
          border-radius: 15px;
          padding: 40px 50px;
          width: 400px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          text-align: center;
        }

        .register-card h2 {
          margin-bottom: 25px;
          color: #0044cc;
        }

        .register-card form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #333;
        }

        .form-group input, 
        .form-group textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: 0.3s;
          font-size: 0.95rem;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #0044cc;
          box-shadow: 0 0 4px rgba(0, 68, 204, 0.3);
        }

        .btn-register {
          background-color: #0044cc;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: 0.3s;
        }

        .btn-register:hover {
          background-color: #003399;
        }

        .login-link {
          margin-top: 15px;
          color: #333;
          font-size: 0.9rem;
        }

        .login-link span {
          color: #0044cc;
          cursor: pointer;
          font-weight: 500;
        }

        .login-link span:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="register-container">
        <div className="register-card">
          <h2>Daftar Akun Renova</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="namaLengkap"
                placeholder="Masukkan nama lengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Alamat</label>
              <textarea
                name="alamat"
                rows="2"
                placeholder="Masukkan alamat lengkap"
                value={formData.alamat}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>No. Telepon</label>
              <input
                type="tel"
                name="noTelp"
                placeholder="Masukkan nomor telepon"
                value={formData.noTelp}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-register">
              Daftar Sekarang
            </button>
          </form>

          <p className="login-link">
            Sudah punya akun?{" "}
            <span onClick={() => navigate("/login")}>Masuk di sini</span>
          </p>
        </div>
      </div>
    </> 
  );
}
