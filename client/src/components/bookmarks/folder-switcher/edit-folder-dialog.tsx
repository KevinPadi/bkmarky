import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateFolderName } from "@/api/folders";
import { useState, type FormEvent } from "react";
import { useFolderStore, type Folder } from "@/stores/global-state";

type EditorFolderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const EditFolderDialog = ({ open, onOpenChange }: EditorFolderDialogProps) => {
  const [inputValue, setInputValue] = useState("");
  const activeFolder = useFolderStore((s) => s.activeFolder);

  const renameFolder = (e: FormEvent, folder: Folder) => {
    if (activeFolder == null) return;
    e.preventDefault();
    updateFolderName({
      folderId: folder._id,
      updates: { name: inputValue },
    });
    setInputValue("");
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit folder name</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => activeFolder && renameFolder(e, activeFolder)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Folder name</FieldLabel>
                <Input
                  minLength={1}
                  maxLength={100}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  id="name"
                  type="text"
                  placeholder={activeFolder?.name}
                  required
                />
              </Field>
              <Field orientation="horizontal">
                <Button type="submit">Save</Button>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditFolderDialog;
