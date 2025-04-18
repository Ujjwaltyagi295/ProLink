import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogoutQuery } from "@/queryOptions/authQuery";

interface SubmenuItem {
  subTitle: string;
  path: string;
  description?: string; // Optional description
}

interface MenuItem {
  title: string;
  submenu: SubmenuItem[];
}

export const MenuHover = ({ menu }: { menu: MenuItem }) => {
  const [isHover, setIsHover] = useState(false);
  const hasSubMenu = menu?.submenu?.length > 0;

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative"
    >
      <button className="group font-sans  cursor-pointer inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-neutral-100">
        {menu.title}
        {hasSubMenu ? (
          <motion.svg
            initial={{ rotate: 0 }}
            animate={{ rotate: isHover ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-down"
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        ) : (
          ""
        )}
      </button>

      <AnimatePresence>
        {isHover && hasSubMenu && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-2 bg-white rounded-xl shadow-md p-4 min-w-[250px] max-w-xl"
          >
            <div className="flex flex-col gap-3">
              {menu.submenu.map((item, index) => (
                <Link key={index} to={item.path}>
                  <div className="flex flex-col hover:bg-gray-100 rounded-md p-2 cursor-pointer transition">
                    <span className="text-sm font-medium text-gray-800">
                      {item.subTitle}
                    </span>
                    {item.description && (
                      <span className="text-xs text-gray-500">
                        {item.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function ProfileDropdown() {
  const { mutate: signOut } = useLogoutQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="rounded-full  w-9 h-9 p-0">
          <span className="text-md font-semibold">U</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 ">
        <DropdownMenuItem>
          <User className="w-4 h-4 mr-2" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
