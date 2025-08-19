import { Skeleton } from "../ui/skeleton";

const BookmarksSkeleton = () => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 6 }).map((_, index) => (
        // <Skeleton key={index} className="h-14 w-full my-2" />
        <div
          key={index}
          className="h-14 w-full my-2 p-3 flex items-center justify-between"
        >
          <div className="w-1/3 flex items-center gap-3">
            <Skeleton className="size-7 aspect-square" />
            <Skeleton className="h-5 w-full rounded" />
          </div>
          <Skeleton className="h-5 w-10" />
        </div>
      ))}
    </div>
  );
};

export default BookmarksSkeleton;
