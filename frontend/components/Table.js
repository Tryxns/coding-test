import { useState, useEffect } from 'react';
import SalesModal from './SalesModal';



const Table = ({datatable, filterName, filterRole})=>{


  return (
    <div className='relative overflow-x-auto '>
      <div class="flex">
        {/* Filter Sales Reps */}
        <div className="pb-4 bg-white">
            <label htmlFor="search-name" className="">Find Sales Reps</label>
            <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text" id="search-name" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Find Sales Reps" onChange={filterName}/>
            </div>
        </div>

        {/* Filter Role */}
        <div className="pb-4 bg-white ml-2">
            <label htmlFor="search-role" className="">Find Role</label>
            <div className="relative mt-1">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="text" id="search-role" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Find Role" onChange={filterRole}/>
            </div>
        </div>
      </div>




      <table className="text-left rtl:text-right text-gray-500 dark:text-gray-400" id="tableSales">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope="col" className='px-6 py-3'>Name</th>
            <th scope="col" className='px-6 py-3'>Role</th>
            <th scope="col" className='px-6 py-3'>Region</th>
            {/* <th scope="col" className='px-6 py-3'>Action</th> */}
            <th scope="col" className='px-6 py-3'>Skills</th>
            <th scope="col" className='px-6 py-3'>Deals</th>
            <th scope="col" className='px-6 py-3'>Clients</th>
          </tr>

        </thead>
        <tbody>
          {
            datatable.map((val)=>(
              <tr key={val.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                <td className='px-6 py-4'>{val.name}</td>
                <td className='px-6 py-4'>{val.role}</td>
                <td className='px-6 py-4'>{val.region}</td>
                <td className='px-6 py-4'>
                  <ul>
                  {val.skills.map((skill, idx)=>(                    
                    <li key={idx}>{skill}</li>                    
                  ))}
                  </ul>
                </td>
                <td className='px-6 py-4'>
                  <ul>
                  {val.deals.map((deal, idx)=>(                    
                    <li key={idx}>{deal.client} : {deal.value} ({deal.status})</li>
                  ))}
                  </ul>
                </td>
                <td className='px-6 py-4'>
                  <ul>
                    {val.clients.map((client, idx)=>(                      
                      <li key={idx}>{client.name} : {client.industry} ({client.contact})</li>                      
                    ))}
                  </ul>
                </td>
                {/* <td className='px-6 py-4'>
                  <button role="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" id={val.id} onClick={(event)=>{selectSales(event)}}>
                    Detail
                  </button>
                </td> */}
              </tr>
            ))
          }
        </tbody>
      </table>
      
    </div>
  )
}
export default Table;