import { RippleButton } from "@/components/animate-ui/buttons/ripple";
import { Link } from "react-router";

const Home = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-10 pt-40 border">
        <h1 className="text-6xl text-center text-balance">
          Bkmarky: Minimalist bookmark manager
        </h1>
        <Link to={"/login"}>
          <RippleButton>Get started</RippleButton>
        </Link>
      </div>
    </section>
  );
};

export default Home;
