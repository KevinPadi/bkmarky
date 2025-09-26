import { useBookmarks } from "@/hooks/useBookmarks";
import { Command } from "cmdk";
import { useState, useMemo } from "react";
import { Plus } from "lucide-react";

import { CommandItem, CommandShortcut } from "../ui/command";
import CreateBookmarkInput from "./create-bookmark-input";
import BookmarkEditModal from "./bookmarks/bookmark-edit-modal";
import { BookmarkItem } from "./bookmarks/bookmark-item";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

const KEYBOARD_SHORTCUTS = [
  { key: "Ctrl", display: "Ctrl" },
  { key: "K", display: "K" },
] as const;

const AddItem = ({ query }: { query: string }) => (
  <CommandItem
    forceMount={true}
    value="add-item"
    className="group flex items-center justify-between my-2 data-[selected=true]:bg-input/50 dark:data-[selected=true]:bg-input/20 rounded-md border border-transparent p-2 font-medium"
  >
    <div className="flex gap-2 items-center">
      <Plus strokeWidth={1.5} className="size-5" />
      <span className="text-muted-foreground">Add {query}</span>
    </div>
  </CommandItem>
);

const ShortcutDisplay = () => (
  <div className="absolute hidden lg:flex items-center gap-1 right-2 top-1/2 -translate-y-1/2">
    {KEYBOARD_SHORTCUTS.map(({ key, display }) => (
      <CommandShortcut key={key} className="rounded-full">
        {display}
      </CommandShortcut>
    ))}
  </div>
);

export const BookmarkCommand = () => {
  const { bookmarks } = useBookmarks();
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");

  const currentBookmark = useMemo(
    () => bookmarks.find((bookmark) => bookmark.url === value),
    [bookmarks, value]
  );

  const { isOpen, setIsOpen } = useKeyboardShortcuts(value, currentBookmark);

  return (
    <>
      <Command
        value={value}
        onValueChange={setValue}
        loop
        className="space-y-5"
      >
        <div className="w-full h-10 relative">
          <Plus
            strokeWidth={1}
            className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none"
          />
          <CreateBookmarkInput
            value={value}
            query={query}
            setQuery={setQuery}
          />
          <ShortcutDisplay />
        </div>

        <Command.List>
          <Command.Group>
            {bookmarks.map((bookmark) => (
              <BookmarkItem
                key={bookmark._id}
                bookmark={bookmark}
                setIsOpen={setIsOpen}
              />
            ))}
          </Command.Group>
          {query && <AddItem query={query} />}
        </Command.List>
      </Command>

      {currentBookmark && (
        <BookmarkEditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          bookmark={currentBookmark}
        />
      )}
    </>
  );
};
