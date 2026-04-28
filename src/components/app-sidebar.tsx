import { Home, FolderGit2, Mail, Linkedin, Github, Phone, Instagram } from "lucide-react"
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
    <Sidebar collapsible="none" className="shadow-lg fixed top-0 left-0 h-screen rounded-lg w-[19.2rem]">
      <SidebarHeader>
        <div className="flex justify-center">
          <h2 className="text-xl font-semibold">Felix's Blog</h2>
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
                        "text-base text-sidebar-foreground [&>svg]:size-5 [&>svg]:text-sidebar-foreground",
                        "data-[active=true]:bg-primary/10 data-[active=true]:text-primary",
                        "data-[active=true]:[&>svg]:text-primary data-[active=true]:font-semibold",
                        "hover:text-sidebar-accent-foreground"
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
              
              {/* Social buttons in a row */}
              <div className="flex gap-4 pt-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    size="icon"
                    className="size-11"
                    asChild
                  >
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title={social.name}
                    >
                      <social.icon className="size-5 text-white" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
