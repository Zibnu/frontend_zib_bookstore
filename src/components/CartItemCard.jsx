// import React, { useState } from 'react'
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus, FaMinus} from "react-icons/fa6";
import apiServices from '../utils/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function CartItemCard({item, onUpdate, onDelete, onSelect, isSelected}) {
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token")
      if(!token) {
        toast.error("Silahkan Login Terlebih dahulu");
        navigate("/login");
        return;
      }
      await apiServices.delete(`/cart/delete/${item.id_cart}`, {
        headers : { Authorization : `Bearer ${token}`}
      });
      toast.success("Buku Berhasil Dihapus Dari Keranjang");
      onDelete(item.id_cart);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Menghapus Buku");
      console.error(error.response?.data?.message);
    }
  }

  const handleUpdateQuantity = async (newQuantity) => {
    if( newQuantity < 1) return;
    // setLoading(true)
    try {
      await apiServices.put(`/cart/update/quantity/${item.id_cart}`, {
        quantity : newQuantity
      }, {
        headers : { Authorization : `Bearer ${localStorage.getItem("token")}`}
      });
      onUpdate(item.id_cart , newQuantity);
      // setLoading(true)
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Update Stock")
    }
  }


  // if(loading) return <div className="text-center text-gray-600 text-sm">Loading Cart.....</div>

  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-lg sm:shadow-md p-4 rounded-xl gap-4'>
      {/* Info Buku */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
        <div className="flex items-center gap-3">
        <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(item.id_cart)}
        className="w-4 h-4 accent-[#da8127] cursor-pointer mt-1 sm:mt-0"
        />
        <img
        src={item.book.cover_path}
        alt={item.book.title}
        className='w-24 h-32 sm:w-20 sm:h-28 object-cover rounded-md'
        />
        </div>

        <div  className="flex flex-col justify-between">
          <h2 className="font-semibold text-base sm:text-lg text-[#333333]">{item.book.title}</h2>
          <p className="text-[#757575] text-sm">{item.book.author}</p>
          <p className="text-[#da8127] font-medium mt-1 sm:mt-2">
            {formatRupiah(item.book.price_cents)}
            </p>
        </div>
      </div>

      {/* Kontroll Quantity + Delete */}
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto border-t sm:border-none pt-3 sm:pt-0">
        <div className="flex items-center rounded-lg ">
        <button 
        onClick={handleDelete}
        // disabled={loading}
        className="text-red-500 hover:text-red-600 transition cursor-pointer">
          <RiDeleteBin6Fill size={18}/>
        </button>

          <button 
          // disabled={loading}
          onClick={() => handleUpdateQuantity(item.quantity -1)}
          className={`px-4 py-1 
          ${item.quantity === 1 
            ? "text-gray-200" : "text-gray-700 hover:text-black transition cursor-pointer"
          }
          `}>
            <FaMinus size={18}/>
          </button>
          <span className="px-4 text-gray-800">{item.quantity}</span>
          <button 
          // disabled={loading}
          onClick={() => handleUpdateQuantity(item.quantity +1)}
          className="px-4 py-1 text-gray-700 hover:text-black transition cursor-pointer">
            <FaPlus size={18}/>
          </button>
        </div>

      </div>
    </div>
  );
}

export default CartItemCard