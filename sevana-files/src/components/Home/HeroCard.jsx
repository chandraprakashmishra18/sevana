import "./HeroCard.css";
import { PawPrint } from "lucide-react";

export default function HeroCard({ user }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <section className="hero-card">

      <div className="hero-content">

        <span className="hero-greeting">
          {greeting},
        </span>

        <h1>
          {user?.full_name || "Animal Hero"} 👋
        </h1>

        <p>
          Every rescue begins with someone who cares.
        </p>

      </div>

      <div className="hero-icon">
        <PawPrint size={34} />
      </div>

    </section>
  );
}