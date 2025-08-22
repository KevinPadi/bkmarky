import { toast } from "sonner";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const BookmarksError = () => {
  toast.error("Error fetching bookmarks");
  return (
    <Button
      variant={"outline"}
      disabled
      className="flex gap-2 items-center text-muted-foreground"
    >
      <div className="size-6 rounded-full bg-muted-foreground/30" />
      Error fetching bookmarks
      <ChevronsUpDown className="opacity-50" />
    </Button>
  );
};

export default BookmarksError;
