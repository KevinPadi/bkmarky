import BookmarksList from "@/components/bookmarks/bookmarks/bookmarks-list";
import CreateBookmarkInput from "@/components/bookmarks/create-bookmark-input";
import Header from "@/components/bookmarks/header";
import { useFolderStore } from "@/stores/global-state";

const Bookmarks = () => {
  const folders = useFolderStore((state) => state.folders);
  return (
    <section>
      <Header />
      <div className="max-w-3xl flex flex-col mx-auto mt-24 px-5">
        <CreateBookmarkInput />
        <div className="flex flex-col mt-10">
          {folders.length > 0 && (
            <div className="flex items-center justify-between border-b p-3 border-muted text-muted-foreground">
              <span>Title</span>
              <span>Created at</span>
            </div>
          )}
          <BookmarksList />
        </div>
      </div>
    </section>
  );
};

export default Bookmarks;
