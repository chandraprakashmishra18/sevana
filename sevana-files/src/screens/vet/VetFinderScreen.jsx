import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, MapPin, Phone, Clock, Star, Compass, Map, List, Search, 
  Filter, Stethoscope, ShieldAlert, Share2, HeartPulse, ChevronRight, X, PhoneCall
} from "lucide-react";

import useVets from "../../hooks/useVets";
import useGeolocation from "../../hooks/useGeolocation";
import { getDistance } from "../../services/vet.service";
import { useToast } from "../../context/ToastContext";
import "./VetFinderScreen.css";

export default function VetFinderScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  
  // Geolocation
  const { coordinates: userCoords, loading: geoLoading } = useGeolocation();
  
  // States
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVet, setSelectedVet] = useState(null); // For details modal/panel
  const [filters, setFilters] = useState({
    emergency: false,
    available24x7: false,
    govt: false,
    private: false
  });
  const [sortBy, setSortBy] = useState("nearest"); // "nearest", "rating", "emergency"

  // Check if we navigated here from a specific report (which has coords)
  const reportCoords = location.state?.coordinates; // { latitude, longitude }
  const activeCoords = reportCoords || userCoords;

  // Fetch vets using query
  const { data: vets, isLoading, isError, refetch } = useVets();

  // Handle sharing
  const handleShare = (vet) => {
    navigator.clipboard.writeText(`${vet.clinic_name}\nAddress: ${vet.address}, ${vet.city}\nPhone: ${vet.phone}`);
    showToast({
      type: "success",
      title: "Shared Successfully",
      message: "Clinic details copied to clipboard!"
    });
  };

  // Toggle filter
  const toggleFilter = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Process, filter & sort vets
  const getProcessedVets = () => {
    if (!vets) return [];

    let result = vets.map(v => {
      const distance = activeCoords 
        ? getDistance(activeCoords.latitude, activeCoords.longitude, v.latitude, v.longitude)
        : null;
      return { ...v, distance };
    });

    // 1. Filter by Search Query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(v => 
        v.clinic_name.toLowerCase().includes(query) ||
        v.address.toLowerCase().includes(query) ||
        v.city.toLowerCase().includes(query) ||
        v.pincode.includes(query)
      );
    }

    // 2. Filter by badges
    if (filters.emergency) {
      result = result.filter(v => v.emergency_service);
    }
    if (filters.available24x7) {
      result = result.filter(v => v.available_24x7);
    }
    if (filters.govt) {
      result = result.filter(v => v.is_govt);
    }
    if (filters.private) {
      result = result.filter(v => !v.is_govt);
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === "nearest" && activeCoords) {
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      }
      if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      if (sortBy === "emergency") {
        return (b.emergency_service ? 1 : 0) - (a.emergency_service ? 1 : 0);
      }
      return a.clinic_name.localeCompare(b.clinic_name);
    });

    return result;
  };

  const processedVets = getProcessedVets();
  const mapVet = selectedVet || processedVets[0];

  return (
    <div className="vet-finder-page">
      {/* ---------- Header ---------- */}
      <header className="vet-header">
        <div className="header-left">
          <button className="back-circle-btn" onClick={() => navigate(-1)} aria-label="Back">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Vet Finder</h1>
            <p className="subtitle">
              {reportCoords ? "🏥 Clinics near rescue location" : "🏥 Veterinary clinics near you"}
            </p>
          </div>
        </div>
        <div className="view-toggle">
          <button 
            className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List size={16} />
            <span>List</span>
          </button>
          <button 
            className={`toggle-btn ${viewMode === "map" ? "active" : ""}`}
            onClick={() => setViewMode("map")}
          >
            <Map size={16} />
            <span>Map</span>
          </button>
        </div>
      </header>

      {/* ---------- Search & Sort Panel ---------- */}
      <section className="search-sort-panel">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by city, pincode, clinic name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="vet-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="sort-wrapper">
          <span className="sort-label">Sort:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="vet-sort-select"
          >
            <option value="nearest">Nearest First</option>
            <option value="rating">Highest Rated</option>
            <option value="emergency">Emergency First</option>
          </select>
        </div>
      </section>

      {/* ---------- Filter Chips ---------- */}
      <section className="filter-scroll-wrapper">
        <button 
          className={`filter-chip ${filters.emergency ? "active" : ""}`}
          onClick={() => toggleFilter("emergency")}
        >
          🚨 Emergency Service
        </button>
        <button 
          className={`filter-chip ${filters.available24x7 ? "active" : ""}`}
          onClick={() => toggleFilter("available24x7")}
        >
          ⏰ 24/7 Hours
        </button>
        <button 
          className={`filter-chip ${filters.govt ? "active" : ""}`}
          onClick={() => toggleFilter("govt")}
        >
          🏛️ Government
        </button>
        <button 
          className={`filter-chip ${filters.private ? "active" : ""}`}
          onClick={() => toggleFilter("private")}
        >
          🩺 Private Clinic
        </button>
      </section>

      {/* ---------- Main Content Layout ---------- */}
      <main className="vet-main-content">
        {isLoading ? (
          <div className="vet-loading-feed">
            {[1, 2, 3].map(n => (
              <div key={n} className="skeleton-card shimmer">
                <div className="skeleton-image" />
                <div className="skeleton-title" />
                <div className="skeleton-text" />
                <div className="skeleton-text short" />
                <div className="skeleton-footer">
                  <div className="skeleton-button" />
                  <div className="skeleton-button" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="vet-error-card">
            <ShieldAlert size={48} className="error-icon" />
            <h3>Unable to Load Clinics</h3>
            <p>We encountered an issue fetching veterinary clinics near you. Please verify your connection.</p>
            <button className="primary-button" onClick={() => refetch()}>
              Retry Connection
            </button>
          </div>
        ) : processedVets.length === 0 ? (
          <div className="vet-empty-card">
            <div className="empty-emoji">🏥</div>
            <h3>No Vet Clinics Found</h3>
            <p>We couldn't find any veterinary clinics matching your criteria. Try adjusting your search query or filters.</p>
            <button className="primary-button" onClick={() => {
              setSearchQuery("");
              setFilters({ emergency: false, available24x7: false, govt: false, private: false });
            }}>
              Clear Filters
            </button>
          </div>
        ) : viewMode === "list" ? (
          <div className="vet-list-view">
            {processedVets.map((vet) => (
              <div 
                key={vet.id} 
                className="vet-card"
                onClick={() => setSelectedVet(vet)}
              >
                <div className="vet-card-image-wrapper">
                  <img src={vet.image} alt={vet.clinic_name} className="vet-card-img" />
                  <div className="vet-card-badges">
                    {vet.emergency_service && <span className="badge emergency">Emergency</span>}
                    {vet.is_govt ? (
                      <span className="badge govt">Govt</span>
                    ) : (
                      <span className="badge private">Private</span>
                    )}
                  </div>
                </div>

                <div className="vet-card-body">
                  <div className="vet-card-header">
                    <h4>{vet.clinic_name}</h4>
                    <div className="vet-card-rating">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <span>{vet.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="vet-card-address">
                    <MapPin size={13} />
                    <span>{vet.address}, {vet.city}</span>
                  </p>

                  <div className="vet-card-meta-row">
                    <span className="vet-distance-pill">
                      📍 {vet.distance !== null ? `${vet.distance} km away` : "Distance unknown"}
                    </span>
                    <span className={`vet-status-pill ${vet.available_24x7 ? "open" : "closed"}`}>
                      ● {vet.available_24x7 ? "Open 24/7" : "Open Day Hours"}
                    </span>
                  </div>

                  <div className="vet-card-actions" onClick={(e) => e.stopPropagation()}>
                    <a 
                      href={`tel:${vet.phone}`} 
                      className="vet-action-btn secondary"
                      onClick={() => showToast({ type: "info", title: "Calling Clinic", message: `Dialing ${vet.phone}` })}
                    >
                      <Phone size={14} />
                      <span>Call</span>
                    </a>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${vet.latitude},${vet.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vet-action-btn primary"
                    >
                      <Compass size={14} />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ---------- Map View (Interactive Split screen) ---------- */
          <div className="vet-map-view">
            <div className="map-embed-wrapper">
              {mapVet ? (
                <iframe
                  title="Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${mapVet.latitude},${mapVet.longitude}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                />
              ) : (
                <div className="map-placeholder">Select a clinic to show on map</div>
              )}
            </div>

            {/* Split map card list */}
            <div className="map-cards-list">
              {processedVets.slice(0, 3).map(vet => (
                <div 
                  key={vet.id} 
                  className={`vet-map-compact-card ${mapVet?.id === vet.id ? "active" : ""}`}
                  onClick={() => setSelectedVet(vet)}
                >
                  <div className="compact-card-details">
                    <h5>{vet.clinic_name}</h5>
                    <p className="compact-address">{vet.address}</p>
                    <div className="compact-badge-row">
                      <span className="compact-rating">⭐ {vet.rating.toFixed(1)}</span>
                      <span className="compact-distance">📍 {vet.distance !== null ? `${vet.distance} km` : ""}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="compact-arrow-icon" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ---------- Vet Details Drawer / Modal ---------- */}
      {selectedVet && (
        <div className="vet-details-modal-overlay" onClick={() => setSelectedVet(null)}>
          <div className="vet-details-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="drawer-close-btn" onClick={() => setSelectedVet(null)} aria-label="Close">
              <X size={20} />
            </button>

            <div className="drawer-hero">
              <img src={selectedVet.image} alt={selectedVet.clinic_name} className="drawer-hero-img" />
              <div className="drawer-badges">
                {selectedVet.emergency_service && <span className="badge emergency">Emergency Clinic</span>}
                <span className={`badge status ${selectedVet.available_24x7 ? "open" : "closed"}`}>
                  {selectedVet.available_24x7 ? "24/7 Hours" : "Standard Hours"}
                </span>
              </div>
            </div>

            <div className="drawer-body">
              <h2 className="drawer-clinic-name">{selectedVet.clinic_name}</h2>
              <div className="drawer-rating-row">
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <strong className="rating-value">{selectedVet.rating.toFixed(1)}</strong>
                <span className="experience-value">({selectedVet.years_of_experience} yrs experience)</span>
              </div>

              <div className="drawer-info-grid">
                <div className="drawer-info-item">
                  <MapPin size={18} className="drawer-icon" />
                  <div>
                    <strong>Location Address</strong>
                    <p>{selectedVet.address}, {selectedVet.city}, {selectedVet.state} - {selectedVet.pincode}</p>
                  </div>
                </div>

                <div className="drawer-info-item">
                  <Phone size={18} className="drawer-icon" />
                  <div>
                    <strong>Contact Number</strong>
                    <p>{selectedVet.phone}</p>
                  </div>
                </div>

                <div className="drawer-info-item">
                  <Clock size={18} className="drawer-icon" />
                  <div>
                    <strong>Working Hours</strong>
                    <p>{selectedVet.working_hours}</p>
                  </div>
                </div>
              </div>

              {/* Services List */}
              <div className="drawer-services-section">
                <h3>Available Services</h3>
                <div className="services-chips-grid">
                  {selectedVet.services?.map((service, index) => (
                    <span key={index} className="service-chip">
                      🩺 {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="drawer-action-footer">
                <button 
                  className="drawer-action-btn secondary"
                  onClick={() => handleShare(selectedVet)}
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
                <a 
                  href={`tel:${selectedVet.phone}`}
                  className="drawer-action-btn secondary call-btn"
                  onClick={() => showToast({ type: "info", title: "Calling Clinic", message: `Calling ${selectedVet.phone}` })}
                >
                  <PhoneCall size={16} />
                  <span>Call Clinic</span>
                </a>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedVet.latitude},${selectedVet.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drawer-action-btn primary navigate-btn"
                >
                  <Compass size={16} />
                  <span>Navigate</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
