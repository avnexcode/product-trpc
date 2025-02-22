import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Sidebar } from "../components/sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

import { type Metadata } from "next";

export const DashboardLayoutMetadata: Metadata = {
  title: "Dashboard",
};

export const DashboardLayout = async ({
  children,
  className,
}: DashboardLayoutProps) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <Sidebar />
      <main className={cn("h-full w-full", className)}>{children}</main>
    </SidebarProvider>
  );
};
