import { useFolderStore, type Bookmark } from "@/stores/global-state";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { ArrowBigRightDash, Copy, Pencil, Trash2 } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { toast } from "sonner";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  updateBookmark,
  moveBookmarkToFolder,
  deleteBookmark,
} from "@/api/bookmarks";
import { CommandItem } from "cmdk";

type BookmarkItemProps = {
  bookmark: Bookmark;
};

const BookmarkItem = ({ bookmark }: BookmarkItemProps) => {
  const folders = useFolderStore((state) => state.folders);
  const updateBookmarkTitle = useFolderStore(
    (state) => state.updateBookmarkTitle
  );
  const [, copyToClipboard] = useCopyToClipboard();
  const [isEditing, setIsEditing] = useState(false);
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

  const renameBookmark = async (e: FormEvent) => {
    e.preventDefault();

    const updated = await updateBookmark({
      bookmarkId: bookmark._id,
      updates: { title: inputValue },
    });

    updateBookmarkTitle(updated);

    setIsEditing(false);
  };

  return (
    <CommandItem>
      <ContextMenu>
        <ContextMenuTrigger>
          <li
            key={bookmark._id}
            className="my-2 p-3 relative h-14 flex items-center justify-between hover:bg-muted dark:hover:bg-muted/50 rounded-lg transition"
          >
            <a
              className="inset-0 absolute top-0"
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
            />
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
              <span className="text-muted-foreground">
                {formatDate(bookmark.createdAt)}
              </span>
            </div>
          </li>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem onSelect={() => handleCopy(bookmark.url)}>
            <Copy />
            Copy
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => setIsEditing(!isEditing)}>
            <Pencil />
            Rename
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
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <form onSubmit={(e) => renameBookmark(e)}>
            <DialogHeader>
              <DialogTitle>Rename bookmark</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus={true}
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
    </CommandItem>
  );
};

export default BookmarkItem;
