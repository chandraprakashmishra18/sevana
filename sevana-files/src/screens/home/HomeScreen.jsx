import HeroCard from "../../components/Home/HeroCard";
import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();

  return <HeroCard user={user} />;
}
