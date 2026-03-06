import { useState, useEffect } from 'react';
import '../gallery.css';
import rawGalleryData from '../../cloudinary_urls.json';
import { Link } from 'react-router-dom';

// Define types based on JSON structure
type CloudinaryImage = {
    image_name: string;
    url: string;
};

type GalleryData = {
    [eventName: string]: CloudinaryImage[];
};

const galleryData: GalleryData = rawGalleryData;

export function GalleryPage() {
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [previewImageIndex, setPreviewImageIndex] = useState<number | null>(null);

    // Filter out events with no images and format them
    const validEvents = Object.entries(galleryData)
        .filter(([_, images]) => images.length > 0)
        .map(([eventName, images]) => ({
            name: eventName,
            images,
            cover: images[0].url,
            count: images.length,
        }));

    // Handle body scrolling when modal is open
    useEffect(() => {
        if (selectedEvent || previewImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedEvent, previewImageIndex]);

    // Set page meta data
    useEffect(() => {
        document.title = 'Events Gallery — IEEE / ODC'
        window.scrollTo(0, 0)
    }, []);

    // Selected event data
    const currentEventData = validEvents.find((e) => e.name === selectedEvent);
    const currentImages = currentEventData?.images || [];

    const handleNext = () => {
        if (previewImageIndex !== null && previewImageIndex < currentImages.length - 1) {
            setPreviewImageIndex(previewImageIndex + 1);
        }
    };

    const handlePrev = () => {
        if (previewImageIndex !== null && previewImageIndex > 0) {
            setPreviewImageIndex(previewImageIndex - 1);
        }
    };

    return (
        <div className="premium-gallery-section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
            <div className="premium-gallery-bg-glow"></div>

            <div className="premium-gallery-container">
                <div className="premium-header">
                    <Link to="/" className="premium-subtitle" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to Home
                    </Link>
                    <h1 className="premium-title">Full Event Gallery</h1>
                    <p className="premium-desc">
                        Explore all the vibrant moments from our previously hosted workshops, hackathons, and training sessions supported by the partnership.
                    </p>
                </div>

                <div className="premium-events-grid">
                    {validEvents.map((ev) => (
                        <article
                            key={ev.name}
                            className="premium-event-card"
                            onClick={() => setSelectedEvent(ev.name)}
                        >
                            <img src={ev.cover} alt={ev.name} className="premium-event-cover" loading="lazy" />
                            <div className="premium-event-overlay">
                                <div className="premium-event-badge">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                    {ev.count} Photos
                                </div>
                                <h2 className="premium-event-name">{ev.name}</h2>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Main Lightbox Modal */}
            <div className={`premium-modal-backdrop ${selectedEvent ? 'is-open' : ''}`}>
                <div className="premium-modal-content">
                    <div className="premium-modal-header">
                        <h3 className="premium-modal-title">{selectedEvent}</h3>
                        <button
                            className="premium-modal-close"
                            onClick={() => { setSelectedEvent(null); setPreviewImageIndex(null); }}
                            aria-label="Close modal"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div className="premium-modal-body">
                        <div className="premium-lightbox-grid">
                            {currentImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="premium-lightbox-item"
                                    onClick={() => setPreviewImageIndex(idx)}
                                >
                                    <img src={img.url} alt={`Gallery ${idx + 1}`} loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fullscreen Preview inside Modal */}
                    <div className={`premium-preview-overlay ${previewImageIndex !== null ? 'is-active' : ''}`}>
                        <div className="premium-preview-header">
                            <button
                                className="premium-modal-close"
                                onClick={() => setPreviewImageIndex(null)}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        {previewImageIndex !== null && previewImageIndex > 0 && (
                            <button className="premium-nav-btn premium-nav-prev" onClick={handlePrev}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                        )}

                        {previewImageIndex !== null && (
                            <img
                                key={previewImageIndex}
                                src={currentImages[previewImageIndex].url}
                                className="premium-preview-img"
                                alt="Preview"
                            />
                        )}

                        {previewImageIndex !== null && previewImageIndex < currentImages.length - 1 && (
                            <button className="premium-nav-btn premium-nav-next" onClick={handleNext}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
