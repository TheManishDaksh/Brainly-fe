import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage, SigninPage, SignupPage, DashBoardPage, LearnMore } from "./pages";

export default function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/learnmore" element={<LearnMore/>} />
          <Route path="/signin" element={<SigninPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/dashboard" element={<DashBoardPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}