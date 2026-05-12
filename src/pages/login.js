import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Logo from "../images/logo.jpeg"; 
import Loginimage from "../images/login.jpeg";
import { Mail, KeyRound, CircleUser } from 'lucide-react';


export default function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [voters_id, setVotersId] = useState("");
    const [password, setPassword] = useState("");

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
          } return;
        }
        try {
            const response = await axios.post(
                "http://localhost:3000/api/login",
                {voters_id, password},
                { headers: { "Content-Type": "application/json" } }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.voters.role);

            const role = response.data.voters.role;

            if (role === "admin") {
              navigate('/admin-dashboard')
            } else {
              navigate('/voter-dashboard')
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
    <div 
      className="bg-gray-300 flex items-center justify-center min-h-screen p-4 bg-cover bg-center bg-no-repeat relative">
      <div class="relative z-10 [box-shadow:rgba(149,157,165,0.3)_0px_4px_18px] max-w-3xl max-md:max-w-lg rounded-lg p-7 bg-white">
        <a href="javascript:void(0)">
          <img src={Logo} alt="logo" class="w-44 md:mb-4 mb-12" />
        </a>
        <div class="grid md:grid-cols-2 items-center gap-8">
          <div class="max-md:order-1">
            <div class="aspect-[12/11]">
              <img src={Loginimage} class="w-full h-full object-contain" alt="login-image" />
            </div>
          </div>

          <form className={`md:max-w-md w-full mx-auto ${errors.form ? 'animate-shake' : ''}`} onSubmit={handleLoginClick}>
            <div class="mb-8 relative flex items-center">
              <CircleUser className="w-7 h-7 mr-2 text-gray-500"/>
              <h1 class="text-2xl font-medium font-sentient text-black">Sign in</h1>
            </div>
            <div>
              <RequiredLabel className="text-xs">Voter ID</RequiredLabel>
              <div class="relative flex items-center">
                <Mail className="absolute left-3 top-6 -translate-y-1/2 text-gray-400 w-4 h-4 -mt-1"/>
                <input name="voter_id" type="text" maxLength={12} required class="w-full text-sm border rounded-md border-blue-300 focus:border-blue-600 pl-10 pr-8 px-2 py-2.5 outline-none font-light font-sentient mb-2" placeholder="Enter your Voter ID" value={voters_id} onChange={(e) => setVotersId(e.target.value)} />
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-2  0 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
              </div>
            </div>
            <div class="mt-1">
              <RequiredLabel>Password</RequiredLabel>
              <div class="relative flex items-center">
                <KeyRound className="absolute left-3 top-6 -translate-y-1/2 text-gray-400 w-4 h-4 -mt-1"/>
                <input name="password" type="password" required class="w-full text-sm pl-10 border rounded-md border-gray-300 focus:border-blue-600 pr-8 px-2 py-2.5 outline-none font-light font-sentient" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <svg fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-7 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 d104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
                <div class="flex flex-wrap items-center justify-between gap-4 mt-4">
            </div>

            <div class="mt-2 mb-4">
              <button type="submit" class="w-full justify-center gap-2 flex flex-row shadow-xl  py-2 px-4 text-[15px] font-medium font-sentient tracking-wide rounded-md cursor-pointer hover:scale-103 hover:font-serif text-white bg-black hover:bg-gray-600 focus:outline-none">
                Sign in
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
              </button>
            </div>
            <div className='min-h-[30px]'>
            {errors.form && <p className="text-red-600 text-xs mt-1 border rounded-md border-red-600 px-2 py-1 text-center">{errors.form}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>

    );
};