import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PreviousShows.css";

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
  useSEO(
    "Repertoriu - Manole",
    "Explore past performances and theater productions. View show details, roles, and gallery images."
  );

  const [repertorii, setRepertorii] = useState<Repertoriu[]>([]);

  const navigate = useNavigate();

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  const handleShowClick = (showId: number) => {
    navigate(`/repertoriu/${showId}`);
  };

  useEffect(() => {
    const fetchRepertorii = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/repertorii"
        );
        setRepertorii(response.data);
      } catch (error) {
        console.error("Error fetching repertorii:", error);
      }
    };
    fetchRepertorii();
  }, []);
  // console.log(repertorii);

  return (
    <>
      <div className="previous-shows-page">
        <div className="container section-padding">
          <h1 className="page-title fade-in">"Am fost acolo"</h1>
          <p className="page-subtitle fade-in">
            Tot ce am jucat, dar n-am uitat. Roluri, amintiri și oameni care
            mi-au rămas în suflet.
          </p>

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
