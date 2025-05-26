import { useState } from "react";
import { Button, Card } from "../components";
import { Brain } from "lucide-react";
import { PlusIcon, ShareIcon } from "../icons";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const sections = ["All", "Tweets", "YouTube", "Others"];

  return (
     <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow-sm">
        <div onClick={()=>navigate("/")}
        className="flex items-center gap-2 text-indigo-600 font-bold text-xl cursor-pointer">
          <Brain className="w-6 h-6" />
          Second Brain
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button className="rounded-full px-5"><PlusIcon/> Create Brain</Button>
          <Button variant="outline" className="rounded-full px-5">
          <ShareIcon/>  Share Brain
          </Button>
        </div>
      </nav>
            <div className=" px-10 py-10">
              <Card type="twitter"/>
            </div>
      </div>
      )
      }

export default DashboardPage;
