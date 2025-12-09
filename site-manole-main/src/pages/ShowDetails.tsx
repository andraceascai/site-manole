import { useParams, useNavigate } from "react-router-dom";
import "./ShowDetails.css";
import { useEffect, useState } from "react";
import ImageLightbox from "../components/ImageLightbox";
import axios from "axios";
import Navbar from "../components/Navbar";

interface Repertoriu {
  _id: string;
  repertoriuID: number;
  titlu: string;
  personaj: string;
  locatie: string;
  data: string;
  descriere: string;
  galerie: string[];
  categorie: string;
  cover: string;
}

export default function ShowDetails() {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);
  const [repertoriu, setRepertoriu] = useState<Repertoriu>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRepertoriu = async (id: number) => {
      try {
        const response = await axios.get(`${apiUrl}/repertorii/${id}`);
        setRepertoriu(response.data);
      } catch (error) {
        console.error("Error fetching repertorii:", error);
      }
    };
    fetchRepertoriu(Number(id));
  }, []);
  if (!repertoriu) {
    return (
      <div className="container section-padding">
        <div className="not-found">
          <h1>Spectacolul nu a fost găsit</h1>
          <button
            className="btn-primary"
            onClick={() => navigate("/repertoriu")}
          >
            Înapoi la spectacole
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {selectedImage && (
        <ImageLightbox
          imageUrl={selectedImage.url}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
      <div className="show-details-page">
        <Navbar />
        <button className="back-button" onClick={() => navigate("/repertoriu")}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Înapoi la spectacole
        </button>

        <div className="show-details-container">
          <div className="show-details-header">
            <h2 className="fade-in">{repertoriu.titlu}</h2>
            <p className="show-details-role fade-in">{repertoriu.personaj}</p>
          </div>

          <div className="show-details-content">
            <div className="show-details-info fade-in">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Locație:</span>
                  <span className="info-value">{repertoriu.locatie}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Data premierei:</span>
                  <span className="info-value">{repertoriu.data}</span>
                </div>
              </div>

              <div className="show-details-description">
                <h3>Despre spectacol</h3>
                <p>{repertoriu.descriere}</p>
              </div>

              {repertoriu.galerie && repertoriu.galerie.length > 0 && (
                <div className="show-details-gallery">
                  <h3>Galerie</h3>
                  <div className="gallery-grid">
                    {repertoriu.galerie.map((image, index) => (
                      <div
                        key={index}
                        className="gallery-item fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() =>
                          setSelectedImage({ url: image, alt: "index" })
                        }
                      >
                        <img
                          src={image}
                          alt={`${repertoriu.titlu} gallery ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
