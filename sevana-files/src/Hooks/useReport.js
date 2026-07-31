import { useQuery } from "@tanstack/react-query";
import { getReport } from "../services/report.service";

export default function useReport(id) {
  return useQuery({
    queryKey: ["report", id],

    queryFn: () => getReport(id),

    enabled: !!id,

    staleTime: 60000,
  });
}