import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCartFill, RiSearch2Line, RiCloseFill } from "react-icons/ri";
import { IoMenuSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useState } from "react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURI(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);//close menu when search active
    }
  };

  return (
    <nav className="bg-[#2C3E2F] text-[#FBF6EE] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        <button
          className="md:hidden text-[#FBF6EE] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <RiCloseFill size={20} /> : <IoMenuSharp size={20} />}
        </button>

        {/* Logo */}
        <Link to="/" className="text-lg font-bold hover:text-[#da8127]">
          ZibBookStore
        </Link>
        {/* Menu DC */}
        <div className="hidden md:flex items-center gap-6">
          {/* Category */}
          <Link
            to={"/categories"}
            className="px-3 py-2 rounded-md transition duration-200 hover:text-[#da8127]"
          >
            Kategori
          </Link>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-[#FBF6EE] text-[#2C3E2F] rounded-full px-4 py-1 w-[350px]"
          >
            <RiSearch2Line size={14} className="mr-2" />
            <input
              type="text"
              placeholder="Cari Buku Favorit"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm w-full placeholder:text-[#757575]"
            />
          </form>

          {/* Icons */}
          <div className="flex gap-4">
            <Link
              to={token ? "/cart" : "/login"}
              className="p-2 rounded-md transition text-[#FBF6EE] duration-200 hover:text-[#da8127]"
            >
              <RiShoppingCartFill size={18} />
            </Link>
            <Link
              to={token ? "/profile/akun" : "/login"}
              className="p-2 rounded-md transition text-[#FBF6EE] duration-200 hover:text-[#da8127]"
            >
              <MdAccountCircle size={18} />
            </Link>
          </div>
        </div>
      </div>
      <div className="md:hidden px-4 pb-3">
          <form 
          onSubmit={handleSearch}
          className="flex items-center bg-[#FBF6EE] text-[#2C3E2F] rounded-full px-4 py-2 m-4">
            <RiSearch2Line size={16} className="mr-2"/>
            <input 
            type="text" 
            placeholder="Cari Buku Favorit" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-[#757575]"
            />
          </form>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-[#2C3E2F] border-t border-[#445c45]">
          <ul className="flex flex-row justify-between gap-3 px-6 py-4 text-sm">
            <li>
              <Link
              to="/categories"
              className="block py-1 hover:text-[#da8127]"
              onClick={() => setIsMenuOpen(false)}
              >
              Kategori
              </Link>
            </li>
            <li>
              <Link
              to={token ? "/cart" : "/login"}
              className="hover:text-[#da8127]"
              onClick={() => setIsMenuOpen(false)}
              >
              <RiShoppingCartFill size={18}/>
              </Link>
              </li>
              <li>
              <Link
              to={token ? "/profile/akun" : "/login"}
              className="hover:text-[#da8127]"
              onClick={() => setIsMenuOpen(false)}
              >
              <MdAccountCircle size={18}/>
              </Link>
              </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
export default Navbar;
