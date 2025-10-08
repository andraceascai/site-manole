import { useParams, useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { previousShows } from '../data/mockData';
import './ShowDetails.css';

export default function ShowDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const show = previousShows.find(s => s.id === id);

  useSEO(
    show ? `${show.title} - Manole` : 'Show Not Found',
    show?.description
  );

  if (!show) {
    return (
      <div className="container section-padding">
        <div className="not-found">
          <h1>Show Not Found</h1>
          <button className="btn-primary" onClick={() => navigate('/previous-shows')}>
            Back to Shows
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="show-details-page">
        <button className="back-button" onClick={() => navigate('/previous-shows')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Shows
        </button>

        <div className="show-details-container">
          <div className="show-details-header">
            <h1 className="fade-in">{show.title}</h1>
            <p className="show-details-role fade-in">{show.role}</p>
          </div>

          <div className="show-details-content">
            <div className="show-details-main-image fade-in">
              <img src={show.image_url} alt={show.title} />
            </div>

            <div className="show-details-info fade-in">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Venue:</span>
                  <span className="info-value">{show.venue}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date:</span>
                  <span className="info-value">{formatDate(show.show_date)}</span>
                </div>
              </div>

              <div className="show-details-description">
                <h3>About the Show</h3>
                <p>{show.description}</p>
              </div>

              {show.gallery_images && show.gallery_images.length > 0 && (
                <div className="show-details-gallery">
                  <h3>Gallery</h3>
                  <div className="gallery-grid">
                    {show.gallery_images.map((image, index) => (
                      <div key={index} className="gallery-item fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <img src={image} alt={`${show.title} gallery ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
