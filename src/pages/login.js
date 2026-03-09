import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Logo from "../images/logo.jpeg"; 
import Loginimage from "../images/login.jpeg";

export default function Login() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [voters_id, setVotersId] = useState("");
    const [password, setPassword] = useState("");


    const handleLoginClick = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!voters_id) newErrors.voters_id = "Voters ID is required!";
        if (!password) newErrors.password = "Password is required!";
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return;

        try {
            const response = await axios.post(
                "http://localhost:3000/api/login",
                {voters_id, password},
                { headers: { "Content-Type": "application/json" } }
            );

            localStorage.setItem("token", response.data.token);

            const role = response.data.voters.role;

            if (role === "admin") {
              navigate('/admin-dashboard')
            } else {
              navigate('/voter-dashboard')
            }
            
        } catch (error) {
            console.error("Full Error", error);
            if (error.response) {
                setErrors({form: error.response.data.message || "Invalid credentials."});
            } else {
                setErrors({form: "Cant connect to the server. Please try again later!"});
            }
        }

    };

    return (

    <div class="bg-white flex items-center justify-center md:h-screen p-4">
      <div class="[box-shadow:rgba(149,157,165,0.3)_0px_4px_18px] max-w-3xl max-md:max-w-lg rounded-lg p-7">
        <a href="javascript:void(0)"><img
          src={Logo} alt="logo" class="w-36 md:mb-4 mb-12" />
        </a>

        <div class="grid md:grid-cols-2 items-center gap-8">
          <div class="max-md:order-1">
            <div class="aspect-[12/11]">
              <img src={Loginimage} class="w-full h-full object-contain" alt="login-image" />
            </div>
          </div>

          <form class="md:max-w-md w-full mx-auto" onSubmit={handleLoginClick}>
            <div class="mb-14">
              <h1 class="text-4xl font-bold font-serif text-green-600">Sign in</h1>
              {errors.form && <p className="text-red-500 text-sm mt-2">{errors.form}</p>}
            </div>
            <div>
              <div class="relative flex items-center">
                <input name="email" type="text" class="w-full text-sm border-b border-gray-300 focus:border-blue-600 pr-8 px-2 py-3 outline-none font-serif" placeholder="Enter your Voter ID" value={voters_id} onChange={(e) => setVotersId(e.target.value)} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-2" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-2  0 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
              {errors.voters_id && <p className="text-red-500 text-sm mt-2">{errors.voters_id}</p>}
            </div>
            <div class="mt-4">
              <div class="relative flex items-center">
                <input name="password" type="password" required class="w-full text-sm border-b border-gray-300 focus:border-blue-600 pr-8 px-2 py-3 outline-none font-serif" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <svg fill="#bbb" stroke="#bbb" class="w-[18px] h-[18px] absolute right-7 cursor-pointer" viewBox="0 0 128 128">
                  <path d="M64 d104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>
                <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
                {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
            </div>

            <div class="mt-5">
              <button type="submit" class="w-full shadow-xl py-2 px-4 text-[15px] font-medium tracking-wide rounded-md cursor-pointer font-serif text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    );
};