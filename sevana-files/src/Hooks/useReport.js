import { useQuery } from "@tanstack/react-query";
import { getReport } from "../services/report.service";

export default function useReport(id) {
  return useQuery({
    queryKey: ["report", id],

    queryFn: () => getReport(id),

    enabled: Boolean(id),

    staleTime: 60 * 1000,

    gcTime: 5 * 60 * 1000,

    refetchOnWindowFocus: false,

    retry: 1,
  });
}