import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import { HomePage } from "./pages/home"
import DashboardPage from "./pages/dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/dashboard/*" element={<DashboardPage/>} />
      
      
    </Routes>
  )
}

export default App