import { motion } from "framer-motion";
import { Button } from "../components";
import { Sparkles, Brain, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage(){

  const navigate = useNavigate();
  function handleStart(){
  const token = localStorage.getItem("token");
  console.log(token);
  
    if(token){
      navigate("/dashboard")
      return;
    }
    navigate("/signin");
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 flex flex-col pt-4">
      
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex-1 flex flex-col justify-center items-center px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-3 text-indigo-600 font-semibold text-sm mb-4"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
          Introducing  
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-800"
        >
          Your Second Brain
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 max-w-xl text-lg text-slate-600"
        >
          Capture thoughts, organize knowledge, and never forget important ideas
          again — all in one intelligent and beautiful workspace.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <Button onClick={handleStart}
          className="rounded-4xl px-6 py-3 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-md cursor-pointer hover:-translate-y-2 transition-transform duration-300">
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <Button onClick={()=>navigate("/learnmore")}
          variant="outline" className="rounded-2xl px-6 py-3 text-lg border-slate-300 cursor-pointer hover:-translate-y-2 transition-transform duration-300">
            Learn More
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          {[
            {
              icon: <Brain className="w-8 h-8 text-indigo-500 mx-auto mb-3" />,
              title: "Smart Notes",
              desc: "Capture quick notes, links, and voice memos intelligently."
            },
            {
              icon: <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-3" />,
              title: "AI Assistance",
              desc: "Use AI to summarize, search, and generate insights."
            },
            {
              icon: <ArrowRight className="w-8 h-8 text-green-500 mx-auto mb-3" />,
              title: "Effortless Sync",
              desc: "Access everything across all your devices seamlessly."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-slate-50 p-6 rounded-2xl shadow hover:shadow-lg transition-all"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-slate-100 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Second Brain. All rights reserved.
      </footer>
    </div>
  );
};