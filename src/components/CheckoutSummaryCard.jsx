import React from "react";

function CheckoutSummaryCard({ cartItems, step, onNext }) {
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
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="font-semibold text-lg mb-4">Ringkasan Keranjang</h3>

      <div className="flex justify-between text-sm mb-2">
        <span>Total Harga ({cartItems.length} Barang)</span>
        <span>{formatRupiah(totalHarga)}</span>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total Belanja</span>
        <span>{formatRupiah(totalHarga)}</span>
      </div>

      {step === "shipping" && (
        <button
          onClick={onNext}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Lanjut Pembayaran
        </button>
      )}
    </div>
  );
}

export default CheckoutSummaryCard;
