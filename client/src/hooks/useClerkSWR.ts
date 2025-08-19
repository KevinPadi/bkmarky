import { useAuth } from "@clerk/clerk-react";
import useSWR from "swr";

export function useClerkSWR(url: string | null) {
  const { getToken } = useAuth();

  const fetcher = async (url: string) => {
    const token = await getToken();
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  };

  return useSWR(url, fetcher);
}
