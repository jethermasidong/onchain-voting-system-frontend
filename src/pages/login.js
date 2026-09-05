import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Logo from "../images/logo.jpeg"; 
import Loginimage from "../images/bg-login.png";
import { Mail, KeyRound, CircleCheckBig } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [voters_id, setVotersId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 

    const RequiredLabel = ({ children }) => (
      <span className="inline-block text-sm text-gray-950 mb-1 font-sentient after:ml-0.5 after:text-red-500 after:content-['*'] justify-center">
        {children}
      </span>
    );

    const handleLoginClick = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!voters_id) newErrors.voters_id = "Voters ID is required!";
        if (!password) newErrors.password = "Password is required!";
        
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          if ("vibrate" in navigator) {
            navigator.vibrate(200);
          } 
          return;
        }

        try {
            const response = await axios.post(
                "http://localhost:3000/api/login",
                { voters_id, password },
                { headers: { "Content-Type": "application/json" } }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.voters.role);

            const role = response.data.voters.role;

            if (role === "admin") {
              navigate('/admin-dashboard');
            } else {
              navigate('/voter-dashboard');
            }
            
        } catch (error) {
            console.error("Full Error", error);
            if (error.response) {
                setErrors({form: error.response.data.message || "Incorrect Voter ID or Password."});
            } else {
                setErrors({form: "Cant connect to the server. Please try again later!"});
            }
        }
    };
 
    return (
    <div className="bg-white flex items-center justify-center min-h-screen p-4 sm:p-8 font-sentient">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-[rgba(149,157,165,0.3)_0px_8px_24px] overflow-hidden min-h-[550px]">
        <div className="hidden md:flex md:w-1/2 relative bg-gradient-to-t from-green-800 to-white flex-col justify-between p-10">
          <img 
            src={Loginimage} 
            alt="Login background" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10">
            <a href="/">
              <img src={Logo} alt="logo" className="w-56" />
            </a>
          </div>
          <div className="relative z-10 mt-auto">
            <h2 className="text-4xl text-white font-medium leading-tight drop-shadow-lg">
              Democracy,<br />
              Decentralized.
            </h2>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white relative z-10">
          
          <form className={`w-full max-w-sm mx-auto ${errors.form ? 'animate-shake' : ''}`} onSubmit={handleLoginClick}>
            
            <div className="mb-8 flex flex-col">
              <h1 className="text-3xl font-medium text-black">Sign in &<br /> Vote Wisely!</h1>
              <p className="border border-green-800 text-green-800 flex flex-row items-center gap-1   rounded-xl w-fit px-2 py-1 text-sm mt-2">
                <CircleCheckBig className="w-4 h-4" /> Protected with Protekboto
              </p>
            </div>

            <div className="mb-5">
              <RequiredLabel className="text-xs">Voter ID</RequiredLabel>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 text-gray-400 w-4 h-4"/>
                <input 
                  name="voter_id" 
                  type="text" 
                  maxLength={12} 
                  required 
                  className="w-full text-sm border rounded-md border-gray-300 focus:border-black pl-10 pr-3 py-2 outline-none font-light transition-colors" 
                  placeholder="Enter your Voter ID" 
                  value={voters_id} 
                  onChange={(e) => setVotersId(e.target.value)} 
                />
              </div>
              {errors.voters_id && <p className="text-red-500 text-xs mt-1">{errors.voters_id}</p>}
            </div>

            <div className="mb-6">
              <RequiredLabel>Password</RequiredLabel>
              <div className="relative flex items-center">
                <KeyRound className="absolute left-3 text-gray-400 w-4 h-4"/>
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  className="w-full text-sm border rounded-md border-gray-300 focus:border-black pl-10 pr-10 py-2 outline-none font-light transition-colors" 
                  placeholder="Enter password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 focus:outline-none"
                >
                  <svg fill={showPassword ? "#000" : "#bbb"} className="w-[18px] h-[18px] cursor-pointer hover:fill-gray-700 transition-colors" viewBox="0 0 128 128">
                    <path d="M64 d104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"></path>
                  </svg>
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="mt-8 mb-4">
              <button 
                type="submit" 
                className="w-full justify-center items-center gap-2 flex flex-row shadow-lg py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer transition-all hover:scale-[1.02] text-white bg-black hover:bg-gray-800 focus:outline-none"
              >
                Sign in
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
            
            <div className='min-h-[40px]'>
              {errors.form && (
                <p className="text-red-600 text-sm mt-2 border rounded-md border-red-200 bg-red-50 px-3 py-2 text-center">
                  {errors.form}
                </p>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
    );
}