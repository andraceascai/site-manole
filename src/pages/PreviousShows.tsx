import { useNavigate } from "react-router-dom";
import { useSEO } from "../hooks/useSEO";
import { previousShows } from "../data/mockData";
import "./PreviousShows.css";

export default function PreviousShows() {
  useSEO(
    "Previous Shows - Manole",
    "Explore past performances and theater productions. View show details, roles, and gallery images."
  );

  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShowClick = (showId: string) => {
    navigate(`/show/${showId}`);
  };

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
            {previousShows.map((show, index) => (
              <div
                key={show.id}
                className="show-card fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleShowClick(show.id)}
              >
                <div className="show-image">
                  <img src={show.image_url} alt={show.title} />
                  <div className="show-overlay">
                    <span className="view-details">Vezi detalii</span>
                  </div>
                </div>
                <div className="show-info">
                  <h3 className="show-title">{show.title}</h3>
                  <p className="show-role">{show.role}</p>
                  <div className="show-meta">
                    <span className="show-venue">{show.venue}</span>
                    <span className="show-date">
                      {formatDate(show.show_date)}
                    </span>
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
