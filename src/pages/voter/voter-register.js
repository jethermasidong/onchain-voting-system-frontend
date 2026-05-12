import Logo from "../../images/logo.jpeg";
import React, {useState} from 'react';
import axios from 'axios';


export default function VoterRegister() {
    
  const [voters_id, setVotersId] = useState("");
  const [name_hash, setNameHash] = useState("");
  const [precinct_number, setPrecinctNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {

    try {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      const token = localStorage.getItem('token');
      await axios.post(
        "http://localhost:3000/api/insert-voter",
        {voters_id, name_hash, precinct_number, password, role: "voter"},
        {headers: {Authorization: `Bearer ${token}`},
      })

      setVotersId("");
      setNameHash("");
      setPrecinctNumber("");
      setPassword("");


    } catch (error) {
      console.error("Error Message:", error.message)
    }
  }
    
    
 
    
    return (
        <div class="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-34">
      <div class="text-center mb-12 sm:mb-16 border border-black px-5 py-5 rounded-xl">
        <a href="javascript:void(0)"><img
          src={Logo} alt="logo" class='w-64 inline-block' />
        </a>
        <h4 class="text-gray-400 text-xl mt-3 ml-8 font-sans font-semibold">Register a new eligible voter into the system.</h4>
      </div>

      <form>
        <div class="bg-blue-100 grid sm:grid-cols-1 gap-6 border border-gray-700 px-4 py-4 rounded-xl shadow-xl">
          <div>
            <label class="text-slate-900 text-sm font-medium mb-2 block">Voters ID</label>
            <input name="voters_id" type="text" 
            value={voters_id}
            onChange={(e) => setVotersId(e.target.value)}
            class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all border border-black" placeholder="Enter Voter ID" />
          </div>
          <div>
            <label class="text-slate-900 text-sm font-medium mb-2 block">Full Name</label>
            <input name="name_hash" type="text"  
            value={name_hash}
            onChange={(e) => setNameHash(e.target.value)}
            class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all border border-black" placeholder="Enter full name" />
          </div>
          <div>
            <label class="text-slate-900 text-sm font-medium mb-2 block">Precinct Number</label>
            <input name="precinct_number" type="text" 
            value={precinct_number}
            onChange={(e) => setPrecinctNumber(e.target.value)}
            class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all border border-black" placeholder="Enter precinct number" />
          </div>
          <div>
            <label class="text-slate-900 text-sm font-medium mb-2 block">Password</label>
            <input name="password" 
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all border border-black" placeholder="Enter password" />
            <button type="button"
            onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? "Hide" : "Show"}</button>
          </div>
        </div>
        <div class="mt-12">
          <button type="button" onClick={handleRegister} class="mx-auto block min-w-32 py-3 px-6 text-sm font-medium tracking-wider rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer border border-black">
            Register
          </button>
        </div>
        { success && (
          <div className="bg-green-600 border border-green-700 text-green-400 px-4 py-3 rounded relative mb-4">
            Voter Registered Successfully!
          </div>
        )}
      </form>
    </div>
    )
    
}
