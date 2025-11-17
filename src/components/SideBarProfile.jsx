import { NavLink, useNavigate } from "react-router-dom";
import { RiFileList3Line, RiUser3Line, RiStarSmileLine, RiLogoutCircleRLine } from "react-icons/ri";
import { FaMapLocationDot } from "react-icons/fa6"
import { toast } from "react-hot-toast";


function SideBarProfile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Berhasil Logout")
    navigate("/login")
  }

  const menuItems = [
    { label : "Akun", icon : <RiUser3Line size={20}/>, path : "/profile/akun"},
    { label : "Ulasan", icon : <RiStarSmileLine size={20}/>, path : "/profile/ulasan"},
    { label : "Transaksi", icon : <RiFileList3Line size={20}/>, path : "/profile/transaksi"},
    { label : "Alamat", icon : <FaMapLocationDot size={20}/>, path : "/profile/alamat"},
  ];

  return (
    <>
    {/* Sidebar PC */}
    <div className="hidden md:flex md:w-60 sticky top-20 self-start p-5 bg-[#FBF6EE] rounded-xl flex-col h-fit">
      <h2 className="text-lg font-semibold mb-5 text-gray-800">Profile Saya</h2>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <NavLink
          key={index}
          to={item.path}
          className={ ({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
            isActive ? "font-bold text-[#da8127]" : "text-[#757575] hover:text-[#da8127] "
          }`}
          > {item.icon} <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

          <hr className="border-gray-400 my-3"/>

      <button
      onClick={handleLogout}
      className="mt-auto flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-100 transition cursor-pointer"
      >
        <RiLogoutCircleRLine/> 
        <span>Logout</span>
      </button>
    </div>

    {/* Bottom bar for mobile */}
    <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 flex justify-around py-2 z-50">
      {menuItems.map((item, index) => (
        <NavLink
        key={index}
        to={item.path}
        className={({isActive}) => 
          `flex flex-col items-center justify-center text-xs ${
            isActive ? "text-[#da8127]" : "text-gray-500"
          }`
        }
        >
          {item.icon}
          <span className="text-[10px]">{item.label}</span>
        </NavLink>
      ))}

      <button 
      onClick={handleLogout}
      className="flex flex-col items-center text-xs text-red-500">
        <RiLogoutCircleRLine size={22} />
        <span className="text-[10px]">Logout</span>
      </button>
    </div>
    </>
  )
}

export default SideBarProfile;