import { deleteFolder } from "@/api/folders";
import { Button } from "@/components/ui/button";
import { DeleteIcon, type DeleteIconHandle } from "@/components/ui/delete";
import { TextMorph } from "@/components/ui/text-morph";
import { useFolderStore } from "@/stores/global-state";
import { useState, useRef } from "react";

const DeleteFolderButton = () => {
  const [text, setText] = useState("Delete folder");
  const activeFolder = useFolderStore((s) => s.activeFolder);
  const DeleteIconRef = useRef<DeleteIconHandle>(null);
  const handleClick = () => {
    if (!activeFolder) return;
    if (text === "Delete folder") {
      setText("Confirm");
    } else {
      deleteFolder(activeFolder._id);
    }
  };

  return (
    <Button
      variant={"ghost"}
      className="size-full p-2 justify-start font-normal text-sm text-muted-foreground hover:text-accent-foreground"
      onClick={() => handleClick()}
      onMouseEnter={() => DeleteIconRef.current?.startAnimation()}
      onMouseLeave={() => DeleteIconRef.current?.stopAnimation()}
    >
      <DeleteIcon ref={DeleteIconRef} />
      <TextMorph>{text}</TextMorph>
    </Button>
  );
};

export default DeleteFolderButton;
