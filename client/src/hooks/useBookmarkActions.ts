import { deleteBookmark } from "@/api/bookmarks";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "sonner";

export const useBookmarkActions = () => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = (text: string) => {
    copyToClipboard(text);
    toast.success("Link copied to clipboard");
  };

  const handleDelete = async (bookmarkId: string) => {
    await deleteBookmark(bookmarkId);
  };

  return { handleCopy, handleDelete };
};
