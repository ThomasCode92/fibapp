import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

import { fetchAllValues } from "~/api/queries";

type FibValuesResponse = {
  message: string;
  data: number[];
};

export function useFibValues(): UseQueryResult<FibValuesResponse> {
  return useQuery<FibValuesResponse>({
    queryKey: ["values"],
    queryFn: fetchAllValues,
  });
}
