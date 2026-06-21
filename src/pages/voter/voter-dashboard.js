import React, { useState } from 'react';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';

const MunicipalBallot = () => {
  // State for selections
  const [selections, setSelections] = useState({
    mayor: null,
    viceMayor: null,
    councilors: [], // Array to hold up to 8 IDs
  });

  // Mock Election Data
  const candidates = {
    mayor: [
      { id: 'm1', firstName: 'Jane', lastName: 'Doe', party: 'Progressive Alliance' },
      { id: 'm2', firstName: 'John', lastName: 'Smith', party: 'National Coalition' },
      { id: 'm3', firstName: 'Alex', lastName: 'Morgan', party: 'Independent' },
    ],
    viceMayor: [
      { id: 'vm1', firstName: 'Carlos', lastName: 'Santos', party: 'Progressive Alliance' },
      { id: 'vm2', firstName: 'Linda', lastName: 'Taylor', party: 'National Coalition' },
    ],
    councilors: [
      { id: 'c1', firstName: 'Robert', lastName: 'Chen', party: 'Progressive Alliance' },
      { id: 'c2', firstName: 'Sarah', lastName: 'Jenkins', party: 'Progressive Alliance' },
      { id: 'c3', firstName: 'David', lastName: 'Kim', party: 'Progressive Alliance' },
      { id: 'c4', firstName: 'Elena', lastName: 'Rostova', party: 'Progressive Alliance' },
      { id: 'c5', firstName: 'Marcus', lastName: 'Vance', party: 'National Coalition' },
      { id: 'c6', firstName: 'Chloe', lastName: 'Albright', party: 'National Coalition' },
      { id: 'c7', firstName: 'Tariq', lastName: 'Mahmood', party: 'National Coalition' },
      { id: 'c8', firstName: 'Aisha', lastName: 'Diallo', party: 'National Coalition' },
      { id: 'c9', firstName: 'Jordan', lastName: 'Bales', party: 'Independent' },
      { id: 'c10', firstName: 'Fiona', lastName: 'Gallagher', party: 'Independent' },
      { id: 'c11', firstName: 'Amir', lastName: 'Hassan', party: 'Workers Front' },
      { id: 'c12', firstName: 'Beatrice', lastName: 'Vogel', party: 'Workers Front' },
    ]
  };

  // Handle Single Select (Mayor / Vice Mayor)
  const handleSingleSelect = (position, id) => {
    setSelections(prev => ({
      ...prev,
      [position]: prev[position] === id ? null : id
    }));
  };

  // Handle Multi-Select (Councilors - Max 8)
  const handleCouncilorSelect = (id) => {
    setSelections(prev => {
      const currentlySelected = prev.councilors.includes(id);
      
      if (currentlySelected) {
        // Remove if already selected
        return { ...prev, councilors: prev.councilors.filter(item => item !== id) };
      } else {
        // Add if under the 8-candidate limit
        if (prev.councilors.length < 8) {
          return { ...prev, councilors: [...prev.councilors, id] };
        }
        // Do nothing if limit reached
        return prev;
      }
    });
  };

  const handleClear = () => {
    setSelections({ mayor: null, viceMayor: null, councilors: [] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Votes Cast:', selections);
    alert(`Ballot Cast!\nMayor: ${selections.mayor}\nVice Mayor: ${selections.viceMayor}\nCouncilors Chosen: ${selections.councilors.length}/8`);
  };

  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-md font-sans select-none">
      
      {/* Header Block */}
      <header className="text-center border-b-2 border-dashed border-slate-300 pb-6 mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">OFFICIAL LOCAL BALLOT</h1>
        <p className="text-sm font-semibold text-slate-500 uppercase mt-1">Municipal Elections 2026</p>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto text-sm">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100 w-full sm:w-auto">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>Tap a candidate card to toggle your vote.</span>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border w-full sm:w-auto transition-colors ${
            selections.councilors.length === 8 
              ? 'bg-amber-50 text-amber-700 border-amber-200' 
              : 'bg-slate-100 text-slate-600 border-slate-200'
          }`}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>Councilors selected: <strong className="font-bold">{selections.councilors.length} / 8</strong></span>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* MAYOR SECTION */}
        <section>
          <div className="flex items-baseline justify-between mb-4 border-b border-slate-300 pb-2">
            <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">For Mayor</h2>
            <span className="text-xs font-bold text-slate-400 uppercase bg-slate-200/60 px-2 py-0.5 rounded">Vote for One (1)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {candidates.mayor.map((cand) => {
              const isSelected = selections.mayor === cand.id;
              return (
                <div
                  key={cand.id}
                  onClick={() => handleSingleSelect('mayor', cand.id)}
                  className={`flex items-center justify-between p-4 bg-white border rounded-xl cursor-pointer transition-all duration-150 shadow-sm hover:border-blue-400 ${
                    isSelected ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Mayoralty Candidate</div>
                    <p className="text-lg font-bold text-slate-800 leading-tight mt-0.5">
                      {cand.lastName}, <span className="font-medium text-slate-600">{cand.firstName}</span>
                    </p>
                    <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-2">
                      {cand.party}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}>
                    {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* VICE MAYOR SECTION */}
        <section>
          <div className="flex items-baseline justify-between mb-4 border-b border-slate-300 pb-2">
            <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">For Vice Mayor</h2>
            <span className="text-xs font-bold text-slate-400 uppercase bg-slate-200/60 px-2 py-0.5 rounded">Vote for One (1)</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidates.viceMayor.map((cand) => {
              const isSelected = selections.viceMayor === cand.id;
              return (
                <div
                  key={cand.id}
                  onClick={() => handleSingleSelect('viceMayor', cand.id)}
                  className={`flex items-center justify-between p-4 bg-white border rounded-xl cursor-pointer transition-all duration-150 shadow-sm hover:border-blue-400 ${
                    isSelected ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Vice-Mayoralty Candidate</div>
                    <p className="text-lg font-bold text-slate-800 leading-tight mt-0.5">
                      {cand.lastName}, <span className="font-medium text-slate-600">{cand.firstName}</span>
                    </p>
                    <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md mt-2">
                      {cand.party}
                    </span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-4 ${
                    isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                  }`}>
                    {isSelected && <CheckCircle className="w-5 h-5 text-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* COUNCILORS SECTION */}
        <section>
          <div className="flex items-baseline justify-between mb-4 border-b border-slate-300 pb-2">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">For Councilors</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">You can select a maximum of 8 councilors.</p>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase bg-slate-200/60 px-2 py-0.5 rounded">Vote for up to Eight (8)</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {candidates.councilors.map((cand) => {
              const isSelected = selections.councilors.includes(cand.id);
              const isMaxReached = selections.councilors.length >= 8;
              const isDisabled = !isSelected && isMaxReached;

              return (
                <div
                  key={cand.id}
                  onClick={() => !isDisabled && handleCouncilorSelect(cand.id)}
                  className={`flex flex-col justify-between p-4 bg-white border rounded-xl transition-all duration-150 shadow-sm ${
                    isSelected 
                      ? 'border-blue-600 ring-2 ring-blue-600 bg-blue-50/10' 
                      : isDisabled 
                        ? 'border-slate-100 bg-slate-100/50 opacity-40 cursor-not-allowed' 
                        : 'border-slate-200 cursor-pointer hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 pr-2">
                      <p className="text-base font-bold text-slate-800 leading-snug truncate">
                        {cand.lastName}
                      </p>
                      <p className="text-sm font-medium text-slate-600 truncate">
                        {cand.firstName}
                      </p>
                    </div>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                    }`}>
                      {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold tracking-tight text-slate-400 uppercase truncate">
                      {cand.party}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Action Controls */}
        <footer className="pt-6 border-t border-slate-300 flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            onClick={handleClear}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-100/80 transition-colors"
          >
            Reset Selections
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/10 transition-colors focus:ring-4 focus:ring-blue-200"
          >
            Review & Submit Ballot
          </button>
        </footer>

      </form>
    </div>
  );
};

export default MunicipalBallot;