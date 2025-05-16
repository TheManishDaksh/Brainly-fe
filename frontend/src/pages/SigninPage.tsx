import { motion } from "framer-motion";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

export default function SigninPage(){

    const navigate = useNavigate()

    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Welcome Back
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full mt-4 text-lg rounded-xl">
            Sign In
          </Button>
        </form>
        <p className="text-sm text-center text-slate-500 mt-6">
          Don't have an account?{" "}
          <button onClick={()=> navigate("/signup")}
          className="text-indigo-600 hover:underline font-medium">
            Sign Up
          </button>
        </p>
      </motion.div>
    </div>
  );
};

