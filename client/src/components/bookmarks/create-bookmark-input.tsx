import { useFolderStore } from "@/stores/global-state";
import { useEffect, useRef } from "react";
import type { Bookmark } from "@/stores/global-state";
import { addBookmark } from "@/api/bookmarks";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Command } from "cmdk";

type PropsType = {
  value: string;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const CreateBookmarkInput = ({ value, query, setQuery }: PropsType) => {
  const { activeFolder } = useFolderStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const addNewBookmark = () => {
    if (!query.trim() || !activeFolder) return;

    let url = query.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    try {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace("www.", "");
      const title =
        domain.charAt(0).toUpperCase() + domain.slice(1).split(".")[0];

      const bookmark: Omit<Bookmark, "_id" | "createdAt"> = {
        title,
        url,
        domain,
        favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
        folderId: activeFolder?._id,
      };
      addBookmark(bookmark);
      setQuery("");
    } catch (error: unknown) {
      let errMsg = "Error adding bookmark";

      if (isAxiosError(error)) {
        errMsg = error.response?.data?.message || error.message || errMsg;
      } else if (error instanceof Error) {
        errMsg = error.message || errMsg;
      } else if (typeof error === "string") {
        errMsg = error;
      }

      toast.error(errMsg);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <Command.Input
      ref={inputRef}
      value={query}
      onValueChange={setQuery}
      className="rounded-full border border-border size-full focus:ring-[3px] focus:ring-ring/50 outline-none pl-10 pr-20 transition duration-200 bg-muted/50 dark:bg-muted/20"
      onKeyDown={(e) => {
        if (e.key === "Enter" && query.trim()) {
          if (!activeFolder) return;
          if (!value) {
            addNewBookmark();
          }
        }
      }}
    />
  );
};

export default CreateBookmarkInput;
