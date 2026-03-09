import Logo from "../../images/logo.jpeg";

export default function VoterRegister() {
    

    
    
    
    
    
    
    
    
    
    
    
    
    return (
        <div class="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-36">
      <div class="text-center mb-12 sm:mb-16">
        <a href="javascript:void(0)"><img
          src={Logo} alt="logo" class='w-64 inline-block' />
        </a>
        <h4 class="text-gray-400 text-xl mt-3 ml-8 font-sans font-semibold">Register a new eligible voter into the system.</h4>
      </div>

      <form>
        <div class="grid sm:grid-cols-1 gap-8">
          <div>
            <label class="text-slate-900 text-sm font-medium mb-2 block">Voters ID</label>
            <input name="voters_id" type="text" class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all" placeholder="Enter Voter ID" />
          </div>
          <div>
            <label class="text-slate-900 text-sm font-medium mb-2 block">Full Name</label>
            <input name="name_hash" type="text" class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all" placeholder="Enter full name" />
          </div>
          <div>
            <label class="text-slate-900 text-sm font-medium mb-2 block">Precinct Number</label>
            <input name="precinct_number" type="text" class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all" placeholder="Enter precinct number" />
          </div>
          <div>
            <label class="text-slate-900 text-sm font-medium mb-2 block">Password</label>
            <input name="password" type="text" class="bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent outline-green-500 transition-all" placeholder="Enter password" />
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
