import Logo from "../../images/logo.jpeg";

export default function CandidateRegister() {




    return (
        <div class="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-36">
            <div class="text-center mb-12 sm:mb-16">
                <a href="javascript:void(0)"><img
                src={Logo} alt="logo" class='w-64 inline-block' />
                </a>
                <h4 class="text-gray-400 text-xl mt-3 ml-8 font-sans font-semibold">Register a new candidate to the election ballot.</h4>
            </div>

            <form>
                <div class="grid sm:grid-cols-1 gap-8">
                <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">Full Name</label>
                    <input name="full_name" type="text" class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all" placeholder="Enter full name" />
                </div>
                <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">Position</label>
                    <input name="position" type="text" class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all" placeholder="Enter position" />
                </div>
                <div>
                    <label class="text-slate-900 text-sm font-medium mb-2 block">Party List</label>
                    <input name="partylist" type="text" class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all" placeholder="Enter party list" />
                </div>
                </div>
                <div class="mt-12">
                <button type="button" class="mx-auto block min-w-32 py-3 px-6 text-sm font-medium tracking-wider rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer">
                    Register
                </button>
                </div>
            </form>
        </div>    
    )
}