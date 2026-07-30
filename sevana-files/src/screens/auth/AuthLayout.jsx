import { Link } from "react-router-dom";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            🐾 Sevana
          </h1>

          <h2 className="text-2xl font-semibold mt-6">
            {title}
          </h2>

          <p className="text-gray-500 mt-2">
            {subtitle}
          </p>
        </div>

        {children}

        <div className="mt-8 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link
            to={footerLink}
            className="text-green-600 font-semibold hover:underline"
          >
            {footerLinkText}
          </Link>
        </div>

      </div>
    </div>
  );
}