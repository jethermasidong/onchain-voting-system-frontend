import Logo from "../../images/logo.jpeg";
import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {MoveLeft, Check, UserRoundPlus, Eye} from 'lucide-react';
import Header from "../../components/header";


export default function VoterRegister() {
    
  const [voters_id, setVotersId] = useState("");
  const [name_hash, setNameHash] = useState("");
  const [precinct_number, setPrecinctNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = {};
        if (!voters_id) newErrors.voters_id = "Voters ID is required!";
        if (!name_hash) newErrors.name_hash = "Full Name is required!";
        if (!precinct_number) newErrors.precinct_number = "Precinct Number is required!";
        if (!password) newErrors.password = "Password is required";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if ("vibrate" in navigator) {
                navigator.vibrate(200);
            } return;
    };

    try {
        const token = localStorage.getItem('token');
        await axios.post(
            "http://localhost:3000/api/insert-voter",
            {voters_id, name_hash, precinct_number, password, role: "voter"},
            {headers: {Authorization: `Bearer ${token}`},
        })

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);

        setVotersId("");
        setNameHash("");
        setPrecinctNumber("");
        setPassword("");


    } catch (error) {
      console.error("Error Message:", error.message)
    }
  };

  const RequiredLabel = ({ children }) => (
    <label className="text-slate-900 text-sm font-medium mb-2 flex items-center">
        {children}
        <span className="text-red-500 ml-0.5">*</span>
    </label>
    );
    
    
    
    return (
      <div class="min-h-screen w-full bg-gray-100 p-6 animate-page-fade">
        <Header />
            <div class="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-28">
                <div class="text-center mb-12 sm:mb-8 rounded-xl px-5 py-5">
                    <a href="javascript:void(0)"><img
                    src={Logo} alt="logo" class='w-64 inline-block' />
                    </a>
                </div>

                <form onSubmit={handleRegister}>
                    <div class="px-10 border rounded-xl bg-white">
                        <h4 className="flex items-center justify-between gap-2 mt-7">
                            <UserRoundPlus className="w-10 h-10 bg-white border rounded-md px-2 mb-3" /> 
                            <Link to="/voter-view" className="border border-gray-300 px-2 py-1 rounded-xl text-gray-500 text-xs font-bold focus:outline-none cursor-pointer hover:border-gray-400 shadow-none transition-shadow duration-150 hover:shadow-md hover:shadow-gray-300 flex items-center gap-1"><Eye className="w-4 h-4" />View Voters</Link>
                        </h4>
                        <span className="text-gray-700 text-2xl mt-7 font-bold">Voter Register</span>
                        <h5 class="text-slate-500 text-md font-thin">Register a new voter to the record.</h5>
                    <div class="grid sm:grid-cols-2 gap-8 py-14">
                    <div>
                        <RequiredLabel><label class="text-slate-900 text-sm font-medium mb-2 block">Voter's ID</label></RequiredLabel>
                        <input name="voters_id" type="text" value={voters_id} required
                        onChange={(e) => setVotersId(e.target.value)}
                        class="bg-white w-full text-slate-900 text-sm px-3 py-3 rounded-md focus:bg-transparent outline-[#1771b2] transition-all border border-gray-400" placeholder="Enter voters ID" />
                    </div>
                    <div>
                        <RequiredLabel><label class="text-slate-900 text-sm font-medium mb-2 block">Full Name</label></RequiredLabel>
                        <input name="name_hash" type="text" value={name_hash} required
                        onChange={(e) => setNameHash(e.target.value)}
                        class="bg-white w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-[#1771b2] transition-all border border-gray-400" placeholder="Enter full name" />
                    </div>
                    <div>
                        <RequiredLabel><label class="text-slate-900 text-sm font-medium mb-2 block">Precinct Number</label></RequiredLabel>
                        <input name="precinct_number" type="text" value={precinct_number} required
                        onChange={(e) => setPrecinctNumber(e.target.value)}
                        class="bg-white w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-[#1771b2] transition-all border border-gray-400" placeholder="Enter precinct number" />
                    </div>
                    <div>
                        <RequiredLabel><label class="text-slate-900 text-sm font-medium mb-2 block">Password</label></RequiredLabel>
                        <input name="password" type="password" value={password} required
                        onChange={(e) => setPassword(e.target.value)} 
                        class="bg-white w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-[#1771b2] transition-all border border-gray-400" placeholder="Enter password" />
                    </div>
                    </div>
                    <div class="grid sm:grid-cols-2 gap-80 px-3 py-3 pb-10">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex items-center justify-center gap-2 py-2 px-2 text-sm font-medium tracking-wider rounded-md text-black bg-white focus:outline-none cursor-pointer hover:bg-white hover:text-black hover:border-black border border-slate-300 shadow-none transition-shadow duration-200 hover:shadow-md hover:shadow-gray-400"
                        >
                        <MoveLeft className="w-4 h-4" />
                        <span>Back</span>
                    </button>
                    <button type="submit" 
                        class="bg-[#258fd2] flex items-center justify-center gap-2 py-2 px-2 text-sm font-medium tracking-wider rounded-md text-white focus:outline-none cursor-pointer hover:bg-[#4ca9e4] hover:text-white border hover:border-black border-slate-300 shadow-none transition-shadow duration-200 hover:shadow-md hover:shadow-gray-400">
                        <span>Register</span>
                        <Check className="w-4 h-4"/>
                    </button>   
                    {errors.form && <p className="text-red-600 text-xs mt-1 border rounded-md border-red-600 px-2 py-1 text-center">{errors.form}</p>}
                    </div>
                    </div>
                
                </form>
                <div className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out transform 
                    ${success ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
                >
                    <div className="bg-white border border-green-800 text-green-800 px-5 py-3 rounded-lg shadow-xl flex items-center gap-3">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Voter Registered Successfully!</span>
                    </div>
                </div>  
            </div>   
        </div> 
    )
    
}
