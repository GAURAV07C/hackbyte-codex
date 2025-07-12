"use client";

import { getSession } from "next-auth/react";
import { useQuery, } from "@tanstack/react-query";

// Session fetcher
export const fetchSession = async () => {
  const session = await getSession();
  return session;
};

// Custom query hook
export const useSessionQuery = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    refetchOnWindowFocus: true,
    staleTime: 0, // always fresh
  });
};
