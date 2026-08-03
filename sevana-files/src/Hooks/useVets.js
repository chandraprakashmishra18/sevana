import { useQuery } from "@tanstack/react-query";
import { getVets } from "../services/vet.service";

export default function useVets(filters = {}) {
  return useQuery({
    queryKey: ["vets", filters],
    queryFn: () => getVets(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
