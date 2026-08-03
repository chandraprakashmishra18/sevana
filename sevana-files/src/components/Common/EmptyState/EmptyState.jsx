import React from "react";
import "./EmptyState.css";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick,
  themeColor = "#10b981", // Emerald green default
  iconBgColor = "#f0fdf4",
}) {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon-wrapper">
        <div className="empty-state-icon-bg" style={{ backgroundColor: iconBgColor }}>
          {Icon && <Icon size={48} style={{ color: themeColor }} />}
        </div>
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {buttonText && onButtonClick && (
        <button
          className="empty-state-cta"
          onClick={onButtonClick}
          style={{ backgroundColor: themeColor }}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
