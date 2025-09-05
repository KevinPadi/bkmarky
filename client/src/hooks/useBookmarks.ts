import { useFolderStore } from "@/stores/global-state";
import { useAuthSWR } from "./useAuthSWR";
import { useEffect } from "react";

export function useBookmarks() {
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const setBookmarks = useFolderStore((s) => s.setBookmarks);
  const activeFolder = useFolderStore((s) => s.activeFolder);

  const { data, error } = useAuthSWR(
    activeFolder
      ? `${BACKEND_URL}/api/bookmarks/?folderId=${activeFolder._id}`
      : null
  );

  useEffect(() => {
    if (data) setBookmarks(data);
  }, [data, setBookmarks]);

  return {
    bookmarks: useFolderStore((s) => s.bookmarks),
    isLoading: activeFolder ? !data && !error : false,
    isError: error,
  };
}
