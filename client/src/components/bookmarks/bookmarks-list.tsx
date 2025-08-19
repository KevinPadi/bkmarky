import BookmarksSkeleton from "@/components/bookmarks/bookmarks-skeleton";
import { useBookmarks } from "@/hooks/useBookmarks";
import BookmarksError from "./bookmark-error";
import BookmarkItem from "./bookmark-item";
import { MotionEffect } from "../animate-ui/effects/motion-effect";
import { AnimatePresence } from "motion/react";

const BookmarksList = () => {
  const { bookmarks, isLoading, isError } = useBookmarks();

  if (isLoading) return <BookmarksSkeleton />;
  if (isError) return <BookmarksError />;
  return (
    <ul>
      <AnimatePresence mode="popLayout">
        {bookmarks?.map((bookmark, index) => (
          <MotionEffect
            key={bookmark._id}
            fade
            blur
            slide={{ direction: "up", offset: 25 }}
            delay={0.01 + index * 0.1}
          >
            <BookmarkItem bookmark={bookmark} />
          </MotionEffect>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default BookmarksList;
