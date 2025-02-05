import "../globals.css";

import Sidebar from "@/components/ui/sidebar-admin";
import Header from "@/components/ui/header";
import { AdminPetsViewModeProvider } from "@/contexts/AdminPetsViewModeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col ml-80 w-full py-10">
        <Header />
        <AdminPetsViewModeProvider>{children}</AdminPetsViewModeProvider>
      </div>
    </div>
  );
}
