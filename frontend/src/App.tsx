import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import { HomePage } from "./pages/home";
import DashboardPage from "./pages/dashboard";
import { setNavigate } from "./lib/navigation";
import { ProjectsPage } from "./pages/projectsPage";
import { ProjectSearch } from "./components/filters";
import ProjectDetailPage from "./pages/projectDetailPage";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/explore"element={<ProjectsPage/>}/>
      <Route path="/filter" element={<ProjectSearch/>}/>
      <Route path="/projects/details/" element={<ProjectDetailPage/>}/>
        <Route path="/dashboard/*" element={<DashboardPage />} />
       
    </Routes>
  );
}

export default App;
