import { toast } from "sonner";
import { Button } from "../../ui/button";
import { ChevronsUpDown } from "lucide-react";

const FolderSwitcherError = () => {
  toast.error("Error fetching folders");
  return (
    <Button
      variant={"outline"}
      size={"lg"}
      disabled
      className="flex gap-2 items-center text-muted-foreground"
    >
      <div className="size-6 rounded-full bg-muted-foreground/30" />
      Error fetching folders
      <ChevronsUpDown className="opacity-50" />
    </Button>
  );
};

export default FolderSwitcherError;
