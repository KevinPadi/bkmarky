import { useFolderStore } from "@/stores/global-state";
import { useClerkSWR } from "./useClerkSWR";
import { useEffect } from "react";

export function useFolders() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { data, error } = useClerkSWR(`${BACKEND_URL}/api/folders`);
  const setFolders = useFolderStore((s) => s.setFolders);

  useEffect(() => {
    if (data) {
      setFolders(data);
    }
  }, [data, setFolders]);

  return {
    folders: useFolderStore((s) => s.folders),
    isLoading: !data && !error,
    isError: error,
  };
}
