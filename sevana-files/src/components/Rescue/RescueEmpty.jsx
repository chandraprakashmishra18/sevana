import { PawPrint } from "lucide-react";

export default function RescueEmpty() {
  return (
    <div className="rescue-empty">

      <PawPrint size={70} />

      <h2>No Rescue Reports</h2>

      <p>
        Great news! There are currently no
        rescue requests nearby.
      </p>

    </div>
  );
}