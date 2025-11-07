import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate(); // digunakan untuk pindah halaman

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
          background-color: #fff;
          color: #1e1e1e;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 60px;
          background-color: #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .navbar .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0044cc;
        }

        .navbar ul {
          display: flex;
          gap: 30px;
          list-style: none;
        }

        .navbar a {
          text-decoration: none;
          color: #1e1e1e;
          transition: 0.3s;
        }

        .navbar a:hover {
          color: #0044cc;
        }

        .btn-primary {
          background-color: #0044cc;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-primary:hover {
          background-color: #002f99;
        }

        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 80px 100px;
          gap: 40px;
          background-color: #f8faff;
          flex-wrap: wrap;
        }

        .hero-content {
          max-width: 500px;
        }

        .hero-content h1 {
          font-size: 2.8rem;
          margin-bottom: 20px;
          color: #111;
        }

        .hero-content span {
          color: #0044cc;
        }

        .hero-content p {
          color: #555;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .hero-image img {
          width: 450px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .services {
          padding: 80px 100px;
          text-align: center;
        }

        .services h2 {
          font-size: 2rem;
          margin-bottom: 50px;
        }

        .service-list {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .service-card {
          background-color: #ffffff;
          border: 1px solid #e8e8e8;
          border-radius: 12px;
          padding: 25px;
          width: 280px;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .service-card h3 {
          color: #0044cc;
          margin-bottom: 10px;
        }

        .why {
          background-color: #f4f7ff;
          padding: 80px 100px;
          text-align: center;
        }

        .why h2 {
          font-size: 2rem;
          margin-bottom: 40px;
        }

        .why-grid {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .why-card {
          background-color: #ffffff;
          border-radius: 12px;
          padding: 30px;
          width: 260px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }

        .why-card h4 {
          color: #0044cc;
          margin-bottom: 10px;
        }

        footer {
          background-color: #0044cc;
          color: white;
          text-align: center;
          padding: 20px;
        }
      `}</style>

      <div className="landing">
        {/* Navbar */}
        <nav className="navbar">
          <div className="logo">🏗️ Renova</div>
          <ul>
            <li><a href="#home">Beranda</a></li>
            <li><a href="#services">Layanan</a></li>
            <li><a href="#why">Mengapa Kami</a></li>
            <li><a href="#contact">Kontak</a></li>
          </ul>
          {/* Tombol login diarahkan ke /login */}
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Login
          </button>
        </nav>

        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-content">
            <h1>
              Bangun & Renovasi Rumah Impianmu<br />Bersama <span>Renova</span>
            </h1>
            <p>
              Kami membantu wujudkan rumah nyaman dan berkualitas dengan layanan profesional dan terpercaya.
            </p>
            <button className="btn-primary">Mulai Sekarang</button>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=900&q=80"
              alt="Renovation"
            />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="services">
          <h2>Layanan Kami</h2>
          <div className="service-list">
            <div className="service-card">
              <h3>Desain Arsitektur</h3>
              <p>Buat desain rumah impianmu dengan bantuan arsitek profesional kami.</p>
            </div>
            <div className="service-card">
              <h3>Renovasi Rumah</h3>
              <p>Tingkatkan kenyamanan rumahmu dengan layanan renovasi terpercaya.</p>
            </div>
            <div className="service-card">
              <h3>Konstruksi Bangunan</h3>
              <p>Kami membangun rumah dari pondasi hingga finishing dengan kualitas terbaik.</p>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section id="why" className="why">
          <h2>Mengapa Memilih Renova?</h2>
          <div className="why-grid">
            <div className="why-card">
              <h4>✅ Profesional</h4>
              <p>Tim berpengalaman dalam bidang konstruksi dan arsitektur.</p>
            </div>
            <div className="why-card">
              <h4>🏠 Hasil Berkualitas</h4>
              <p>Setiap proyek kami jaga kualitas dan ketepatannya.</p>
            </div>
            <div className="why-card">
              <h4>💬 Konsultasi Gratis</h4>
              <p>Dapatkan arahan dan solusi terbaik sebelum memulai proyekmu.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <p>© 2025 Renova. Semua hak cipta dilindungi.</p>
        </footer>
      </div>
    </>
  );
}
