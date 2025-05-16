import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage, SigninPage, SignupPage, DashBoardPage } from "./pages";

export default function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signin" element={<SigninPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/dashboard" element={<DashBoardPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}