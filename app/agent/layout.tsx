import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Header } from "@/components/layout/Header";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* TODO: Change to "agent" type when development is complete */}
      <AppSidebar type="all" />
      <SidebarInset>
        <Header />
        <main className="flex-1 overflow-auto bg-background p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
