import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
      <div className='flex-1 overflow-y-auto'>
        <div className='p-4'><Outlet /></div>
      </div>
    </div>
  )
}
