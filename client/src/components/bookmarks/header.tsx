import { UserButton } from "@clerk/clerk-react";
import logo from "../../assets/logo.svg";
import { shadcn } from "@clerk/themes";
import FolderSwitcher from "./folder-switcher/folder-switcher";
import { ModeToggle } from "../ui/mode-toggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        <div className="hidden sm:block rounded-xl bg-neutral-200 dark:bg-neutral-900/40 p-1.5">
          <img className="size-5" src={logo} alt="logo" />
        </div>
        <FolderSwitcher />
      </div>
      <div className="flex gap-2 items-center">
        <ModeToggle />
        <UserButton showName appearance={{ baseTheme: shadcn }} />
      </div>
    </header>
  );
};

export default Header;
