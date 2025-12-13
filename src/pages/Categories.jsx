import React, { useEffect, useState } from 'react'
import economyIcon from "../assets/images/iconEconomy.png";
import biografiIcon from "../assets/images/iconBiografi.png";
import puisiIcon from "../assets/images/iconPuisi.png";
import komikIcon from "../assets/images/comic.png";
import sejarahIcon from "../assets/images/iconSejarah.png";
import cerpenIcon from "../assets/images/iconCerpen.png";
import apiServices from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Sejarah : sejarahIcon,
  Cerpen : cerpenIcon,
  Komik : komikIcon,
  Puisi : puisiIcon,
  Biografi : biografiIcon,
  Ekonomi : economyIcon,
}

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true)
      try {
        const res = await apiServices.get("/categories/");
        setCategories(res.data?.data || []);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Category");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  },[])

  if(loading) return <div className="text-sm text-center text-[#96A78D]">Loading data category....</div>
  return (
    <div className='min-h-screen w-full bg-[#FBF6EE] px-6 py-10'>
      <h2 className="text-2xl font-bold mb-8">Kategori</h2>

      <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div 
          key={category.id_category}
          onClick={() => navigate(`/category/${category.id_category}`)}
          className="cursor-pointer shadow-sm rounded-lg bg-[#FFFFFF] border hover:shadow-md transition p-4 flex flex-col items-center text-center hover:scale-105">
            <img 
            src={iconMap[category.name_category]}
            alt={category.name_category}
            className='w-20 h-20 object-contain mb-3'
            />
            <p className="font-semibold text-gray-700 text-sm">{category.name_category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories