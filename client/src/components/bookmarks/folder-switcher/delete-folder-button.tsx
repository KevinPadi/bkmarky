import { deleteFolder } from "@/api/folders";
import { DeleteIcon, type DeleteIconHandle } from "@/components/ui/delete";
import { TextMorph } from "@/components/ui/text-morph";
import { CommandItem } from "@/components/ui/command";
import { useFolderStore } from "@/stores/global-state";
import { useState, useRef } from "react";

const DeleteFolderButton = () => {
  const [text, setText] = useState("Delete folder");
  const activeFolder = useFolderStore((s) => s.activeFolder);
  const DeleteIconRef = useRef<DeleteIconHandle>(null);

  const handleDeleteFolder = () => {
    if (!activeFolder) return;
    if (text === "Delete folder") {
      setText("Confirm");
    } else {
      deleteFolder(activeFolder._id);
      setText("Delete folder");
    }
  };

  return (
    <CommandItem
      disabled={!activeFolder}
      value="delete-folder"
      className="px-2 py-1.5 justify-start font-normal text-sm text-muted-foreground dark:hover:text-muted-foreground data-[selected=true]:text-muted-foreground dark:data-[selected=true]:text-muted-foreground group"
      onSelect={handleDeleteFolder}
      onMouseEnter={() => DeleteIconRef.current?.startAnimation()}
      onMouseLeave={() => DeleteIconRef.current?.stopAnimation()}
    >
      <div className="size-6 bg-muted rounded flex items-center justify-center dark:group-data-[selected=true]:bg-neutral-900 group-data-[selected=true]:bg-neutral-50">
        <DeleteIcon ref={DeleteIconRef} />
      </div>
      <TextMorph>{text}</TextMorph>
    </CommandItem>
  );
};

export default DeleteFolderButton;
