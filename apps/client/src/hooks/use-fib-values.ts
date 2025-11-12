import { useQuery } from "@tanstack/react-query";

import { fetchAllCalculatedValues, fetchAllValues } from "~/api/queries";

type FibValuesResponse = {
  message: string;
  data: number[];
};

type FibCalculatedValuesResponse = {
  message: string;
  data: Record<string, string>; // TODO: Change this to be Record<string, number> (needs backend update)
};

export function useFibValues() {
  return useQuery<FibValuesResponse>({
    queryKey: ["values"],
    queryFn: fetchAllValues,
  });
}

export function useFibCalculatedValues() {
  return useQuery<FibCalculatedValuesResponse>({
    queryKey: ["values", "calculated"],
    queryFn: fetchAllCalculatedValues,
  });
}
