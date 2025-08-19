import CreateBookmarkInput from "@/components/bookmarks/create-bookmark-input";
import Header from "@/components/bookmarks/header";

const Bookmarks = () => {
  return (
    <section>
      <Header />
      <div className="max-w-4xl flex flex-col mx-auto mt-24 px-5">
        <CreateBookmarkInput />
      </div>
    </section>
  );
};

export default Bookmarks;
