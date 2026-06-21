import axios from 'axios';
import Header from '../../components/header';
import { useState, useEffect } from 'react';
import { MoreVertical, Check, UserPlus } from 'lucide-react';

export default function VoterView() {

    const [voters, setVoters] = useState([])
    const [loading, setLoading] = useState(true); 
    const [openMenuId, setOpenMenuId] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchVoters = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:3000/api/voters', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setVoters(response.data);
            } catch(error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVoters();
    }, []);

    useEffect(() => {
        const closeAllMenus = () => setOpenMenuId(null);
        window.addEventListener('click', closeAllMenus);
        return () => window.removeEventListener('click', closeAllMenus);
    }, []);


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this record?")) return;
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:3000/api/voters/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            setVoters(voters.filter(v => v.id !== id));
        } catch(error) {
            console.error("Delete error:", error);
            alert('Delete Failed! Check if the server is running or your token is valid.');  
        }
    };

    const handleEdit = async (voter) => {
        console.log('Editing:', voter);
    };


    const Status = {
        1: "Voted",
        0: "Not Voted",
    };

    if (loading) return <p>Loading.....</p>;

    const toggleMenu = (id, e) => {
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };



    //LINKS
    const handleCreate = () => {
        window.location.href = "/voter-register";
    };


    const confirmDelete = () => {

    }

    return (
        <div className="min-h-screen w-full bg-gray-100 p-6 animate-page-fade">
            <Header />
            <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-28">
                <div className="px-10 border rounded-xl bg-white">
                    <div className='flex justify-between align-middle mt-11 -mb-8'>
                        <h1 className="text-2xl font-semibold">Registered Voters</h1>
                        <button onClick={handleCreate} className='border border-gray-300 px-2 text-sm rounded-full hover:shadow-lg'><UserPlus className='w-4 h-4'/></button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm my-10">
                        <thead className="bg-gray-50 border">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900">Voters ID</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900">Name Hash</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900">Precinct Number</th>
                            <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">

                        {voters.map((voter) => (
                            <tr key={voter.id} className="hover:bg-blue-50 transition-colors text-sm justify-center">
                                <td className="px-4 py-3 font-thin text-gray-900">{voter.voters_id}</td>
                                <td className="px-4 py-3 font-thin">
                                    {voter.name_hash.slice(0, 20)}
                                </td>
                                <td className="px-4 py-3 text-left text-gray-700 font-thin">{voter.precinct_number}</td>
                                <td className="px-4 py-3 text-left text-gray-700 font-thin">{Status[voter.status] || "Unknown"}</td>
                                <td className="px-4 py-3 text-right relative">
                                <button onClick={(e) => toggleMenu(voter.id, e)} className="text-gray-400 hover:text-blue-600"><MoreVertical size={16} /></button>
                                {openMenuId === voter.id && (
                                    <div className="absolute right-4 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 overflow-hidden">
                                        <button
                                            onClick={() => handleEdit(voter)}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <hr className="border-gray-100" />
                                        <button
                                            onClick={() => handleDelete(voter.id)}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                                </td>
                            </tr>
                        ))}    
                        </tbody>
                    </table>
                </div>
                <div className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ease-in-out transform 
                    ${success ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
                >
                    <div className="bg-white border border-green-800 text-green-800 px-5 py-3 rounded-lg shadow-xl flex items-center gap-3">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Voter Deleted Successfully!</span>
                    </div>
                </div>                  
            </div>

        </div>
    )
}