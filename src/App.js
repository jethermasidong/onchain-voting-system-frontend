import React from 'react';
import background from './images/phflag.jpg';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

function LoginScreen() {

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };





  return (

    <div className="min-h-screen relative flex items-center justify-center bg-gray-900">
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <div className="relative z-10 bg-white w-full max-w-md p-8 rounded-lg shadow-xl">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">BrgyChain Voting</h1>
          <p className="text-sm text-gray-500">Secure. Transparent. Immutable.</p>
        </div>

        <div className="text-center p-4 border-2 border-solid border-gray-300 cursor-pointer rounded-lg">
          <button onClick={handleLoginClick} className="text-black-400" >Click to Login!</button>
        </div>

      </div>
      
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginScreen />} />
        
      </Routes>
    </BrowserRouter>
  );  
}
export default App;