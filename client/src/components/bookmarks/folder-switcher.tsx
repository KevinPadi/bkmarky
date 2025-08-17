import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFolders } from "@/hooks/useFolders";
import { useState } from "react";
import { FolderSwitcherTrigger } from "./folder-switcher-trigger";
import { useFolderStore } from "@/stores/global-state";
import FolderSwitcherSkeleton from "./folder-switcher-skeleton";
import FolderSwitcherError from "./folder-switcher-error";

const FolderSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const setActiveFolder = useFolderStore((s) => s.setActiveFolder);
  const { folders, isLoading, isError } = useFolders();

  if (isLoading) return <FolderSwitcherSkeleton />;
  if (isError) return <FolderSwitcherError />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FolderSwitcherTrigger />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search folder..." className="h-9" />
          <CommandList>
            <CommandEmpty>No folders found.</CommandEmpty>
            <CommandGroup>
              {folders?.map((folder) => (
                <CommandItem
                  key={folder._id}
                  value={folder._id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setActiveFolder(folder);
                    setOpen(false);
                  }}
                >
                  {" "}
                  <img
                    className="size-6 rounded-xl"
                    src={`https://avatar.vercel.sh/${folder._id}`}
                    alt="folder avatar"
                  />
                  {folder.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === folder._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FolderSwitcher;
