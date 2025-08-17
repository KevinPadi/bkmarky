import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../ui/button";
import { forwardRef } from "react";
import { useFolderStore } from "@/stores/global-state";

export const FolderSwitcherTrigger = forwardRef<HTMLButtonElement>(
  ({ ...props }, ref) => {
    const activeFolder = useFolderStore((s) => s.activeFolder);
    return (
      <Button
        ref={ref}
        variant="outline"
        role="combobox"
        className="w-fit"
        {...props}
      >
        <img
          className="size-6 rounded-xl"
          src={`https://avatar.vercel.sh/${activeFolder?._id}`}
          alt="folder avatar"
        />
        {activeFolder?.name}
        <ChevronsUpDown className="opacity-50" />
      </Button>
    );
  }
);

FolderSwitcherTrigger.displayName = "FolderSwitcherTrigger";
