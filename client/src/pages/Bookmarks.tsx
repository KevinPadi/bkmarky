import { BookmarkCommand } from "@/components/bookmarks/bookmark-command";
import Header from "@/components/bookmarks/header";

const Bookmarks = () => {
  return (
    <section>
      <Header />
      <div className="max-w-3xl flex flex-col mx-auto mt-24 px-5">
        <BookmarkCommand />
      </div>
    </section>
  );
};

export default Bookmarks;
