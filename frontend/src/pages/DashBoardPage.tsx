import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Card } from "../components";
import { Brain, XIcon, Youtube, Globe } from "lucide-react";
import PlusIcon from "../icons/PlusIcon";

const SidebarItem = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
      isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-100"
    }`}
  >
    {icon}
    {label}
  </div>
);

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = ["All", "Tweets", "YouTube", "Others"];

  return (
     <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
          <Brain className="w-6 h-6" />
          Second Brain
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button className="rounded-full px-5"><PlusIcon/> Create Brain</Button>
          <Button variant="outline" className="rounded-full px-5">
            Share Brain
          </Button>
        </div>
      </nav>
            <Card type="twitter"/>
      </div>
      )
      }

export default DashboardPage;
