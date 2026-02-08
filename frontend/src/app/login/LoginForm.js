'use client'

import { AuthService } from "@/lib/services/auth.service";
import React, { useState } from "react";
import {  toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


const LoginForm = () => {
  const router = useRouter();
   const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
      rememberMe,
    };

   try{
     // 🔐 Later: call API here
     const response = await AuthService.login(loginData)
     document.cookie = `token=${response.data.token}`
     console.log(response);
     toast.success(response.data.message);
     login(response.data.role);

     router.push("/task")
    }catch(error){
      console.log("error--->",error.response.data.message);
       toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white flex flex-col px-4">
      
      {/* Header */}
      <header className="flex justify-between items-center py-4 max-w-7xl mx-auto w-full">
        <h1 className="text-lg font-semibold">TaskFlow</h1>
        <div className="hidden sm:flex items-center text-sm gap-2">
          <span className="text-slate-300">Don’t have an account?</span>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md">
            Sign up
          </button>
        </div>
      </header>

      {/* Login Card */}
      <main className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-800"
        >
          <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
          <p className="text-sm text-slate-400 text-center mt-1 mb-6">
            Sign in to manage your daily tasks
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-slate-300">Email address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2.5 rounded-lg bg-black border border-slate-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 relative">
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2.5 rounded-lg bg-black border border-slate-700 focus:outline-none focus:border-blue-500"
              required
            />
            <span className="absolute right-3 top-[38px] text-xs text-blue-400 cursor-pointer">
              Forgot?
            </span>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 text-sm text-slate-300 mb-5">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-blue-600"
            />
            <span>Remember me for 30 days</span>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg font-semibold transition"
          >
            Log In
          </button>

          {/* Divider */}
          <div className="flex items-center my-6 text-slate-500 text-xs">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="px-3">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 border border-slate-700 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Google
            </button>
            <button
              type="button"
              className="flex-1 border border-slate-700 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Apple
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-4">
        © 2024 TaskFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginForm;
