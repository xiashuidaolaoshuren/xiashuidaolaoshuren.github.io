import { Home, FolderGit2, Mail, Linkedin, Github, Phone, Instagram, Download } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"

// Menu items.
const items = [
  {
    title: "About Me",
    url: "/",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderGit2,
  },
]

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/chun-ning-so-794375379",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/mouseman_0919",
    icon: Instagram,
  },
  {
    name: "GitHub",
    url: "https://github.com/xiashuidaolaoshuren",
    icon: Github,
  },
]

function isNavItemActive(pathname: string, url: string) {
  if (url === "/") return pathname === "/"
  return pathname === url || pathname.startsWith(`${url}/`)
}

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar
      collapsible="none"
      className="sidebar-ambient fixed left-0 top-0 h-screen w-[19.2rem] rounded-lg border-r border-sidebar-border/80 shadow-lg"
    >
      <SidebarHeader className="sidebar-header-identity border-b border-sidebar-border/70 px-4 pb-4 pt-5">
        <div className="flex flex-col items-center gap-0.5 text-center">
          <h2 className="text-lg font-semibold tracking-tight text-sidebar-foreground">Felix So</h2>
          <p className="text-xs leading-snug text-muted-foreground">AI Student · CUHK</p>
        </div>
      </SidebarHeader>

      {/* Avatar Section */}
      <div className="flex justify-center py-4">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-border shadow-md">
          <img 
            src="/images/avatar.png" 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="pl-[calc(0.5rem+1rem+0.5rem)] text-sm">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isNavItemActive(location.pathname, item.url)
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      className={cn(
                        "rounded-md border-l-2 border-transparent pl-[calc(0.5rem-1px)] text-base text-sidebar-foreground transition-[border-color,background-color,box-shadow,color] duration-200 [&>svg]:size-5 [&>svg]:text-sidebar-foreground",
                        "hover:border-primary/15 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground",
                        "data-[active=true]:border-primary data-[active=true]:bg-primary/12 data-[active=true]:text-primary data-[active=true]:shadow-sm",
                        "data-[active=true]:[&>svg]:text-primary data-[active=true]:font-semibold"
                      )}
                    >
                      <NavLink to={item.url} end={item.url === "/"}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="pl-[calc(0.5rem+1rem+0.5rem)] text-sm">Contact Me</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-4">
              {/* Email as text */}
              <div className="flex items-center gap-2 text-base">
                <Mail className="size-5" />
                <span className="text-muted-foreground text-[15px]">1155192846@link.cuhk.edu.hk</span>
              </div>
              
              {/* Phone as text */}
              <div className="flex items-center gap-2 text-base">
                <Phone className="size-5" />
                <span className="text-muted-foreground text-[15px]">+852 66710279</span>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-2 border-primary/25 bg-primary/10 text-primary shadow-sm hover:border-primary/40 hover:bg-primary/20 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" download>
                  <Download className="size-5 shrink-0" aria-hidden />
                  Download CV
                </a>
              </Button>
              
              {/* Social buttons in a row */}
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="size-11 shrink-0 border-primary/25 bg-primary/10 text-primary shadow-sm hover:border-primary/40 hover:bg-primary/20 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                    asChild
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                    >
                      <social.icon className="size-5" aria-hidden />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
