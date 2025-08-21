import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "../../ui/button";
import { ChevronsUpDown } from "lucide-react";

const FolderSwitcherSkeleton = () => {
  return (
    <Button
      variant={"ghost"}
      size={"lg"}
      className="flex gap-2 items-center px-2 w-fit"
    >
      <Skeleton className="size-6 rounded-full" />
      <Skeleton className="h-4 w-20" />
      <ChevronsUpDown className="opacity-50" />
    </Button>
  );
};

export default FolderSwitcherSkeleton;
