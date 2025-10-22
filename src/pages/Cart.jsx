import React, { useEffect, useState } from 'react'
import CartItemCard from '../components/CartItemCard'
import CartSummaryCard from '../components/CartSummaryCard'
import apiServices from '../utils/api'
import empyCart from "../assets/images/keranjangKosong.png"
import toast from 'react-hot-toast'
import { RiDeleteBin6Fill } from "react-icons/ri";

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState([])

  const fetchCart = async () => {
    try {
      const res = await apiServices.get("/cart/myCart", {
        headers : { Authorization : `Bearer ${localStorage.getItem("token")}`},
      });
      setCartItems(res.data.data)
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Keranjang");
      console.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocalUpdate = (id_cart, newQuantity) => {
    setCartItems((prev) => 
      prev.map((item) => 
        item.id_cart === id_cart
        ? {...item, quantity : newQuantity}
        : item
      )
    )
  }

  const handleSelect = (id_cart) => {
    setSelectedItems((prev) => 
      prev.includes(id_cart)
    ? prev.filter((id) => id !== id_cart)
    : [...prev, id_cart]
    )
  }

  const handleSelectAll = () => {
    if(selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id_cart))
    }
  }

  const handleClearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }

      await apiServices.delete("/cart/clear", {
        headers : { Authorization : `Bearer ${token}`}
      })

      toast.success("Semua Buku Berhasil Dihapus Dari Keranjang")
      setSelectedItems([])
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Menghapus Semua Item")
      console.error(error.response?.data?.message)
    }
  }

  const handleLocalDelete = (id_cart) => {
    setCartItems((prev) => prev.filter( item => item.id_cart !== id_cart));
  };

  useEffect(() => {
    fetchCart();
  }, [])

  const total = cartItems
  .filter(item => selectedItems.includes(item.id_cart))
  .reduce((acc, item) => acc + item.book.price_cents * item.quantity,0)

  if(loading) return <div className="text-gray-500 text-center text-sm">Loading Cart ..... </div>

  return (
    <div className='min-h-screen  bg-gray-50 p-8'>
      <h1 className="text-2xl font-bold mb-6">Keranjang</h1>

      <div className="flex gap-6 items-center">
        {/* Daftar Item */}
        <div className="flex-1 space-y-4">
          { cartItems.length > 0 ? (
            <>
            <div className="flex items-center gap-2 mb-4 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <input 
              type="checkbox" 
              checked={selectedItems.length === cartItems.length && cartItems.length > 0}
              onChange={handleSelectAll}
              className='w-4 h-4 accent-[#96A78D] cursor-pointer'
              />
              <span className="text-gray-700 font-medium">Pilih Semua</span>
              <button 
              onClick={handleClearCart}
              className="ml-auto text-red-500 text-sm  flex gap-2 hover:bg-gray-300 rounded transition">
                <RiDeleteBin6Fill size={18}/> Hapus Semua
              </button>
            </div>

            { cartItems.map((item, index) => (
              <div key={item.id_cart}>
                <CartItemCard
                item={item}
                onUpdate={handleLocalUpdate}
                onDelete={handleLocalDelete}
                onSelect={handleSelect}
                isSelected={selectedItems.includes(item.id_cart)}
                />
                { index < item.length -1 && (
                  <hr className='border-gray-300 my-3'/>
                )}
              </div>
            ))}
            </>
          ) : (
          <div className="bg-white p-10 rounded-xl shadow flex items-center justify-center text-center gap-10">
            <img
              src={empyCart}
              alt="Keranjang Kosong"
              className="w-3xs h-auto object-contain opacity-70 mb-4"
            />
            <div className="text-left">
              <p className="text-lg font-medium">Keranjang Kamu Kosong</p>
              <p className="text-sm text-gray-500 mb-4">Kami mempunyai banyak buku yang siap menambah wawasan dan menghibur. Yuk Belanja Sekarang</p>
              <a 
              href="/"
              className='px-4 py-2 bg-[#96A78D] text-white rounded-md hover:bg-[#7f9573]'
              >
                Mulai Belanja
              </a>
            </div>
          </div>
          )}
        </div>

        <div className="w-[320px] self-start sticky top-20">
          <CartSummaryCard total={total}/>
        </div>
      </div>
    </div>
  )
}

export default Cart