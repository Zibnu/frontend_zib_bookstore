import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Admin/components/Sidebar'

function AdminLayout() {
  return (
    <div className='min-h-screen flex bg-[#FBF6EE]'>
      <Sidebar/>
      <main className='flex-1 p-6 overflow-y-auto'>
        <Outlet/>
      </main>
    </div>
  )
}

export default AdminLayout