import * as React from "react"
import { useLocation } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const projectsAmbient = pathname.startsWith("/projects")

  return (
    <SidebarProvider defaultOpen={true} style={{ "--sidebar-width": "20rem" } as React.CSSProperties}>
      <AppSidebar />
      <main
        className={cn(
          "relative isolate ml-[var(--sidebar-width)] h-screen flex-1 overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable]",
          "ambient-main-surface",
          projectsAmbient && "ambient-main-surface--projects"
        )}
      >
        <div
          className="ambient-motion-layer pointer-events-none absolute -right-[12%] -top-[8%] h-[min(45vh,380px)] w-[min(72vw,480px)] rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div className="relative z-0">{children}</div>
      </main>
    </SidebarProvider>
  )
}
