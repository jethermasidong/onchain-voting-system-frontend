import { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar.js";
import { Check, User, Award } from "lucide-react";
import axios from "axios";

export default function CandidateManagement() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [partylist, setPartylist] = useState("");

    const [candidates, setCandidates] = useState([]); 
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const fetchCandidates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:3000/api/candidates", {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const data = response.data;
            if (Array.isArray(data)) {
                setCandidates(data);
            } else if (data && Array.isArray(data.rows)) {
                setCandidates(data.rows);
            } else if (data && Array.isArray(data.candidates)) {
                setCandidates(data.candidates);
            } else {
                setCandidates([]);
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
            setCandidates([]);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!first_name) newErrors.first_name = "First Name is required!";
        if (!last_name) newErrors.last_name = "Last Name is required!";
        if (!position) newErrors.position = "Position is required!";
        if (!partylist) newErrors.partylist = "Partylist is required";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if ("vibrate" in navigator) {
                navigator.vibrate(200);
            } return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                "http://localhost:3000/api/candidate",
                { first_name, last_name, position, partylist },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            setFirstName("");
            setLastName("");
            setPosition("");
            setPartylist("");
            setErrors({});
            fetchCandidates(); 
        } catch (error) {
            console.error("Error Message:", error.message);
            setErrors({ form: "Failed to register candidate." });
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col font-sentient">
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
                        Candidate Management
                    </h2> 

                    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs flex flex-col gap-6 lg:col-span-6">
                            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                                <p className="text-base font-medium text-stone-900">
                                    Candidate Entry Form
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-stone-800 text-xs font-mono uppercase tracking-wider mb-1.5 block">
                                        First Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Enter candidate's first name"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-3 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900/20 w-full transition-all"
                                    />
                                    {errors.first_name && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.first_name}</span>}
                                </div>

                                <div>
                                    <label className="text-stone-800 text-xs font-mono uppercase tracking-wider mb-1.5 block">
                                        Last Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Enter candidate's last name"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-3 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900/20 w-full transition-all"
                                    />
                                    {errors.last_name && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.last_name}</span>}
                                </div>

                                <div>
                                    <label className="text-stone-800 text-xs font-mono uppercase tracking-wider mb-1.5 block">
                                        Position
                                    </label>
                                    <input 
                                        type="text"
                                        value={position}
                                        onChange={(e) => setPosition(e.target.value)}
                                        placeholder="e.g. Barangay Chairman Candidate"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-3 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900/20 w-full transition-all"
                                    />
                                    {errors.position && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.position}</span>}
                                </div>

                                <div>
                                    <label className="text-stone-800 text-xs font-mono uppercase tracking-wider mb-1.5 block">
                                        Party List
                                    </label>
                                    <input 
                                        type="text"
                                        value={partylist}
                                        onChange={(e) => setPartylist(e.target.value)}
                                        placeholder="e.g. Protekboto Coalition"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-3 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900/20 w-full transition-all"
                                    />
                                    {errors.partylist && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.partylist}</span>}
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

                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4 lg:col-span-6 max-h-[600px] overflow-y-auto">
                            <div className="border-b border-stone-100 pb-3">
                                <h3 className="text-base font-medium text-stone-900">
                                    Registered Candidates
                                </h3>
                                <p className="text-xs text-stone-400 font-mono mt-0.5">Live Ballot Registry</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                {Array.isArray(candidates) && candidates.length === 0 ? (
                                    <p className="text-sm text-stone-400 text-center py-8 font-light">No candidates registered yet.</p>
                                ) : (
                                    Array.isArray(candidates) && candidates.map((cand) => (
                                        <div key={cand.id || cand._id} className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-green-50 text-green-900 flex items-center justify-center border border-green-200 shrink-0">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-stone-900">{cand.first_name} {cand.last_name}</h4>
                                                    <span className="text-xs font-mono text-stone-500 block">{cand.position}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-mono bg-white border border-stone-200 px-2.5 py-1 rounded-md text-stone-600 flex items-center gap-1">
                                                <Award className="w-3 h-3 text-green-800" /> {cand.partylist}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out transform 
                        ${success ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
                    >
                        <div className="bg-white border border-green-800 text-green-800 px-5 py-3 rounded-lg shadow-xl flex items-center gap-3">
                            <Check className="w-5 h-5" />
                            <span className="font-medium">Candidate Registered Successfully!</span>
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