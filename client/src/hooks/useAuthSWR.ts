import useSWR from "swr";
import axios from "axios";

export function useAuthSWR(url: string | null) {
  const fetcher = async (url: string) => {
    const res = await axios.get(url, { withCredentials: true });
    return res.data;
  };

  return useSWR(url, fetcher);
}
