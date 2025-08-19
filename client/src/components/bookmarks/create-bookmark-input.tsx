import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { PlusIcon } from "lucide-react";
import { type Bookmark } from "@/stores/global-state";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { addBookmark } from "@/api/bookmarks";
import { useFolderStore } from "@/stores/global-state";

const CreateBookmarkInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newBookmark, setNewBookmark] = useState("");
  const activeFolder = useFolderStore((state) => state.activeFolder);

  const addNewBookmark = () => {
    if (!newBookmark.trim() || !activeFolder) return;

    let url = newBookmark.trim();
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
      setNewBookmark("");
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
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addNewBookmark();
        setNewBookmark("");
      }}
      className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2"
    >
      <PlusIcon size={26} strokeWidth={1.5} className="text-muted-foreground" />
      <Input
        required
        value={newBookmark}
        onChange={(e) => setNewBookmark(e.target.value)}
        type="text"
        autoFocus
        ref={inputRef}
        placeholder="Type your bookmark here..."
        className="border-0 focus-visible:ring-0 bg-transparent
         dark:bg-transparent h-12"
      />
      <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-6 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
        <span className="text-xs pt-1">⌘</span>J
      </kbd>{" "}
    </form>
  );
};

export default CreateBookmarkInput;
