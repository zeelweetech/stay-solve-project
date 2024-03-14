import Card from "components/card";
import React, { useState } from "react";
import { MdBarChart } from "react-icons/md";
import OrganizationForm from "./Form/LocationForm";

function Index() {

  const [modal,setModal]=useState(false);


  const handleModalOnclick = ()=>{
    setModal(true)
  }
 

  return (
    <div>
     {!modal && (
       <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center mt-8">
       <div className="mb-auto flex items-center justify-between px-6">
         <h2 className="text-lg font-bold text-navy-700 dark:text-white">
           <form class="mx-auto max-w-md">
             <label
               for="default-search"
               class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
             >
               Search
             </label>
             <div class="relative">
               <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                 <svg
                   class="h-4 w-4 text-gray-500 dark:text-gray-400"
                   aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg"
                   fill="none"
                   viewBox="0 0 20 20"
                 >
                   <path
                     stroke="currentColor"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     stroke-width="2"
                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                   />
                 </svg>
               </div>
               <input
                 type="search"
                 id="default-search"
                 class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                 placeholder="Search Location..."
                 required
               />
             </div>
           </form>
         </h2>
         <button className="!linear text-dark-500 z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 font-semibold !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"  onClick={()=>handleModalOnclick()}>
           ADD LOCATION
         </button>
       </div>
       </Card>
     )}
        { modal && <OrganizationForm  setModal={setModal}/>}
     
    </div>
  );
}

export default Index;
