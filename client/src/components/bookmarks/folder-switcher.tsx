import { Check, Loader } from "lucide-react";
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

const FolderSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { folders, isLoading, isError } = useFolders();

  if (isLoading) return <Loader className="animate-spin" />;
  if (isError) return <div>Error</div>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FolderSwitcherTrigger />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No folders found.</CommandEmpty>
            <CommandGroup>
              {folders?.map((folder) => (
                <CommandItem
                  key={folder._id}
                  value={folder._id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
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
