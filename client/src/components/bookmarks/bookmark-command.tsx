import { useBookmarks } from "@/hooks/useBookmarks";
import { Command } from "cmdk";
import {
  ArrowBigRightDash,
  Copy,
  CornerDownLeft,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { CommandItem, CommandShortcut } from "../ui/command";
import CreateBookmarkInput from "./create-bookmark-input";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { useFolderStore, type Bookmark } from "@/stores/global-state";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "sonner";
import {
  deleteBookmark,
  moveBookmarkToFolder,
  updateBookmark,
} from "@/api/bookmarks";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

export const BookmarkCommand = () => {
  const { bookmarks } = useBookmarks();
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopy = useCallback(
    (text: string) => {
      copyToClipboard(text);
      toast.success("Link copied to clipboard");
    },
    [copyToClipboard]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        if (value) {
          handleCopy(value);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        if (value) {
          const bookmark = bookmarks.find((i) => i.url === value);
          if (!bookmark) return;
          deleteBookmark(bookmark._id);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        if (value) {
          const bookmark = bookmarks.find((i) => i.url === value);
          if (!bookmark) return;
          setEditingId(bookmark?._id);
        }
      }
    };
    document.addEventListener("keydown", down);
    console.log(value);
    return () => document.removeEventListener("keydown", down);
  }, [value]);

  return (
    <Command value={value} onValueChange={setValue} loop className="space-y-5">
      <div className="w-full h-10 relative">
        <Plus
          strokeWidth={1}
          className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none"
        />
        <CreateBookmarkInput value={value} query={query} setQuery={setQuery} />
        <div className="absolute hidden lg:flex items-center gap-1 right-2 top-1/2 -translate-y-1/2">
          <CommandShortcut className="rounded-full">Ctrl</CommandShortcut>
          <CommandShortcut className="rounded-full">K</CommandShortcut>
        </div>
      </div>
      <Command.List>
        <Command.Empty className="p-2 text-muted-foreground text-sm">
          <div className="flex gap-2 items-center">
            <Plus strokeWidth={1.5} className="size-5" />
            <span>Add {query}</span>
          </div>
        </Command.Empty>

        <Command.Group>
          {bookmarks.map((item) => (
            <BookmarkItem
              bookmark={item}
              setValue={setValue}
              editingId={editingId}
              setEditingId={setEditingId}
            />
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  );
};

type BookmarkItemProps = {
  bookmark: Bookmark;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  editingId: string | null;
  setEditingId: React.Dispatch<React.SetStateAction<string | null>>;
};

const BookmarkItem = ({
  bookmark,
  setValue,
  editingId,
  setEditingId,
}: BookmarkItemProps) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const folders = useFolderStore((state) => state.folders);
  const updateBookmarkTitle = useFolderStore(
    (state) => state.updateBookmarkTitle
  );
  const [inputValue, setInputValue] = useState(bookmark.title);
  const handleCopy = (text: string) => {
    copyToClipboard(text);
    toast.success("Link copied to clipboard");
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
    }).format(parsedDate);
    return formattedDate;
  };

  const openModal = () => {
    setEditingId(bookmark._id);
    setValue("");
  };

  const renameBookmark = async (e: FormEvent) => {
    e.preventDefault();
    setEditingId(null);
    const updated = await updateBookmark({
      bookmarkId: bookmark._id,
      updates: { title: inputValue },
    });

    updateBookmarkTitle(updated);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <CommandItem
          onSelect={(value) => window.open(value, "_blank")}
          key={bookmark.url}
          value={bookmark.url}
          className="group flex items-center justify-between my-2 data-[selected=true]:border-input data-[selected=true]:bg-input/50 dark:data-[selected=true]:bg-input/20 h-9 rounded-md border border-transparent !px-3 font-medium"
        >
          <div className="flex gap-3 items-center">
            <img
              src={bookmark.favicon}
              alt="Bookmark favicon"
              className="size-6"
            />
            <div className="flex gap-2 items-center">
              <span>{bookmark.title}</span>
              <span className="text-sm text-muted-foreground">
                {bookmark.domain}
              </span>
            </div>
          </div>
          <div>
            <span className="block group-data-[selected=true]:hidden text-muted-foreground transition">
              {formatDate(bookmark.createdAt)}
            </span>
            <CommandShortcut className="hidden group-data-[selected=true]:block text-muted-foreground p-1 transition">
              <CornerDownLeft className="size-3" />
            </CommandShortcut>
          </div>
        </CommandItem>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem onSelect={() => handleCopy(bookmark.url)}>
          <Copy />
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => openModal()}>
          <Pencil />
          Rename
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger disabled={folders.length === 0}>
            <ArrowBigRightDash className="mr-2 text-muted-foreground" />
            Move to
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-44">
            {folders.length > 0 &&
              folders.map((folder) => (
                <ContextMenuItem
                  onSelect={() =>
                    moveBookmarkToFolder({
                      bookmarkId: bookmark._id,
                      newFolderId: folder._id,
                    })
                  }
                  className="flex items-center gap-2"
                  key={folder._id}
                >
                  <img
                    className="size-4 rounded-full"
                    src={`https://avatar.vercel.sh/${folder._id}`}
                    alt="folder avatar"
                  />
                  {folder.name}
                </ContextMenuItem>
              ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem
          onSelect={() => deleteBookmark(bookmark._id)}
          variant="destructive"
        >
          <Trash2 />
          Delete
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>

      <Dialog
        open={editingId === bookmark._id}
        onOpenChange={() => setEditingId(null)}
      >
        <DialogContent>
          <form onSubmit={(e) => renameBookmark(e)}>
            <DialogHeader>
              <DialogTitle>Rename bookmark</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={!inputValue.trim()}>
                Rename
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </ContextMenu>
  );
};
