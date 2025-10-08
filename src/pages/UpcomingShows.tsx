import { useSEO } from '../hooks/useSEO';
import { upcomingShows } from '../data/mockData';
import './UpcomingShows.css';

export default function UpcomingShows() {
  useSEO(
    'Upcoming Shows - Manole',
    "Don't miss upcoming performances! View show details, dates, venues, and purchase tickets."
  );
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const showDate = new Date(dateString);
    const today = new Date();
    const diffTime = showDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="upcoming-shows-page">
        <div className="container section-padding">
          <h1 className="page-title fade-in">Upcoming Shows</h1>
          <p className="page-subtitle fade-in">Get your tickets and join me on stage</p>

          <div className="upcoming-shows-grid">
            {upcomingShows.map((show, index) => {
              const daysUntil = getDaysUntil(show.show_date);
              return (
                <div
                  key={show.id}
                  className="upcoming-show-card fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="upcoming-show-image">
                    <img src={show.image_url} alt={show.title} />
                    {daysUntil <= 30 && daysUntil > 0 && (
                      <div className="upcoming-badge">Coming Soon</div>
                    )}
                  </div>

                  <div className="upcoming-show-content">
                    <div className="upcoming-show-header">
                      <h3 className="upcoming-show-title">{show.title}</h3>
                      <span className="upcoming-show-role">{show.role}</span>
                    </div>

                    <p className="upcoming-show-description">{show.description}</p>

                    <div className="upcoming-show-details">
                      <div className="detail-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{formatDate(show.show_date)}</span>
                      </div>

                      <div className="detail-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>{show.venue}</span>
                      </div>

                      {daysUntil > 0 && (
                        <div className="detail-item countdown">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          <span>{daysUntil} {daysUntil === 1 ? 'day' : 'days'} to go</span>
                        </div>
                      )}
                    </div>

                    <a
                      href={show.ticket_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary ticket-btn"
                    >
                      Get Tickets
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {upcomingShows.length === 0 && (
            <div className="empty-state">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <p>No upcoming shows scheduled at the moment.</p>
              <p className="empty-subtext">Check back soon for new performances!</p>
            </div>
          )}
        </div>
      </div>
  );
}
