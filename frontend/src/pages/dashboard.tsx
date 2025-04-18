import { Outlet, Route, Routes } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { SearchForm } from "@/components/search-form";
import { ProjectsPage } from "./projectsPage";
import { MyProjectsPage } from "./myProjectsPage";
import ProjectFormPage from "./projectFormPage";


function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        <SearchForm/>
        </header>
        <div className="flex flex-1 flex-col p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}




export default function DashboardPage() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index path="projects/find" element={<ProjectsPage />} />
        <Route path="projects" element={<MyProjectsPage/>}/>
       
        <Route path="projects/edit/:id" element={<ProjectFormPage/>}/>
      </Route>
    </Routes>
  );
}