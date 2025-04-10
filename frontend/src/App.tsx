import {  Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import SignupPage from "./pages/signup"
import { HomePage } from "./pages/home"


function App() {

  return (
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
   </Routes>
  )
}

export default App
