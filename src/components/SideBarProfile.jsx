import { NavLink, useNavigate } from "react-router-dom";
import { RiFileList3Line, RiUser3Line, RiStarSmileLine, RiLogoutCircleRLine } from "react-icons/ri";
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
  ];

  return (
    <div className="w-60 h-full p-5 backdrop-blur-md bg-[##f5f5f5]  rounded-xl flex flex-col ">
      <h2 className="text-lg font-semibold mb-5 text-gray-800">Profile Saya</h2>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <NavLink
          key={index}
          to={item.path}
          className={ ({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-md transition ${
            isActive ? "font-bold text-black" : "text-gray-700 hover:cursor-pointer"
          }`}
          > {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>

          <hr className="border-gray-400 my-2"/>

      <button
      onClick={handleLogout}
      className="mt-auto flex items-center gap-3 px-4 py-2 rounded-md text-red-600 hover:bg-red-100 transition cursor-pointer"
      >
        <RiLogoutCircleRLine/> Logout
      </button>
    </div>
  )
}

export default SideBarProfile;