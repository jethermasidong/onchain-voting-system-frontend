import Logo from "../../images/logo.jpeg";
import React, {useState} from 'react';
import axios from 'axios';;

export default function CandidateRegister() {

    const [full_name, setFullName] = useState("");
    const [position, setPosition] = useState("");
    const [partylist, setPartylist] = useState(""); 

    const [success, setSuccess] = useState(false);

    const handleRegister = async () => {

        try {

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
            
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:3000/api/insert-candidate", 
                {full_name, position, partylist},
                {headers: {Authorization: `Bearer ${token}`},
           })

           setFullName("");
           setPosition("");
           setPartylist("");

        } catch (error) {
            console.error("Error:", error);
        }
    }
    return (
        <div class="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-36">
            <div class="text-center mb-12 sm:mb-16 border border-black rounded-xl px-5 py-5">
                <a href="javascript:void(0)"><img
                src={Logo} alt="logo" class='w-64 inline-block' />
                </a>
                <h4 class="text-gray-400 text-xl mt-3 ml-8 font-sans font-semibold">Register a new candidate to the election ballot.</h4>
            </div>

            <form>
                <div class="grid sm:grid-cols-1 gap-8 border border-black rounded-xl px-5 py-5 bg-slate-200">
                <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">Full Name</label>
                    <input name="full_name" type="text" value={full_name} 
                    onChange={(e) => setFullName(e.target.value)}
                    class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all border border-gray-400" placeholder="Enter full name" />
                </div>
                <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">Position</label>
                    <input name="position" type="text" value={position} 
                    onChange={(e) => setPosition(e.target.value)}
                    class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all border border-gray-400" placeholder="Enter position" />
                </div>
                <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">Party List</label>
                    <input name="partylist" type="text" value={partylist} 
                    onChange={(e) => setPartylist(e.target.value)} 
                    class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all border border-gray-400" placeholder="Enter party list" />
                </div>
                </div>
                <div class="mt-12">
                <button type="button" 
                    onClick={handleRegister}
                    class="mx-auto block min-w-32 py-3 px-6 text-sm font-medium tracking-wider rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer">
                    Register
                </button>
                { success && (
                    <div className="bg-green-600 border border-green-700 text-green-400 px-4 py-3 rounded relative mb-4">
                        Candidate Registered Successfully!
                    </div>
                )}
                </div>
            </form>
        </div>    
    )
}