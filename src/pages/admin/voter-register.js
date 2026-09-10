import { useState } from "react";
import Sidebar from "../../components/sidebar.js";
import { Check } from "lucide-react";
import axios from "axios";

export default function VoterRegister() {

    const [voters_id, setVotersId] = useState("");
    const [name_hash, setNameHash] = useState("");
    const [precinct_number, setPrecinctNumber] = useState("");
    const [password, setPassword] = useState("");
    
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
                "http://localhost:3000/api/voters",
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
        <div className="min-h-screen bg-stone-50 flex flex-col font-sentient aniamte-page-in">
            <div className="flex flex-1">
                <Sidebar />

                <main className="flex-1 flex flex-col px-8 lg:px-12 py-16 overflow-y-auto items-center">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
                            Election Management
                        </h1>
                        <p className="mt-1 text-md text-stone-500 font-light">
                            Overview and controls for your secure on-chain voting infrastructure.
                        </p>
                    </div>

                    <h2 className="text-xl mb-6 font-medium text-black uppercase tracking-wider">
                        Voters Management
                    </h2> 

                    <div className="w-full max-w-xl gap-8 items-center">
                        <form onSubmit={handleRegister} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs flex flex-col gap-6 lg:col-span-6">
                            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                                <p className="text-base font-medium text-stone-900">
                                    Voters Registration Form
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-stone-800 text-xs tracking-wider mb-1.5 block">
                                        Voters ID
                                    </label>
                                    <input 
                                        type="text"
                                        value={voters_id}
                                        onChange={(e) => setVotersId(e.target.value)}
                                        placeholder="Enter voter's id"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900 w-full transition-all"
                                    />
                                    {errors.voters_id && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.voters_id}</span>}
                                </div>

                                <div>
                                    <label className="text-stone-800 text-xs tracking-wider mb-1.5 block">
                                        Full Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={name_hash}
                                        onChange={(e) => setNameHash(e.target.value)}
                                        placeholder="Enter voters full name"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900 w-full transition-all"
                                    />
                                    {errors.name_hash && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.name_hash}</span>}
                                </div>

                                <div>
                                    <label className="text-stone-800 text-xs tracking-wider mb-1.5 block">
                                        Precinct Number
                                    </label>
                                    <input 
                                        type="number"
                                        value={precinct_number}
                                        onChange={(e) => setPrecinctNumber(e.target.value)}
                                        placeholder="e.g. 99324-32423-32423"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900 w-full transition-all"
                                    />
                                    {errors.precinct_number && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.precinct_number}</span>}
                                </div>

                                <div>
                                    <label className="text-stone-800 text-xs tracking-wider mb-1.5 block">
                                        Password
                                    </label>
                                    <input 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter password"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900 w-full transition-all"
                                    />
                                    {errors.password && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.password}</span>}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
                                <button 
                                    type="submit"
                                    className="bg-green-900 flex items-center justify-center gap-2 py-2.5 px-6 text-sm font-medium rounded-xl text-white hover:bg-green-800 transition-all shadow-sm cursor-pointer"
                                >
                                    <span>Save Candidate</span>
                                    <Check className="w-4 h-4" />
                                </button>
                                {errors.form && <p className="text-red-600 text-xs mt-1 border rounded-md border-red-600 px-2 py-1 text-center">{errors.form}</p>}
                            </div>
                        </form>
                    </div>

                    <div className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out transform 
                        ${success ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
                    >
                        <div className="bg-white border border-green-800 text-green-800 px-5 py-3 rounded-lg shadow-xl flex items-center gap-3">
                            <Check className="w-5 h-5" />
                            <span className="font-medium">Voter Registered Successfully!</span>
                        </div>
                    </div>  

                    <div className="mt-auto pt-16">
                        <p
                            style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.08em" }}
                            className="text-stone-400 uppercase"
                        >
                            System Status: Protected with Protekboto &bull; Authorized personnel only
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}