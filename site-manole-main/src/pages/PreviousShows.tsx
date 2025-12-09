import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PreviousShows.css";
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

export default function PreviousShows() {
  useSEO("Repertoriu", "Spectacol de teatru");

  const [repertorii, setRepertorii] = useState<Repertoriu[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();

  const handleShowClick = (showId: number) => {
    navigate(`/repertoriu/${showId}`);
  };

  useEffect(() => {
    const fetchRepertorii = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/repertorii"
        );
        let fetchedRepertorii = [...response.data];
        fetchedRepertorii = fetchedRepertorii.filter((r: Repertoriu) =>
          r.titlu
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(searchTerm.toLowerCase())
        );
        setRepertorii(fetchedRepertorii);
      } catch (error) {
        console.error("Error fetching repertorii:", error);
      }
    };
    fetchRepertorii();
  }, [searchTerm]);

  return (
    <>
      <div className="previous-shows-page">
        <Navbar />
        <div className="container section-padding">
          <h1 className="page-title fade-in">"Am fost acolo"</h1>
          <p className="page-subtitle fade-in">
            Tot ce am jucat, dar n-am uitat. Roluri, amintiri și oameni care
            mi-au rămas în suflet.
          </p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Caută spectacole..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="shows-grid">
            {repertorii.map((repertoriu, index) => (
              <div
                key={repertoriu.repertoriuID}
                className="show-card fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleShowClick(repertoriu.repertoriuID)}
              >
                <div className="show-image">
                  <img src={repertoriu.cover} alt={repertoriu.titlu} />
                  <div className="show-overlay">
                    <span className="view-details">Vezi detalii</span>
                  </div>
                </div>
                <div className="show-info">
                  <h3 className="show-title">{repertoriu.titlu}</h3>
                  <p className="show-role">{repertoriu.personaj}</p>
                  <div className="show-meta">
                    <span className="show-venue">{repertoriu.locatie}</span>
                    <span className="show-date">{repertoriu.data}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
