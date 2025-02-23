import Link from "next/link";
import { ThemeToggle } from "../actions";
import { Heading } from "../ui/heading";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 py-3">
      <div className="flex items-center gap-5">
        <SidebarTrigger />
        <Link href={"/"}>
          <Heading size={"h3"}>Disorganized</Heading>
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ThemeToggle />
      </div>
    </header>
  );
};
