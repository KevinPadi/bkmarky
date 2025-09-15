import { useBookmarks } from "@/hooks/useBookmarks";
import { Command } from "cmdk";
import { Plus } from "lucide-react";
import { CommandItem, CommandShortcut } from "../ui/command";
import CreateBookmarkInput from "./create-bookmark-input";
import { useState } from "react";

export const BookmarkCommand = () => {
  const { bookmarks } = useBookmarks();

  const [query, setQuery] = useState("");
  const [value, setValue] = useState("");

  return (
    <Command
      value={value}
      onValueChange={setValue}
      loop
      className="space-y-5"
      onSubmit={(value) => console.log(value)}
    >
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
        <Command.Empty className="p-2 relative flex items-center justify-between rounded-lg transition text-muted-foreground text-sm">
          <div>
            <div className="flex gap-3 items-center">
              <div>
                <Plus strokeWidth={1.5} className="size-5" />
              </div>
              <div className="flex gap-1 items-center">
                <span>Add</span>
                <span className="text-accent-foreground">{query}</span>
              </div>
            </div>
            <div>
              <span className="text-muted-foreground"></span>
            </div>
          </div>
        </Command.Empty>

        <Command.Group>
          {bookmarks.map((item) => (
            <CommandItem
              key={item._id}
              value={item.url}
              onSelect={(value) => window.open(value, "_blank")}
              className="p-2 relative flex items-center justify-between hover:bg-muted dark:hover:bg-muted/50 rounded-lg transition"
            >
              <div key={item._id}>
                <a
                  className="inset-0 absolute top-0"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <div className="flex gap-3 items-center">
                  <img
                    src={item.favicon}
                    alt="Bookmark favicon"
                    className="size-6"
                  />
                  <div className="flex gap-2 items-center">
                    <span>{item.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.domain}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground"></span>
                </div>
              </div>{" "}
            </CommandItem>
          ))}
        </Command.Group>
      </Command.List>
    </Command>
  );
};
