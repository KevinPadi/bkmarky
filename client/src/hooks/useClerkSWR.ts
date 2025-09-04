import useSWR from "swr";

export function useClerkSWR(url: string | null) {
  const fetcher = async (url: string) => {
    const res = await fetch(url, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
  };

  return useSWR(url, fetcher);
}
