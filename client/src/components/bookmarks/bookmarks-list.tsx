import BookmarksSkeleton from "@/components/bookmarks/bookmarks-skeleton";
import { useBookmarks } from "@/hooks/useBookmarks";
import BookmarksError from "./bookmark-error";
import BookmarkItem from "./bookmark-item";

const BookmarksList = () => {
  const { bookmarks, isLoading, isError } = useBookmarks();

  if (isLoading) return <BookmarksSkeleton />;
  if (isError) return <BookmarksError />;
  return (
    <ul>
      {bookmarks?.map((bookmark) => (
        <BookmarkItem bookmark={bookmark} />
      ))}
    </ul>
  );
};

export default BookmarksList;
