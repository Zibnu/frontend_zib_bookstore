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
    <div className="w-60 h-full p-5 backdrop-blur-md bg-[##FBF6EE]  rounded-xl flex flex-col ">
      <h2 className="text-lg font-semibold mb-5 text-gray-800">Profile Saya</h2>

      <nav className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <NavLink
          key={index}
          to={item.path}
          className={ ({isActive}) => `flex items-center gap-3 px-4 py-2 rounded-md transition ${
            isActive ? "font-bold text-[#da8127]" : "text-[#757575] hover:text-[#da8127] "
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