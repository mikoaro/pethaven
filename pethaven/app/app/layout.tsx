"use client";

import Banner from "@/components/banner";
import ConsoleHeader from "@/components/console-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSideBarViewMode } from "@/contexts/SideBarViewModeContext";
import { AdoptionApplicationProvider } from "@/contexts/AdoptionApplicationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sideBarViewMode } = useSideBarViewMode();

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />
      <ConsoleHeader />

      <SidebarProvider>
        {sideBarViewMode ? <AppSidebar className="" /> : <></>}
        <AdoptionApplicationProvider>{children}</AdoptionApplicationProvider>
      </SidebarProvider>
    </div>
  );
}
