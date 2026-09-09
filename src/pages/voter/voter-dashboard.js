import { useState } from "react";
import { Check } from "lucide-react";
import Logo from "../../assets/images/login.jpeg";
export default function VotingPage() {
    const [selectedVotes, setSelectedVotes] = useState({});

    const dummyCandidates = [
        { id: 1, first_name: "Maria", last_name: "Mercedez", position: "Barangay Chairman", partylist: "Protekboto Coalition", ballot_number: 1 },
        { id: 2, first_name: "April", last_name: "Juarez", position: "Barangay Chairman", partylist: "Reform Alliance", ballot_number: 2 },
        { id: 3, first_name: "Jether", last_name: "Masidong", position: "Barangay Kagawad", partylist: "Protekboto Coalition", ballot_number: 1 },
        { id: 4, first_name: "Paul", last_name: "Suarez", position: "Barangay Kagawad", partylist: "Reform Alliance", ballot_number: 1 }
    ];

    const handleSelect = (position, candidateId) => {
        setSelectedVotes(prev => ({
            ...prev,
            [position]: candidateId
        }));
    };

    const categorizedCandidates = dummyCandidates.reduce((acc, candidate) => {
        if (!acc[candidate.position]) {
            acc[candidate.position] = [];
        }
        acc[candidate.position].push(candidate);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-white flex flex-col font-sentient">
            <main className="flex-1 flex flex-col px-6 lg:px-16 py-12 max-w-5xl mx-auto w-full ">
                <div className="border border-gray-300 p-6 pt-10">
                    <div className="flex flex-col items-center text-center mb-10 pb-6 border-stone-200">
                        <img src={Logo} alt="logo" class="w-14" />
                        <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
                            Official Secure Ballot
                        </h1>
                    </div>

                    <div className="flex flex-col gap-10">
                        {Object.entries(categorizedCandidates).map(([position, group]) => (
                            <div key={position} className="flex flex-col gap-4">
                                <div className="border-stone-200 pb-2">
                                    <h3 className="text-md font-mono uppercase text-center text-green-900 font-semibold border border-gray-300 p-2">
                                        {position}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 p-3">
                                    {group.map((candidate) => {
                                        const isSelected = selectedVotes[position] === candidate.id;

                                        return (
                                            <div 
                                                key={candidate.id}
                                                onClick={() => handleSelect(position, candidate.id)}
                                                className={`bg-white border p-3 shadow-xs flex items-center gap-3 cursor-pointer transition-all ${
                                                    isSelected 
                                                        ? 'border-green-800 ring-2 ring-green-900/20 bg-green-50/20' 
                                                        : 'border-stone-200 hover:border-stone-300'
                                                }`}
                                            >
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                                                    isSelected 
                                                        ? 'bg-green-900 border-green-900 text-white' 
                                                        : 'border-stone-300 bg-white'
                                                }`}>
                                                    {isSelected && <Check className="w-3.5 h-3.5" />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="flex flex-row gap-1">
                                                        <span className="text-md font-bold uppercase text-stone-900">
                                                            {candidate.ballot_number}.
                                                        </span>
                                                        <span className="text-md font-bold uppercase text-stone-900">
                                                            {candidate.first_name} {candidate.last_name}
                                                        </span>
                                                    </div> 
                                                    <span className="text-xs text-stone-500 uppercase tracking-wider">
                                                        ({candidate.partylist})
                                                    </span>
                                                </div>

                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <div className="pt-6 border-t border-stone-200 flex justify-end">
                            <button 
                                type="button" 
                                className="bg-green-900 flex items-center justify-center gap-2 py-3 px-8 text-sm font-medium rounded-xl text-white hover:bg-green-800 transition-all shadow-sm cursor-pointer"
                            >
                                <span>Cast Official Ballot</span>
                                <Check className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-auto pt-16 text-center">
                        <p style={{ fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.08em" }} className="text-stone-400 uppercase">
                            System Status: Protected with Protekboto &bull; Secure Anonymized Ledger
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}