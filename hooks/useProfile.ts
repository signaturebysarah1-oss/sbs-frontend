// hooks/useProfile.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/providers/query/authfetch";

export const useProfile = (enabled: boolean) => {
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: () => authFetch("api/auth/me"),
    enabled,
  });
};