import type { Bookmark } from "@/stores/global-state";
import { useCallback, useEffect, useState } from "react";
import { useBookmarkActions } from "./useBookmarkActions";

export const useKeyboardShortcuts = (
  value: string,
  currentBookmark: Bookmark | undefined
) => {
  const { handleCopy, handleDelete } = useBookmarkActions();
  const [isOpen, setIsOpen] = useState(false);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (!value || !currentBookmark || !(e.ctrlKey || e.metaKey)) return;

      const keyActions: Record<string, () => void> = {
        c: () => handleCopy(value),
        d: () => handleDelete(currentBookmark._id),
        e: () => setIsOpen((prev) => !prev),
      };

      const action = keyActions[e.key.toLowerCase()];
      if (action) {
        e.preventDefault();
        action();
      }
    },
    [value, currentBookmark, handleCopy, handleDelete]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  return { isOpen, setIsOpen };
};
