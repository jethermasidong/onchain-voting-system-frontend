import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.js";
import { BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const candidates = [
    {
      id: 1,
      name: "Aurelio Santos",
      position: "Barangay Chairman Candidate",
      partylist: "Protekboto Coalition",
      totalVotes: 1420,
      maxVotes: 2000,
    },
    {
      id: 2,
      name: "Maria Clara Reyes",
      position: "Barangay Chairman Candidate",
      partylist: "Reform Alliance",
      totalVotes: 980,
      maxVotes: 2000,
    },
    {
      id: 3,
      name: "Juan Miguel Cruz",
      position: "Barangay Kagawad Candidate",
      partylist: "Protekboto Coalition",
      totalVotes: 1150,
      maxVotes: 2000,
    },
    {
      id: 4,
      name: "Elena Gomez",
      position: "Barangay Kagawad Candidate",
      partylist: "Reform Alliance",
      totalVotes: 890,
      maxVotes: 2000,
    },
    {
      id: 5,
      name: "Maria Jimenez",
      position: "Barangay Kagawad Candidate",
      partylist: "Protekboto Coalition",
      totalVotes: 890,
      maxVotes: 2000,
    }
  ];

  const categorizedCandidates = candidates.reduce((acc, candidate) => {
    if (!acc[candidate.position]) {
      acc[candidate.position] = [];
    }
    acc[candidate.position].push(candidate);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sentient">
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 flex flex-col px-8 lg:px-12 py-16 overflow-y-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
              Election Dashboard
            </h1>
            <p className="mt-1 text-md text-stone-500 font-light">
              Overview and controls for your secure on-chain voting infrastructure.
            </p>
          </div>

          <h2 className="text-xl mb-6 font-medium text-black uppercase tracking-wider font-mono">
            Candidate Metrics by Position
          </h2>

          <div className="flex flex-col gap-10 w-full max-w-5xl">
            {Object.entries(categorizedCandidates).map(([position, group]) => (
              <div key={position} className="flex flex-col gap-4">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-sm font-mono uppercase tracking-widest text-green-900 font-semibold">
                    {position}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.map((candidate) => {
                    const votePercentage = Math.round((candidate.totalVotes / candidate.maxVotes) * 100);

                    return (
                      <div 
                        key={candidate.id} 
                        className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between gap-5 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-green-50 text-green-900 flex items-center justify-center border border-green-200">
                              <BarChart3 className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <p className="text-lg font-medium text-stone-900">
                                {candidate.name}
                              </p>
                              <span className="text-xs font-normal text-stone-500 font-mono">
                                {candidate.partylist}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-stone-900 font-medium text-2xl font-mono leading-none">
                              {candidate.totalVotes.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider mt-1">
                              Votes
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                            <div 
                              className="h-full bg-green-900 rounded-full transition-all duration-500"
                              style={{ width: `${votePercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
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