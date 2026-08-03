import "./PageLayout.css";

export default function PageLayout({ children }) {
  return (
    <main className="page-layout">
      <div className="page-container">
        {children}
      </div>
    </main>
  );
}