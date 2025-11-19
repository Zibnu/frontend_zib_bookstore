import React from 'react'

function PaymentSummaryCard({totalBelanja, totalPengiriman, diskonPengiriman,totalPembayaran, totalBarang, address, onPay, isPaying}) {
    const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  return (
    <div className='bg-white rounded-xl shadow p-5'>
      <h2 className="text-lg text-[#333333] font-semibold mb-4">Ringkasan Pembayaran</h2>

      <div className="text-sm text-gray-700 space-y-2 mb-4">
        <p>Total Barang : {totalBarang}</p>
        { address && (
          <p>
            Alamat : {address.street}, {address.provinces}, {address.postal_code}
          </p>
        )}
      </div>

      <hr className="my-3" />

      <div className="text-sm text-gray-700 space-y-2">
        <p>Total Belanja : {formatRupiah(totalBelanja)}</p>
        <p>Total Pengiriman : {formatRupiah(totalPengiriman)}</p>
        <p className='text-red-500'>Diskon Pengiriman : {formatRupiah(diskonPengiriman)}</p>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between font-semibold text-[#da8127]">
        <span>Total Pembayaran</span>
        <span>{formatRupiah(totalPembayaran)}</span>
      </div>

      
      <button 
      onClick={onPay}
      disabled={isPaying}
      className="w-full bg-[#da8127] text-white py-3 rounded-lg hover:bg-[#b9671f] cursor-pointer transition">
        {isPaying ? "Memproses..." : "Bayar"} 
      </button>
    </div>
  )
}

export default PaymentSummaryCard