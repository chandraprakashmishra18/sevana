import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReport } from "../services/report.service";

export default function useCreateReport() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createReport,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
    },
  });

  return {
    submitReport: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}