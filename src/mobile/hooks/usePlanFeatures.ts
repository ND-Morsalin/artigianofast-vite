/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

type PlanConfig = {
  planId: number | null;
  features?: {
    limits?: Record<string, number>;
    [key: string]: any;
  };
};

export function usePlanFeatures() {
  const { data, isLoading, isError } = useQuery<PlanConfig>({
    queryKey: [`/api/mobile/plan-configuration`],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/mobile/plan-configuration`);
      return res.data;
    },
    staleTime: 60_000,
  });

  const hasFeature = (id: string, fallback = false): boolean => {
    return (data?.features?.[id] as boolean) ?? fallback;
  };

  const getLimit = (key: string, fallback = -1): number => {
    const val = data?.features?.limits?.[key];
    return typeof val === "number" ? val : fallback;
  };

  return {
    planConfig: data,
    loadingPlan: isLoading,
    planError: isError,
    hasFeature,
    getLimit,
  };
}
