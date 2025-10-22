import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/context/AuthContext";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import "../globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Dashboard",
  description: "JoinmeetupBD Dashboard",
};

export default async function AdminLayout({ children }) {

  return (
    <AuthProvider>
      {" "}
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <Toaster position="top-right" />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}
