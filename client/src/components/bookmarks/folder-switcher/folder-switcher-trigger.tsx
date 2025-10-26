import { Button } from "../../ui/button";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useFolderStore } from "@/stores/global-state";
import {
  ChevronsUpDownIcon,
  type ChevronsUpDownIconHandle,
} from "@/components/ui/chevrons-up-down";
import { TextMorph } from "@/components/ui/text-morph";
import { PlusIcon } from "lucide-react";

type FolderSwitcherTriggerProps = React.ComponentProps<typeof Button> & {
  isOpen?: boolean;
};

export const FolderSwitcherTrigger = forwardRef<
  HTMLButtonElement,
  FolderSwitcherTriggerProps
>(({ isOpen, ...props }, ref) => {
  const activeFolder = useFolderStore((s) => s.activeFolder);
  const chevronsRef = useRef<ChevronsUpDownIconHandle>(null);
  const [activeText, setActiveText] = useState("");

  useEffect(() => {
    if (!chevronsRef.current) return;
    if (isOpen) {
      chevronsRef.current.startAnimation();
    } else {
      chevronsRef.current.stopAnimation();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!activeFolder) return;
    setActiveText(activeFolder?.name);
  }, [activeFolder]);

  return (
    <Button
      ref={ref}
      variant="outline"
      role="combobox"
      className="w-fit p-1.5 data-[state=open]:bg-accent dark:data-[state=open]:bg-accent/50 rounded-[10px] transition-none"
      {...props}
    >
      {!activeFolder ? (
        <>
          <div className="size-7 bg-muted rounded-full flex items-center justify-center">
            <PlusIcon />
          </div>
          <p>Add folder</p>
        </>
      ) : (
        <>
          <img
            className="size-full rounded"
            src={`https://avatar.vercel.sh/${activeFolder?._id}`}
            alt="folder avatar"
          />
          <TextMorph className="hidden sm:block">{activeText}</TextMorph>
        </>
      )}
      <ChevronsUpDownIcon ref={chevronsRef} className="opacity-50" />
    </Button>
  );
});

FolderSwitcherTrigger.displayName = "FolderSwitcherTrigger";
