import logo from "../../assets/logo.svg";
import FolderSwitcher from "./folder-switcher/folder-switcher";
import { ModeToggle } from "../ui/mode-toggle";
import UserDropdown from "../auth/user-dropdown";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <div className="hidden sm:block rounded-xl bg-neutral-200 dark:bg-neutral-900/40 p-1.5">
          <img className="size-5" src={logo} alt="logo" />
        </div>
        <div className="h-5 w-px bg-muted-foreground hidden sm:block" />
        <FolderSwitcher />
      </div>
      <div className="flex gap-2 items-center">
        <ModeToggle variant="ghost" />
        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
