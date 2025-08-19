import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router";

const Home = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-10 pt-40">
        <h1 className="text-6xl text-center text-balance">
          Bkmarky: Minimalist bookmark manager
        </h1>
        <div>
          <SignedIn>
            <Link to={"/bookmarks"}>
              <RippleButton>Go to my Bookmarks</RippleButton>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link to={"/login"}>
              <RippleButton>Get started</RippleButton>
            </Link>
          </SignedOut>
        </div>
      </div>
    </section>
  );
};

export default Home;
