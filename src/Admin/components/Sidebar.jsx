import React from 'react'
import { FaHome, FaBook, FaClipboardList, FaUsers} from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TbLayoutSidebarRightCollapse, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import {toast} from "react-hot-toast";
import { motion } from "framer-motion";
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Berhasil");
    navigate("/login");
  }

  const menuItems = [
    { path : "/admin/dashboard", name : "Home", icon : <FaHome/>},
    { path : "/admin/books", name : "Books", icon : <FaBook/>},
    { path : "/admin/orders", name : "Orders", icon : <FaClipboardList/>},
    { path : "/admin/users", name : "Users", icon : <FaUsers/>},
  ];

  return (
    <motion.div
    animate={{ width : isOpen ? 220 : 70}}
    className='h-screen bg-[#FBF6EE] p-3 flex flex-col rounded-xl relative'
    transition={{ duration : 0.3, type : "spring", damping : 15}}
    >
      <button
      onClick={() => setIsOpen(!isOpen)}
      className='absolute -right-3 top-6 bg-[#da8127] p-2 rounded-full shadow cursor-pointer'
      >
        {isOpen ? <TbLayoutSidebarLeftCollapse size={20}/> : <TbLayoutSidebarRightCollapse size={20}/>}
      </button>

      <div className="flex items-center gap-2 mb-8 mt-4 px-2">
        <span className="font-bold text-lg">{isOpen && "ZibBookStore"}</span>
      </div>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
          to={item.path}
          key={item.name}
          className={({isActive}) => 
            `flex items-center gap-3 px-4 py-2 rounded-md transition ${
            isActive ? "font-bold text-[#da8127]" : "text-[#757575] hover:text-[#da8127] "
          }`
        }
          >
            <span className='text-xl'>{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <hr className="border-gray-400 my-2" />

      {/* Log Out */}
      <button 
      onClick={handleLogout}
      className={`mt-2 flex items-center ${isOpen ? "gap-3 px-5 justify-start" : "justify-center px-0"} py-3 rounded-md text-red-600 hover:bg-red-100 transition cursor-pointer`}
      >
        <RiLogoutCircleRLine/>
        {isOpen && <span>Logout</span>}
      </button>
    </motion.div>
  )
}

export default Sidebar