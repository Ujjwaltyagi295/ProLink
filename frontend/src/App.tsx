import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import { HomePage } from "./pages/home";
import DashboardPage from "./pages/dashboard";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { setNavigate } from "./lib/navigation";

function App() {
  const navigate = useNavigate();
  setNavigate(navigate);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard/*" element={<DashboardPage />} />
       
      </Route>
    </Routes>
  );
}

export default App;
