import { Link } from "react-router-dom";
import MenuHover from "./navbar-menu";



export const Navbar = () => {
  const menu = [
    
    {
      title: "Projects",
      submenu: [
        {
          subTitle: "Explore Projects",
          path: "/dashboard/projects/find",
          description: "Access and manage your projects",
        },
        {
          subTitle: "My Project",
          path: "/dashboard/projects",
          description: "Start building something new",
        },
      ],
    },
    {
      title: "Workspace",
      submenu: [
        {
          subTitle: "Team Dashboard",
          path: "/teams/:teamId/workspace",
          description: "Collaborate with your team",
        },
        {
          subTitle: "Project Board",
          path: "/projects/:projectId/board",
          description: "Track progress and tasks",
        },
      ],
    },
    {
      title: "About",
      submenu: [],
    },
  ];
  
  return (
    <header className="fixed top-0 z-50 h-16 w-full shrink-0 border-b border-b-neutral-200 bg-white px-4 sm:px-10">
      <div className="mx-auto flex h-full items-center justify-between max-w-[90rem]">
        <Link to="/" className="flex flex-row items-center">
          <h1 className="text-2xl font-Nunito font-bold font-sans">ProLink</h1>
        </Link>

        <div className="font-semibold flex-1 flex justify-center items-center gap-6 max-sm:hidden">
          {menu.map((menu) => (
           <MenuHover key={menu.title} menu={menu}/>
          ))}
        </div>

        <div className="flex items-center max-sm:absolute max-sm:right-4">
         <Link to="/login">
         <button className="ease-in-out transition-transform hover:scale-102 font-semibold cursor-pointer bg-neutral-200 text-black mr-2 border p-2 px-5 rounded-lg">
            Sign in
          </button>
         </Link>
        <Link to="/signup">
        <button className="bg-black ease-in-out   transition-transform hover:scale-102 font-semibold cursor-pointer text-white p-2 px-5 rounded-lg">
            Get Started
          </button>
        </Link>
        </div>
      </div>
    </header>
  );
};


  {/* <div className="relative rounded-full p-1.5 text-neutral-600 outline-none transition-colors duration-200 hover:bg-neutral-100 max-sm:hidden">
                    <Bell className=""/>
                    <span className="absolute top-1 right-2 size-2 rounded-full bg-destructive-500"></span>
                </div> */}