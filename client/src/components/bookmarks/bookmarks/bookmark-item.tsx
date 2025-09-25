import { CommandItem, CommandShortcut } from "@/components/ui/command";
import {
  ArrowBigRightDash,
  Copy,
  CornerDownLeft,
  Pencil,
  Trash2,
} from "lucide-react";
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
import { memo } from "react";
import { deleteBookmark, moveBookmarkToFolder } from "@/api/bookmarks";
import { useBookmarkActions } from "@/hooks/useBookmarkActions";

type BookmarkItemProps = {
  bookmark: Bookmark;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BookmarkItem = memo(
  ({ bookmark, setIsOpen }: BookmarkItemProps) => {
    const { handleCopy } = useBookmarkActions();
    const { folders, activeFolder } = useFolderStore();

    const formatDate = (date: string) => {
      const parsedDate = new Date(date);
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
      }).format(parsedDate);
      return formattedDate;
    };

    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <CommandItem
            onSelect={(value) => window.open(value, "_blank")}
            key={bookmark.url}
            value={bookmark.url}
            className="group flex items-center justify-between my-2 data-[selected=true]:bg-input/50 dark:data-[selected=true]:bg-input/20 rounded-md border border-transparent p-2 font-medium"
          >
            <div className="flex gap-3 items-center">
              <img
                src={bookmark.favicon}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
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
              <span className="block group-data-[selected=true]:hidden text-muted-foreground">
                {formatDate(bookmark.createdAt)}
              </span>
              <CommandShortcut className="hidden group-data-[selected=true]:block text-muted-foreground p-1">
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
          <ContextMenuItem onSelect={() => setIsOpen((prev) => !prev)}>
            <Pencil />
            Rename
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
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
                    disabled={folder._id === activeFolder?._id}
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
                      className="size-5 rounded"
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
      </ContextMenu>
    );
  }
);
