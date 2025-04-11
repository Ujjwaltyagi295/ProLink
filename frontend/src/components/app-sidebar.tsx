import * as React from "react";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import { File, GalleryVerticalEnd, BookText, PencilLine, SettingsIcon, HelpCircleIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {  ExploreIcon, ProjectIcon } from "@/assets/icons/icons";
import { motion } from "framer-motion";
import { NavUser } from "./nav-user";
import { NavSecondary } from "./nav-secondary";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Projects",
      url: "",
      items: [
        {
          title: "My Projects",
          url: "/dashboard/projects",
          icon: (hovered: boolean) => <ProjectIcon isHover={hovered} />,
        },
        {
          title: "Explore Projects",
          url: "/dashboard/projects/find",
          icon: (hovered: boolean) => <ExploreIcon isHover={hovered} />,
        },
       
       
      ],
    },
    {
      title: "Community",
      url: "",
      items: [
        {
          title: "Explore Posts",
          url: "/dashboard/community",
          icon: () => <File className="size-4 mr-2" />,
        },
        {
          title: "My Posts",
          url: "/dashboard/community/my-posts",
          icon: () => <BookText className="size-4 mr-2" />,
        },
        {
          title: "Create Post",
          url: "/dashboard/community/create",
          icon: () => <PencilLine className="size-4 mr-2" />,
        },
      ],
     
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    
  ],
};
function SidebarMenuItemWithHover({
  item,
  currentPath,
}: {
  item: {
    title: string;
    url: string;
    icon: (hover: boolean) => React.ReactNode;
  };
  currentPath: string;
}) {
  const [isHovering, setIsHovering] = React.useState(false);
  const isActive = currentPath === item.url;
  const isHover = isHovering || isActive;

  return (
    <SidebarMenuItem>
      <motion.div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <SidebarMenuButton
          asChild
          isActive={isActive}
          className="flex items-center gap-2"
        >
          <Link to={item.url} className="flex items-center gap-2">
            {item.icon?.(isHover)}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </motion.div>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-4 py-6">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-lg font-semibold tracking-tight">
              ProLink
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <div className="flex items-center gap-1 py-1 px-2">
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <span className="inline-block h-px flex-1 bg-muted" />
            </div>
            <SidebarGroupContent >
              <SidebarMenu className=" gap-2">
                {group.items.map((item) => (
                  <SidebarMenuItemWithHover
                    key={item.title}
                    item={item}
                    currentPath={location.pathname}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
        ))}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
