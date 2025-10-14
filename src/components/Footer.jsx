import { FaFacebook, FaInstagram, FaXTwitter, FaPhone, FaEnvelope} from "react-icons/fa6"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-[#B6CEB4] py-2 px-10 mt-10">
      <div className="max-w-7xl mx-auto flex justify-between items-start text-sm text-black">
        {/* Brand */}
        <div>
          <h2 className="font-bold text-lg">ZibBookStore</h2>
          <p className="text-[12px] leading-tight mt-1">Website Jual Buku Terbesar <br /> Kedua Di Indonesia</p>
        </div>

        {/* Site Map */}
        <div>
          <h3 className="font-semibold mb-2">Site Map</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link
              to={"/"}
              className="px-2 py-1 rounded-md transition-all hover:underline">
              Home
              </Link>
            </li>
            <li>
              <Link 
              to={"/category"}
              className="px-2 py-1 rounded-md transition-all hover:underline"
              >
              Kategori
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-right">
          <h3 className="font-semibold mb-2">Kontak</h3>
          <p className="flex items-center gap-2 justify-end">
            <FaPhone/> +62-1231-4812-9932 
          </p>
          <p className="flex items-center gap-2 justify-end">
            <FaEnvelope/> zibbookstore@seller.com 
          </p>

          {/* Social icon */}
          <div className="flex gap-4 justify-end mt-2 text-lg">
            <Link to={"https://www.facebook.com/share/16gsQ8ojgU/"} className="hover:opacity-70 transition">
            <FaFacebook/>
            </Link>
            <Link to={"https://x.com/Zibnu_oi?t=5CHOHrHiuP_LuSRbCNiNRg&s=09"} className="hover:opacity-70 transition">
            <FaXTwitter/>
            </Link>
            <Link to={"https://www.instagram.com/neo_phoenix_kt"} className="hover:opacity-70 transition">
            <FaInstagram/>
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-gray-400 my-2"/>
      {/*  Copyright*/}
      <div className="text-center text-xs mt-4">
        <p> &copy; {new Date().getFullYear()} ZibBoostore</p>
      </div>
    </footer>
  )
}

export default Footer