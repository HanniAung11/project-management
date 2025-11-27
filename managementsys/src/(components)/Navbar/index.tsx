import React from 'react'
import {Menu, Search, Settings, User} from "lucide-react"
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { useGetAuthUserQuery } from '@/state/api'
import { signOut } from 'aws-amplify/auth'
import Image from 'next/image'
const Navbar = () => {
    const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const {data:currentUser}=useGetAuthUserQuery();
  const handleSignOut=async()=>{
  try{
    await signOut();
  }catch(error){
    console.error("Error signing out:",error);
  }
  }
  // Don't return null - show navbar even while loading
  // The AuthProvider will handle showing login form when not authenticated
  const currentUserDetails=currentUser?.userDetails;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white px-2 sm:px-4 py-2 sm:py-3 dark:bg-black gap-2 sm:gap-0">
        {/* Search Bar */}
      <div className="flex items-center gap-2 sm:gap-8 w-full sm:w-auto">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
            className="p-1 sm:p-0"
          >
            <Menu className="h-6 w-6 sm:h-8 sm:w-8 dark:text-white" />
          </button>
        )}
        <div className="relative flex h-min w-full sm:w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="w-full rounded border-none bg-gray-100 p-1.5 sm:p-2 pl-6 sm:pl-8 text-sm sm:text-base placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>


        {/* icons */}
        <div className="flex items-center gap-1 sm:gap-0">
            <Link
          href="/settings"
          className="h-min w-min rounded p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Settings className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer text-gray-800 dark:text-white" />
        </Link>
            <div className="ml-1 sm:ml-2 mr-2 sm:mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
            <div className="hidden items-center justify-between md:flex">
              <div className="align-center flex h-8 w-8 sm:h-9 sm:w-9 justify-center">
                {
                  !!currentUserDetails?.profilePictureUrl?(
                    <Image 
                       src={`/${currentUserDetails?.profilePictureUrl}`}
                       alt={currentUserDetails?.username || "User Profile Picture"}
                       width={100}
                       height={50}
                       className="h-full rounded-full object-cover"
                        />
                  ):(
                    <User className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer self-center rounded-full dark:text-white"/>
                  )
                }
              </div>
              <span className="mx-2 sm:mx-3 text-sm sm:text-base text-gray-800 dark:text-white">
                {currentUserDetails?.username}
              </span>
              <button className="rounded bg-pink-400 px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white hover:bg-pink-500"
              onClick={handleSignOut}>
                Sign out
              </button>
            </div>
        </div>
    </div>
  )
}

export default Navbar