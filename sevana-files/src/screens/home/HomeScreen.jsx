import HeroCard from "../../components/Home/HeroCard";
import XPCard from "../../components/Home/XPCard";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <>
      <HeroCard user={user} />

      <XPCard
        xp={user?.xp || 250}
        level={user?.level || 1}
        nextLevelXP={500}
      />
    </>
  );
}
