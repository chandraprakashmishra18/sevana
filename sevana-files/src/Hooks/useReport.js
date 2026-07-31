import { useQuery } from "@tanstack/react-query";
import { getReports } from "../services/report.service";

export default function useReports(filters = {}) {
  return useQuery({
    queryKey: ["reports", filters],

    queryFn: () => getReports(filters),

    staleTime: 1000 * 60,

    refetchInterval: 30000,

    retry: 2,

    refetchOnWindowFocus: false,
  });
}