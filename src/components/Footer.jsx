import { FaFacebook, FaInstagram, FaXTwitter, FaPhone, FaEnvelope} from "react-icons/fa6"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-[#2C3E2F] text-[#FBF6EE] py-8 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="font-bold text-lg mb-2">ZibBookStore</h2>
          <p className="text-sm leading-relaxed opacity-90">Adalah rumah digital bagi para kutu buku. kami menyediakan antarmuka yang bersih dan proses pemesanan yang mudah</p>
        </div>

        {/* Site Map */}
        <div className="md:text-center">
          <h3 className="font-semibold text-lg mb-2">Site Map</h3>
          <ul className="space-y-1">
            <li>
              <Link
              to={"/"}
              className="hover:underline hover:text-[#da8127] transition-all">
              Home
              </Link>
            </li>
            <li>
              <Link 
              to={"/categories"}
              className="hover:underline hover:text-[#da8127] transition-all"
              >
              Kategori
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:text-right">
          <h3 className="font-semibold text-lg mb-3">Kontak</h3>
          <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 justify-start md:justify-end">
            <FaPhone/> +62-1231-4812-9932 
          </p>
          <p className="flex items-center gap-2 justify-start md:justify-end">
            <FaEnvelope/> zibbookstore@seller.com 
          </p>
          </div>

          {/* Social icon */}
          <div className="flex gap-4 mt-3 justify-start md:justify-end text-lg">
            <Link to={"https://www.facebook.com/share/16gsQ8ojgU/"} className="hover:text-[#da8127] transition">
            <FaFacebook/>
            </Link>
            <Link to={"https://x.com/Zibnu_oi?t=5CHOHrHiuP_LuSRbCNiNRg&s=09"} className="hover:text-[#da8127] transition">
            <FaXTwitter/>
            </Link>
            <Link to={"https://www.instagram.com/neo_phoenix_kt"} className="hover:text-[#da8127] transition">
            <FaInstagram/>
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-gray-500 my-6"/>
      {/*  Copyright*/}
      <div className="text-center text-xs opacity-60">
        <p> &copy; {new Date().getFullYear()} ZibBoostore</p>
      </div>
    </footer>
  )
}

export default Footer