import { useState } from "react";
import axios from "axios";
import { Check } from "lucide-react";
import Sidebar from "../../components/sidebar";

export default function PositionManagement() {

    const [position_name, setPositionName] = useState("");
    const [order, setOrder] = useState("");
    const [max_votes, setMaxVotes] = useState("");

    const [errors, setErrors] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (p) => {
        p.preventDefault();
        const newErrors = {};
            if (!position_name) newErrors.voters_id = "Position Name is required!";
            if (!order) newErrors.order = "Order is required!";
            if (!max_votes) newErrors.max_votes = "Max Votes is required!";
            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                if ("vibrate" in navigator) {
                    navigator.vibrate(200);
                } return;
            };

        try {
            const token = localStorage.getItem('token');
            await axios.post("http://localhost:3000/api/position", 
                {position_name, order, max_votes},
                {headers: {Authorization: `Bearer ${token}`}},
            )

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            setPositionName("");
            setOrder("");
            setMaxVotes("");
        } catch (error) {
            console.error("Error Message:", error.message);
        }

        const RequiredLabel = ({ children }) => (
            <label className="text-slate-900 text-sm font-medium mb-2 flex items-center">
                {children}
                <span className="text-red-500 ml-0.5">*</span>
            </label>
        );

    }


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
                        Position Management
                    </h2> 

                    <div className="w-full max-w-xl gap-8 items-center">
                        <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs flex flex-col gap-6 lg:col-span-6">
                            <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                                <p className="text-base font-medium text-stone-900">
                                    Voting Position Form
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="text-stone-800 text-xs tracking-wider mb-1.5 block">
                                        Position Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={position_name}
                                        onChange={(p) => setPositionName(p.target.value)}
                                        placeholder="Enter position name"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900 w-full transition-all"
                                    />
                                    {errors.position_name && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.position_name}</span>}
                                </div>

                                <div>
                                    <label className="text-stone-800 text-xs tracking-wider mb-1.5 block">
                                        Order
                                    </label>
                                    <input 
                                        type="number"
                                        value={order}
                                        onChange={(p) => setOrder(p.target.value)}
                                        placeholder="Enter position order"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900 w-full transition-all"
                                    />
                                    {errors.order && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.order}</span>}
                                </div>

                                <div>
                                    <label className="text-stone-800 text-xs tracking-wider mb-1.5 block">
                                        Max Votes
                                    </label>
                                    <input 
                                        type="number"
                                        value={max_votes}
                                        onChange={(p) => setMaxVotes(p.target.value)}
                                        placeholder="e.g. 99324-32423-32423"
                                        className="bg-stone-50/50 text-stone-900 text-sm px-4 py-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-900 w-full transition-all"
                                    />
                                    {errors.max_votes && <span className="text-red-500 text-xs mt-1 block font-mono">{errors.max_votes}</span>}
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
                            <span className="font-medium">Position Saved Successfully!</span>
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
    )
}