import { Link } from "react-router-dom";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLink,
}) {
  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        {/* Left Section */}
        <div className="auth-left">
          <div className="logo-circle">
            🐾
          </div>

          <h1 className="auth-logo">
            Sevana
          </h1>

          <p className="auth-tagline">
            Rescue • Report • Protect
          </p>

          <p className="auth-description">
            Every rescue starts with one compassionate action.
            Join the community that helps injured and abandoned
            animals receive the care they deserve.
          </p>
        </div>

        {/* Right Section */}
        <div className="auth-right">
          <div className="auth-card">

            <h2>{title}</h2>

            <p className="auth-subtitle">
              {subtitle}
            </p>

            <div className="auth-form">
              {children}
            </div>

            <div className="auth-footer">
              <span>{footerText}</span>

              <Link to={footerLink}>
                {footerLinkText}
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}