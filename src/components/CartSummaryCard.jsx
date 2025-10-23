import React from 'react'
import { useNavigate } from 'react-router-dom';

function CartSummaryCard({total, selectedCount, selectedItems}) {
  const navigate = useNavigate();

  const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleCheckout = () => {
    if(selectedCount === 0) return;

    // Melihat Buku yang ter checkcout
    // const selectedBook = cartItems.filter((item) => 
    //     selectedItems.includes(item.id_cart)
    // )

    // console.log("Buku Yang tercheckout")
    // selectedBook.forEach((book) => {
    //   console.log(`${book.book.title}`)
    // });
    localStorage.setItem("selectedCart", JSON.stringify(selectedItems))
    navigate("/checkout")
  }

  const isDisabled = selectedCount === 0;
  
  return (
    <div className='bg-white shadow-md rounded-xl p-5 border border-gray-100'>
      <h3 className="font-semibold text-lg mb-4">Ringkasan Keranjang</h3>

      <div className="flex justify-between mb-4 text-gray-700">
        <span>Total Harga</span>
        <span className='font-semibold'>{formatRupiah(total)}</span>
      </div>

      <div className="flex justify-between font-semibold mt-4 text-lg">
        <span>Subtotal</span>
        <span>{formatRupiah(total)}</span>
      </div>

      <button 
      onClick={handleCheckout}
      disabled={isDisabled}
      className={`mt-6 w-full  font-semibold text-center px-3 py-2 rounded-md transition
      ${isDisabled
        ? "text-gray-300 bg-gray-100 cursor-not-allowed" : "text-black bg-[#B6CEB4] hover:hover:bg-[#a3c1a0] cursor-pointer"
      }
      `}>
        Checkout
      </button>
    </div>
  )
}

export default CartSummaryCard