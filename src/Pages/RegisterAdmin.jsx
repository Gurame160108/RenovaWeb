import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterAdmin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    password: "",
    alamat: "",
    noTelp: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Fungsi kirim data ke backend RenovaAPI (auto insert ke user & admin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // ⬇️ kirim hanya field yang dibutuhkan, id_user & status dihandle backend
        body: JSON.stringify({
          Nama_Lengkap: formData.namaLengkap,
          email: formData.email,
          password: formData.password,
          alamat: formData.alamat,
          no_telp: formData.noTelp,
        }),
      });

      const data = await response.json();
      console.log("✅ Response dari backend:", data);

      if (response.ok) {
        alert("✅ Admin baru berhasil didaftarkan!");
        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Gagal mendaftarkan admin.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Gagal terhubung ke server. Pastikan backend RenovaAPI aktif di port 5000.");
    } finally {
      setLoading(false);
    }
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

        .register-admin-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #b30000, #ff3333);
        }

        .register-admin-card {
          background-color: #fff;
          border-radius: 15px;
          padding: 40px 50px;
          width: 400px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          text-align: center;
        }

        .register-admin-card h2 {
          margin-bottom: 25px;
          color: #b30000;
        }

        .form-group {
          text-align: left;
          margin-bottom: 15px;
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
          border-color: #b30000;
          box-shadow: 0 0 4px rgba(204, 0, 0, 0.3);
        }

        .btn-register-admin {
          background-color: #b30000;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: 0.3s;
          width: 100%;
        }

        .btn-register-admin:hover {
          background-color: #990000;
        }

        .login-link {
          margin-top: 15px;
          color: #333;
          font-size: 0.9rem;
        }

        .login-link span {
          color: #b30000;
          cursor: pointer;
          font-weight: 500;
        }

        .login-link span:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="register-admin-container">
        <div className="register-admin-card">
          <h2>Registrasi Admin Baru</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="namaLengkap"
                placeholder="Masukkan nama lengkap admin"
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
                placeholder="Masukkan email admin"
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

            <button
              type="submit"
              className="btn-register-admin"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Daftarkan Admin"}
            </button>
          </form>

          <p className="login-link">
            Kembali ke{" "}
            <span onClick={() => navigate("/admin/dashboard")}>Dashboard</span>
          </p>
        </div>
      </div>
    </>
  );
}
