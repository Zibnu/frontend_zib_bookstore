import React from 'react'

function CartSummaryCard({total}) {
  const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className='bg-gray-50 shadow-md rounded-md p-6 sticky top-20'>
      <h3 className="font-semibold text-lg mb-4">Ringkasan Keranjang</h3>

      <div className="flex justify-between mb-2 text-gray-700">
        <span>Total Harga</span>
        <span>{formatRupiah(total)}</span>
      </div>

      <div className="flex justify-between font-semibold mt-4 text-lg">
        <span>Subtotal</span>
        <span>{formatRupiah(total)}</span>
      </div>

      <div className="mt-6 w-full bg-[#B6CEB4] text-black font-semibold text-center px-3 py-2 rounded-md cursor-pointer hover:bg-[#a3c1a0] transition">
        Checkout
      </div>
    </div>
  )
}

export default CartSummaryCard