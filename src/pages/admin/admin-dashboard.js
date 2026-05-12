import { useState } from "react";
import Header from "../../components/header";

const UserPlusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/>
    <line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
);

const VoteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12l2 2 4-4"/>
    <path d="M5 7H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
    <rect x="9" y="3" width="6" height="6" rx="1"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function AdminDashboard() {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);

  const handleClick = (id) => {
    setActive(id);
    setTimeout(() => {
      if (id === "candidates") {
        window.location.href = "/candidate-register";
      } else if (id === "voters") {
        window.location.href = "/voter-register";
      }
    }, 300);
  };

  const cards = [
    {
      id: "candidates",
      label: "Candidates",
      action: "Add Candidate",
      description: "Register a new candidate to the election ballot.",
      tag: "MANAGE",
      icon: <UserPlusIcon />,
    },
    {
      id: "voters",
      label: "Voters",
      action: "Add Voter",
      description: "Register a new eligible voter into the system.",
      tag: "MANAGE",
      icon: <VoteIcon />,
    },
  ];

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      className="min-h-screen bg-gray-200 flex flex-col"
    >
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 pt-28">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-light text-stone-800 tracking-tight font-sentient" style={{ letterSpacing: "-0.03em" }}>
            Election Management
          </h1>
          <p className="mt-3 text-sm text-stone-400 font-light font-sentient">
            Select an action to manage the election registry.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-xl pb-20">
          {cards.map((card) => {
            const isHovered = hovered === card.id;
            const isActive = active === card.id;

            return (
              <button
                key={card.id}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleClick(card.id)}
                className={`text-left font-sentient bg-white border rounded-xl p-8 flex flex-col gap-6 cursor-pointer transition-all duration-200
                ${isHovered ? "border-stone-400 shadow-lg -translate-y-1" : "border-stone-300 shadow-sm"}
                ${isActive ? "scale-95" : ""}`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center border rounded-sm transition-all duration-200
                  ${isHovered ? "bg-stone-900 text-white border-stone-900" : "bg-stone-50 text-stone-900 border-stone-300"}`}
                >
                  {card.icon}
                </div>

                <div className="flex flex-col gap-1">
                  <span
                    style={{ fontFamily: "monospace", fontSize: "0.62rem", letterSpacing: "0.14em" }}
                    className="text-stone-400 uppercase"
                  >
                    {card.tag}
                  </span>
                  <h2 className="text-xl font-light text-stone-800" style={{ letterSpacing: "-0.01em" }}>
                    {card.label}
                  </h2>
                  <p className="text-xs text-stone-400 font-light leading-relaxed mt-1">
                    {card.description}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 text-sm font-light transition-all duration-200
                  ${isHovered ? "text-stone-900" : "text-stone-400"}`}
                >
                  <span>{card.action}</span>
                  <span className={`transition-transform duration-200 ${isHovered ? "translate-x-1" : ""}`}>
                    <ArrowRight />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <p
          style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.08em" }}
          className="mt-16 text-stone-300 uppercase"
        >
          Authorized personnel only
        </p>
      </main>
    </div>
  );
}