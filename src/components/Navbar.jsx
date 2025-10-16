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
      navigate(`/search?query=${encodeURI(searchQuery)}`);
      setSearchQuery("")
    }
  };

  return (
    <nav className="bg-[#b6ceb4] px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-lg font-bold text-gray-900">
        ZibBookStore
      </Link>

      {/* Category */}
      <Link to={"/category"} className="px-2 py-2 rounded-md transition duration-200 hover:bg-[#9BB99A]">
      Kategori
      </Link>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex items-center bg-[#F7F8E8] rounded-full px-4 py-1 w-[350px]">
        <RiSearch2Line size={14} className="mr-2"/>
        <input 
        type="text"
        placeholder="Cari Buku Favorit"
        value={searchQuery}
        onChange= {(e) => setSearchQuery(e.target.value)}
        className="bg-transparent outline-none text-sm w-full"
        />
      </form>

      {/* Icons */}
      <div className="flex gap-4">
        <Link to={ token ? "/cart" : "/login"} className="p-2 rounded-md transition duration-200 hover:bg-[#9BB99A]">
        <RiShoppingCartFill size={18}/>
        </Link>
        <Link to={ token ? "/profile" : "/login"} className="p-2 rounded-md transition duration-200 hover:bg-[#9BB99A]">
        <MdAccountCircle size={18}/>
        </Link>
      </div>
    </nav>
  )
}
export default Navbar;