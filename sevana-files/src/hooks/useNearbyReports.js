import { useQuery } from "@tanstack/react-query";

import { getNearbyReports } from "../services/report.service";

export default function useNearbyReports(lat, lng) {
  return useQuery({
    queryKey: ["nearbyReports", lat, lng],

    queryFn: () =>
      getNearbyReports({
        lat,
        lng,
      }),

    enabled: !!lat && !!lng,

    staleTime: 1000 * 60,
  });
}