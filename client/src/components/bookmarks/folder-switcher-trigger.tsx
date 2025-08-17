import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { forwardRef } from "react";

export const FolderSwitcherTrigger = forwardRef<HTMLButtonElement>(
  ({ ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="outline"
        role="combobox"
        className="w-[200px] justify-between"
        {...props}
      >
        Select Folder
        <ChevronsUpDown className="opacity-50" />
      </Button>
    );
  }
);

FolderSwitcherTrigger.displayName = "FolderSwitcherTrigger";
