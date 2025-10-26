import { updateBookmark } from "@/api/bookmarks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useFolderStore, type Bookmark } from "@/stores/global-state";
import { useEffect, useState, type FormEvent } from "react";

type BookmarkEditModalProps = {
  bookmark: Bookmark | undefined;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookmarkEditModal = ({
  isOpen,
  setIsOpen,
  bookmark,
}: BookmarkEditModalProps) => {
  const { updateBookmarkTitle } = useFolderStore();
  const [inputValue, setInputValue] = useState(bookmark?.title);

  const renameBookmark = async (e: FormEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    if (!bookmark) return;
    const updated = await updateBookmark({
      bookmarkId: bookmark._id,
      updates: { title: inputValue },
    });
    updateBookmarkTitle(updated);
    setInputValue("");
  };

  useEffect(() => {
    setInputValue(bookmark?.title ?? "");
  }, [bookmark]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent>
        <form onSubmit={(e) => renameBookmark(e)}>
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={inputValue === undefined ? false : !inputValue.trim()}
            >
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookmarkEditModal;
