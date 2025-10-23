import React from 'react'

function CheckoutSumarryCard({cartItems, step, onNext}) {
  const totalHarga = cartItems.reduce(
    (sum, item) => sum + item.book.price_cents * item.quantity,
    0
  );

    const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className='bg-white shadow-md rounded-xl p-4'>
      
    </div>
  )
}

export default CheckoutSumarryCard