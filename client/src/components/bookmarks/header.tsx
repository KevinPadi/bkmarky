import { UserButton } from "@clerk/clerk-react";
import logo from "../../assets/logo.svg";
import { shadcn } from "@clerk/themes";

const Header = () => {
  return (
    <header className="flex items-center justify-between border p-2">
      <div>
        <div className="rounded-xl bg-neutral-900 dark:bg-neutral-100 p-1.5">
          <img className="size-5" src={logo} alt="logo" />
        </div>
      </div>
      <UserButton appearance={{ baseTheme: shadcn }} />
    </header>
  );
};

export default Header;
