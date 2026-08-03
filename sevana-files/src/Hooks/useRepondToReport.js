import { useMutation, useQueryClient } from "@tanstack/react-query";

import { respondToReport } from "../services/report.service";

export default function useRespondToReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, notes }) =>
      respondToReport(id, notes),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["report", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });
}