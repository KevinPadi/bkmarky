import { useFolderStore } from "@/stores/global-state";
import axios, { isAxiosError } from "axios";
import { toast } from "sonner";
import type { Bookmark } from "@/stores/global-state";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const addBookmark = async ({
  title,
  url,
  folderId,
  domain,
  favicon,
}: Omit<Bookmark, "_id" | "createdAt">) => {
  const addBookmark = useFolderStore.getState().addBookmark;
  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/api/bookmarks`,
      { title, url, folderId, domain, favicon },
      { withCredentials: true }
    );
    addBookmark(data);
    return data;
  } catch (error: unknown) {
    let errMsg = "Error adding bookmark";
    if (isAxiosError(error)) {
      errMsg = error.response?.data?.error || error.message || errMsg;
    } else if (error instanceof Error) {
      errMsg = error.message || errMsg;
    } else if (typeof error === "string") {
      errMsg = error;
    }

    toast.error(errMsg);
  }
};
