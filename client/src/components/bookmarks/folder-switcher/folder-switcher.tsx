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
import { Separator } from "@/components/ui/separator";
import { AddFolderDialog } from "./add-folder-dialog";
import DeleteFolderButton from "./delete-folder-button";

const FolderSwitcher = () => {
  const [open, setOpen] = useState(false);
  const activeFolder = useFolderStore((s) => s.activeFolder);
  const setActiveFolder = useFolderStore((s) => s.setActiveFolder);
  const { folders, isLoading, isError } = useFolders();

  if (isLoading) return <FolderSwitcherSkeleton />;
  if (isError) return <FolderSwitcherError />;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FolderSwitcherTrigger isOpen={open} />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search folder..." className="h-9" />
          <CommandList>
            <CommandEmpty>No folders found.</CommandEmpty>
            <CommandGroup>
              {folders?.map((folder) => (
                <CommandItem
                  className="group"
                  key={folder._id}
                  value={folder._id}
                  onSelect={(currentValue) => {
                    if (currentValue === activeFolder?._id) return;
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
                  <span
                    className={cn(
                      "group-hover:opacity-80",
                      activeFolder?._id === folder._id
                        ? "opacity-100"
                        : "opacity-60"
                    )}
                  >
                    {folder.name}
                  </span>
                  <Check
                    className={cn(
                      "ml-auto",
                      activeFolder?._id === folder._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
              <Separator className="my-2" />
              <CommandItem asChild>
                <AddFolderDialog />
              </CommandItem>
              <CommandItem asChild>
                <DeleteFolderButton />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FolderSwitcher;
