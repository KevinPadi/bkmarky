import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFolders } from "@/hooks/useFolders";
import { useRef, useState } from "react";
import { FolderSwitcherTrigger } from "./folder-switcher-trigger";
import { useFolderStore } from "@/stores/global-state";
import FolderSwitcherSkeleton from "./folder-switcher-skeleton";
import FolderSwitcherError from "./folder-switcher-error";
import { AddFolderDialog } from "./add-folder-dialog";
import DeleteFolderButton from "./delete-folder-button";
import { PlusIcon, type PlusIconHandle } from "@/components/ui/plus";

const FolderSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [showAddFolderDialog, setShowAddFolderDialog] = useState(false);
  const activeFolder = useFolderStore((s) => s.activeFolder);
  const setActiveFolder = useFolderStore((s) => s.setActiveFolder);
  const { folders, isLoading, isError } = useFolders();
  const PlusIconRef = useRef<PlusIconHandle>(null);

  if (isLoading) return <FolderSwitcherSkeleton />;
  if (isError) return <FolderSwitcherError />;

  const openFolderModal = () => {
    setShowAddFolderDialog(!showAddFolderDialog);
    setOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FolderSwitcherTrigger isOpen={open} />
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command className="bg-transparent" loop>
            <CommandInput placeholder="Search folder..." className="h-9" />
            <CommandList>
              <CommandEmpty>No folders found.</CommandEmpty>
              <CommandGroup>
                {folders?.map((folder) => (
                  <CommandItem
                    className="group"
                    key={folder._id}
                    value={folder.name}
                    onSelect={(currentValue) => {
                      if (currentValue === activeFolder?.name) return;
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
                <CommandSeparator className="my-1" />
                <CommandItem
                  className="text-accent-foreground/60 data-[selected=true]:text-accent-foreground/60"
                  onSelect={() => openFolderModal()}
                  onMouseEnter={() => PlusIconRef.current?.startAnimation()}
                  onMouseLeave={() => PlusIconRef.current?.stopAnimation()}
                >
                  <div className="flex items-center justify-center size-6 rounded-full bg-muted">
                    <PlusIcon ref={PlusIconRef} />
                  </div>
                  Add new folder
                </CommandItem>
                <DeleteFolderButton />
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <AddFolderDialog
        open={showAddFolderDialog}
        onOpenChange={setShowAddFolderDialog}
      />
    </>
  );
};

export default FolderSwitcher;
