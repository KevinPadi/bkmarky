import { useFolderStore } from "@/stores/global-state";
import { useClerkSWR } from "./useClerkSWR";
import { useEffect } from "react";

export function useFolders() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { data, error } = useClerkSWR(`${BACKEND_URL}/api/folders`);
  const setFolders = useFolderStore((s) => s.setFolders);
  const setActiveFolder = useFolderStore((s) => s.setActiveFolder);
  useEffect(() => {
    if (data) {
      setFolders(data);
      setActiveFolder(data[0]);
    }
  }, [data, setFolders, setActiveFolder]);

  return {
    folders: useFolderStore((s) => s.folders),
    isLoading: !data && !error,
    isError: error,
  };
}
