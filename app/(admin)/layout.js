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
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token")?.value;

  // if (!token) {
  //   redirect("/login");
  // }

  // let data;

  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/auth/me`, {
  //     method: "GET",
  //     headers: {
  //       Cookie: `token=${token}`,
  //     },
  //     cache: "no-store",
  //   });

  //   // if response is not OK, throw error manually
  //   if (!res.ok) {
  //     redirect("/login");
  //   }

  //   data = await res.json();
  // } catch (err) {
  //   redirect("/login");
  // }

  // if (!data?.success) {
  //   redirect("/login");
  // }

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
