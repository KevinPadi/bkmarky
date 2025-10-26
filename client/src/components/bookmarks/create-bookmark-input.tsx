import { useFolderStore } from "@/stores/global-state";
import { useEffect, useRef, useState } from "react";
import type { Bookmark } from "@/stores/global-state";
import { addBookmark, fetchPageTitle } from "@/api/bookmarks";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Command } from "cmdk";
import { Loader, Plus } from "lucide-react";
import { CommandShortcut } from "../ui/command";

type PropsType = {
  value: string;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const CreateBookmarkInput = ({ value, query, setQuery }: PropsType) => {
  const { activeFolder } = useFolderStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const addNewBookmark = async () => {
    if (!query.trim() || !activeFolder) return;

    let url = query.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    try {
      setLoading(true);
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace("www.", "");

      const title =
        (await fetchPageTitle(url)) ||
        domain.charAt(0).toUpperCase() + domain.slice(1).split(".")[0];

      const bookmark: Omit<Bookmark, "_id" | "createdAt"> = {
        title,
        url,
        domain,
        favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
        folderId: activeFolder._id,
      };

      await addBookmark(bookmark);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const isSearchShortcut =
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        e.key === "/" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown";

      if (isSearchShortcut) {
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
    <div className="w-full h-10 relative">
      {loading ? (
        <Loader className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none stroke-muted-foreground animate-spin size-5" />
      ) : (
        <Plus
          strokeWidth={1}
          className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none stroke-muted-foreground size-6"
        />
      )}
      <Command.Input
        ref={inputRef}
        value={query}
        onValueChange={setQuery}
        className="rounded-lg border border-border size-full focus:ring-[3px] focus:ring-ring/50 outline-none pl-10 pr-5 lg:pr-20 transition-none bg-muted/50 dark:bg-muted/50"
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.trim()) {
            if (!activeFolder) return;
            if (!value || value === "add-item") {
              addNewBookmark();
            }
          }
        }}
      />
      <div className="absolute hidden lg:flex items-center gap-1 right-2 top-1/2 -translate-y-1/2 ">
        <CommandShortcut className="rounded">Ctrl</CommandShortcut>
        <CommandShortcut className="rounded">K</CommandShortcut>
      </div>
    </div>
  );
};

export default CreateBookmarkInput;
