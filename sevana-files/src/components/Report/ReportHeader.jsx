import "./ReportHeader.css";

export default function ReportHeader({ title = "Report an Animal", description }) {
  return (
    <header className="report-header">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </header>
  );
}
