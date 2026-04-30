import * as React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true} style={{ "--sidebar-width": "20rem" } as React.CSSProperties}>
      <AppSidebar />
      <main className="relative ml-[var(--sidebar-width)] h-screen flex-1 overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable]">
        {children}
      </main>
    </SidebarProvider>
  )
}
