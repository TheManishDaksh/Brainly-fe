import { motion } from "framer-motion";
import { Button } from "../components";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupPage () {

  const [name, setName ] = useState<string>('');
  const [email, setEmail ] = useState<string>('');
  const [password, setPassword ] = useState<string>('');
  const navigate = useNavigate();
  
  function handleSignupForm(e:FormEvent){
    e.preventDefault();
    useEffect(()=>{
      async function main(){
        await axios.post("http://localhost:3000/signup",{
          name,
          username : email,
          password
        })
      }
      main();
      navigate("/signin")
    },[email, password])
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Create Your Account
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600">Name</label>
            <input
              type="text"
              value={name}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">Email</label>
            <input
              type="email"
              value={email}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="john@example.com"
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              value={password}
              className="mt-1 w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleSignupForm}
          type="submit" className="w-full mt-4 text-lg rounded-xl">
            Sign Up
          </Button>
        </form>
        <p className="text-sm text-center text-slate-500 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-600 hover:underline font-medium">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

