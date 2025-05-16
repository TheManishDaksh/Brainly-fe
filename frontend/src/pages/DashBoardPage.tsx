import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components";
import { Brain, XIcon, Youtube, Globe, Menu, X } from "lucide-react";

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
        <div className="md:hidden">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Button className="rounded-full px-5">Create Brain</Button>
          <Button variant="outline" className="rounded-full px-5">
            Share Brain
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen || window.innerWidth >= 768 ? 0 : -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white w-64 p-4 border-r hidden md:block md:relative md:translate-x-0 absolute z-40 h-full md:h-auto"
        >
          <h3 className="text-slate-800 font-bold mb-4">Sections</h3>
          <div className="space-y-2">
            {sections.map((section) => (
              <SidebarItem
                key={section}
                label={section}
                isActive={activeSection === section}
                onClick={() => {
                  setActiveSection(section);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                icon={
                  section === "All" ? (
                    <Globe className="w-5 h-5" />
                  ) : section === "Tweets" ? (
                    <XIcon className="w-5 h-5 text-sky-500" />
                  ) : section === "YouTube" ? (
                    <Youtube className="w-5 h-5 text-red-500" />
                  ) : (
                    <Brain className="w-5 h-5 text-indigo-500" />
                  )
                }
              />
            ))}
          </div>
        </motion.aside>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold text-slate-800 mb-4"
          >
            {activeSection}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow p-4"
              >
                <h3 className="text-lg font-semibold mb-2 text-slate-700">
                  {activeSection} Entry #{i + 1}
                </h3>
                <p className="text-sm text-slate-500">
                  This is a sample brain note from the {activeSection} section.
                </p>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
