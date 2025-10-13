import { useState } from "react";
import { Link } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { portfolioPhotos } from "../data/mockData";
import ImageLightbox from "../components/ImageLightbox";
import "./HomePage.css";

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  useSEO(
    "Manole - Professional Actor & Performer",
    "Official website of Manole - Professional theater and film actor. Explore shows, blog posts, and stay updated with upcoming performances."
  );

  return (
    <div className="home-page">
      {selectedImage && (
        <ImageLightbox
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <section className="hero-section">
        <div className="hero-content fade-in">
          <h1 className="hero-title">Manole</h1>
          <p className="hero-subtitle">Actor profesionist & Artist</p>

          <div className="social-links">
            <a
              href="https://www.facebook.com/mariusmanoleoficial"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Facebook"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/mariusmanoleoficial?igsh=YzRranI0aDhwYWp0"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@manolemariusoficial?_t=ZN-90PBy8n8ob8&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="TikTok"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="horizontal-gallery fade-in">
          {portfolioPhotos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-photo"
              onClick={() =>
                setSelectedImage({ url: photo.url, alt: photo.alt })
              }
            >
              <img src={photo.url} alt={photo.alt} />
            </div>
          ))}
        </div>
      </section>

      <section className="about-section section-padding">
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">Despre mine</h2>
            <div className="about-text">
              <p>
                Salut, eu sunt Marius! Am 47 de ani și m-am născut la Iași,
                într-o toamnă care mirosea a frunze ude și a începuturi. Tot
                acolo am făcut și facultatea de actorie, fără să-mi dau seama
                atunci că scena o să devină casa mea. Am trecut prin teatrele
                din Focșani și Brăila, am învățat din fiecare loc câte ceva
                despre oameni și despre mine. Din 2002 sunt la Teatrul Național
                din București, un loc care m-a crescut, m-a obosit, m-a provocat
                și m-a ținut viu.
              </p>
              <p>
                Despre mine nu sunt multe de spus...Poate doar că pot munci
                enorm. Am avut zile cu 3, 4, uneori chiar 5 spectacole, și da,
                am supraviețuit. Îmi place să îmi depășesc limitele (care sunt
                destule), să încerc lucruri noi, să mă arunc cu totul și să văd
                ce iese. Poate de asta am început si coregrafia, poate de asta
                la 40 de ani mi-am propus primul maraton.
              </p>
              <p>
                Nu mi-e frică să greșesc. Chiar dimpotrivă, mă bucur când o fac,
                pentru că atunci învăț cel mai mult. Teatrul pentru mine nu este
                despre aplauze, ci despre adevăr. Despre momentele alea mici în
                care tăcerea din sală spune tot. Despre emoția aia care trece
                dintr-un om în altul fără cuvinte.
              </p>
              <p>
                Iubesc ce fac. Și oricât de greu ar fi uneori, ma simt norocos
                că pot trăi din asta și prin asta. Vă aștept la teatru cu tot ce
                sunt.
              </p>
              <p>Cu drag,</p>
              <p>Marius</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <h3 className="stat-number">5000+</h3>
                <p className="stat-label">Reprezentații</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number">20+</h3>
                <p className="stat-label">Ani de experiență</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number">80+</h3>
                <p className="stat-label">Producții de teatru</p>
              </div>
              <div className="stat-card">
                <h3 className="stat-number">10+</h3>
                <p className="stat-label">Premii</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Haideți să rămânem conectați</h2>
            <p>
              Vă invit cu drag la spectacole și mă bucur pentru fiecare mesaj pe
              care îl primesc, răspund cu plăcere.
            </p>
            <div className="cta-buttons">
              <Link to="/upcoming-shows" className="btn-primary">
                Vezi următoarele spectacole
              </Link>
              <Link to="/blog" className="btn-secondary">
                Citește-mi blogul
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
