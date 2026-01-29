import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar, type AppSidebarType } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarType: AppSidebarType = "all";
  
  return (
    <SidebarProvider>
      <AppSidebar type={sidebarType} />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
