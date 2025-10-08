import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { portfolioPhotos } from '../data/mockData';
import ImageLightbox from '../components/ImageLightbox';
import './HomePage.css';

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

  useSEO(
    'Manole - Professional Actor & Performer',
    'Official website of Manole - Professional theater and film actor. Explore shows, blog posts, and stay updated with upcoming performances.'
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
            <p className="hero-subtitle">Professional Actor & Performer</p>

            <div className="social-links">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="TikTok"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="horizontal-gallery fade-in">
            {portfolioPhotos.map((photo) => (
              <div
                key={photo.id}
                className="gallery-photo"
                onClick={() => setSelectedImage({ url: photo.url, alt: photo.alt })}
              >
                <img src={photo.url} alt={photo.alt} />
              </div>
            ))}
          </div>
        </section>

        <section className="about-section section-padding">
          <div className="container">
            <div className="about-content">
              <h2 className="section-title">About Me</h2>
              <div className="about-text">
                <p>
                  Welcome to my personal space where art meets passion. With over 10 years of experience
                  in theater and film, I've dedicated my life to bringing stories to life and connecting
                  with audiences on a deeper level.
                </p>
                <p>
                  My journey began on the stages of local theaters, where I discovered the transformative
                  power of performance. Since then, I've had the privilege of working with talented
                  directors, fellow actors, and creative teams who have shaped my craft.
                </p>
                <p>
                  Through this website, I invite you to explore my work, read my thoughts on acting and
                  creativity, and join a community of fellow art enthusiasts.
                </p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h3 className="stat-number">50+</h3>
                  <p className="stat-label">Performances</p>
                </div>
                <div className="stat-card">
                  <h3 className="stat-number">10+</h3>
                  <p className="stat-label">Years Experience</p>
                </div>
                <div className="stat-card">
                  <h3 className="stat-number">25+</h3>
                  <p className="stat-label">Theater Productions</p>
                </div>
                <div className="stat-card">
                  <h3 className="stat-number">15+</h3>
                  <p className="stat-label">Awards</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>Let's Stay Connected</h2>
              <p>Follow my journey and be the first to know about upcoming shows and exclusive content.</p>
              <div className="cta-buttons">
                <Link to="/upcoming-shows" className="btn-primary">View Upcoming Shows</Link>
                <Link to="/blog" className="btn-secondary">Read My Blog</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
