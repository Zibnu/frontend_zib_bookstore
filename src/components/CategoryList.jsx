import { Link } from "react-router-dom";
import economyIcon from "../assets/images/iconEconomy.png";
import biografiIcon from "../assets/images/iconBiografi.png";
import puisiIcon from "../assets/images/iconPuisi.png";
import komikIcon from "../assets/images/comic.png";
import sejarahIcon from "../assets/images/iconSejarah.png";
import cerpenIcon from "../assets/images/iconCerpen.png";
import { useEffect, useState } from "react";
import apiServices from "../utils/api";
import toast from "react-hot-toast";

const iconMap = {
  Sejarah : sejarahIcon,
  Cerpen : cerpenIcon,
  Komik : komikIcon,
  Puisi : puisiIcon,
  Biografi : biografiIcon,
  Ekonomi : economyIcon,
};
function CategoryList() {
  const [categories, setCategories] = useState([]);
  // const [error , setError] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true)
      try {
        const res = await apiServices.get("/categories/")
        setCategories(res.data?.data || [])
      } catch (error) {
        console.error("Error Ketika mengambil Category", error);
        toast.error(error.message || "Gagal Mengambil Testimony");
      } finally {
        setLoading(false)
      }
    };
    fetchCategory();
  }, [])
  // console.log(categories);

  if(loading) return <div className="text-center text-[#96A78D]">Loading data category .....</div>
  // if(error) return <div className="text-center text-red-700">ERROR : {error}</div>
  
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {categories.map((category) => (
          <Link 
          key={category.id_category}
          to={`/category/${category.id_category}`}
          className="flex flex-col items-center transition hover:scale-105"
          >
          <div className="bg-white shadow p-3 rounded-xl">
            <img 
            src={iconMap[category.name_category]} 
            alt={category.name}
            className="w-16 h-16 object-contain"
            />
          </div>
          <span className="mt-2 text-sm font-medium">{category.name_category}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryList