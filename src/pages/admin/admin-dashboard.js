import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar.js";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

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

  const categorizedCandidates = candidates.reduce((acc, candidate) => {
    const posName = candidate.position_name || "Unassigned Position";
    if (!acc[posName]) {
      acc[posName] = [];
    }
    acc[posName].push(candidate);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sentient animate-page-in">
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
            Election Results
          </h2>

          <div className="flex flex-col gap-10 w-full max-w-5xl">
            {Object.keys(categorizedCandidates).length === 0 ? (
              <p className="text-sm text-stone-400 font-mono py-8">No election data available yet.</p>
            ) : (
              Object.entries(categorizedCandidates).map(([positionName, group]) => (
                <div key={positionName} className="flex flex-col gap-4">
                  <div className="border-b border-stone-200 pb-2">
                    <h3 className="text-sm font-mono tracking-widest text-black font-semibold">
                      {positionName}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.map((candidate) => {
                      const votes = candidate.total_vote || 0;
                      const votePercentage = candidate.maxVotes 
                        ? Math.round((votes / candidate.maxVotes) * 100) 
                        : Math.min(votes * 10, 100);

                      return (
                        <div 
                          key={candidate.id} 
                          className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs flex flex-col justify-between gap-5 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex flex-row items-center gap-1.5">
                                <p className="text-xl font-medium text-stone-900">
                                  {candidate.first_name} {candidate.last_name}
                                </p>
                                <span className="text-xs font-normal uppercase text-stone-500 font-mono">
                                  ({candidate.partylist})
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-row items-center gap-2 -mt-3 -mb-2">
                            <span className="text-green-900 font-extrabold text-3xl font-mono leading-none">
                              {votes.toLocaleString()}
                            </span>
                            <span className="text-md text-stone-400 font-mono tracking-wider mt-1">
                              Votes
                            </span> 
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="w-full h-5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
                              <div 
                                className="h-full bg-green-900 rounded-l-full transition-all duration-500"
                                style={{ width: `${votePercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
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