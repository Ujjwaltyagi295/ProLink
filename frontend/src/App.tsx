import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

import DashboardPage from "./pages/dashboard";
import { setNavigate } from "./lib/navigation";
import { ProjectsPage } from "./pages/projectsPage";
import { ProjectSearch } from "./components/filters";

import SearchPage from "./pages/searchPage";
import { ProjectDetailPage } from "./pages/projectDetailPage";
import { Navbar } from "./components/navbar";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function NavbarLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> 
    </>
  );
}
function App() {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
        
    <Route element={<NavbarLayout/>}>
    <Route path="/" element={<ProjectsPage />} />
        
      <Route path="/filter" element={<ProjectSearch />} />
      <Route path="/projects/test" element={<SearchPage />} />
      <Route path="/projects/details/:id" element={<ProjectDetailPage />} />

    </Route>
    <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
  
      <Route element={<ProtectedRoutes />}>   
      <Route path="/dashboard/*" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
