import type { Bookmark } from "@/stores/global-state";

type BookmarkItemProps = {
  bookmark: Bookmark;
};

const BookmarkItem = ({ bookmark }: BookmarkItemProps) => {
  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "short",
    }).format(parsedDate);
    return formattedDate;
  };

  return (
    <li
      key={bookmark._id}
      className="my-2 p-3 relative h-14 flex items-center justify-between hover:bg-muted dark:hover:bg-muted/50 rounded-lg transition"
    >
      <a
        className="inset-0 absolute top-0"
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
      />
      <div className="flex gap-3 items-center">
        <img src={bookmark.favicon} alt="Bookmark favicon" className="size-6" />
        <div className="flex gap-2 items-center">
          <span>{bookmark.title}</span>
          <span className="text-sm text-muted-foreground">
            {bookmark.domain}
          </span>
        </div>
      </div>
      <div>
        <span className="text-muted-foreground">
          {formatDate(bookmark.createdAt)}
        </span>
      </div>
    </li>
  );
};

export default BookmarkItem;
