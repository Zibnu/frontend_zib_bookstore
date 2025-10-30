import { Link , useNavigate} from "react-router-dom";
import { RiShoppingCartFill , RiSearch2Line } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";

function Navbar () {
  const [ searchQuery, setSearchQuery ] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      navigate(`/search?q=${encodeURI(searchQuery)}`);
      setSearchQuery("")
    }
  };

  return (
    <nav className="bg-[#2C3E2F] px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-lg font-bold text-[#FBF6EE] hover:text-[#da8127]">
        ZibBookStore
      </Link>

      {/* Category */}
      <Link to={"/category"} className="px-2 py-2 rounded-md transition text-[#FBF6EE] duration-200 hover:text-[#da8127]">
      Kategori
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center bg-[#FBF6EE] rounded-full px-4 py-1 w-[350px]">
        <RiSearch2Line size={14} className="mr-2"/>
        <input 
        type="text"
        placeholder="Cari Buku Favorit"
        value={searchQuery}
        onChange= {(e) => setSearchQuery(e.target.value)}
        className="bg-transparent outline-none text-sm w-full placeholder:text-[#757575]"
        />
      </form>

      {/* Icons */}
      <div className="flex gap-4">
        <Link to={ token ? "/cart" : "/login"} className="p-2 rounded-md transition text-[#FBF6EE] duration-200 hover:text-[#da8127]">
        <RiShoppingCartFill size={18}/>
        </Link>
        <Link to={ token ? "/profile/akun" : "/login"} className="p-2 rounded-md transition text-[#FBF6EE] duration-200 hover:text-[#da8127]">
        <MdAccountCircle size={18}/>
        </Link>
      </div>
    </nav>
  )
}
export default Navbar;