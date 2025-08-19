import { Button } from "../../ui/button";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useFolderStore } from "@/stores/global-state";
import {
  ChevronsUpDownIcon,
  type ChevronsUpDownIconHandle,
} from "@/components/ui/chevrons-up-down";
import { TextMorph } from "@/components/ui/text-morph";

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
      variant="ghost"
      size={"lg"}
      role="combobox"
      className="w-fit px-2"
      {...props}
    >
      <img
        className="size-6 rounded-xl"
        src={`https://avatar.vercel.sh/${activeFolder?._id}`}
        alt="folder avatar"
      />
      <TextMorph className="hidden sm:block">{activeText}</TextMorph>
      <ChevronsUpDownIcon ref={chevronsRef} className="opacity-50" />
    </Button>
  );
});

FolderSwitcherTrigger.displayName = "FolderSwitcherTrigger";
