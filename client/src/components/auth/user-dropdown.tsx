import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../animate-ui/radix/dropdown-menu";
import { useAuthStore } from "@/stores/auth-store";
import { LogOut, UserCircle2Icon } from "lucide-react";
import { Button } from "../ui/button";

const UserDropdown = () => {
  const { user, logout } = useAuthStore();
  const fallback = user?.name.slice(0, 2);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="px-2">
          <span className="text-sm text-muted-foreground">{user?.name}</span>
          <Avatar className="size-6">
            <AvatarImage src={`https://avatar.vercel.sh/${user?._id}`} />
            <AvatarFallback className="uppercase">{fallback}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled>
          <UserCircle2Icon />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={logout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
