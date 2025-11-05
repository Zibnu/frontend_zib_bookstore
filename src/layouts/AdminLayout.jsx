import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Admin/components/Sidebar'

function AdminLayout() {
  return (
    <div className='min-h-screen flex flex-col bg-[#FBF6EE]'>
      <Sidebar/>
      <main className='flex-grow'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout