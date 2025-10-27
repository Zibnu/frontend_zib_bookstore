import React from 'react'
import Dana from "../assets/images/Logo Dana - Copy.png";
import Ovo from "../assets/images/1024px-Logo_ovo_purple.svg - Copy.png";
import Gopay from "../assets/images/Logo GoPay Vector CDR dan PNG - Copy.png";
import apiServices from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"
import { useState } from 'react';

function PaymentSection({selectedItems, addressId}) {
  const navigate = useNavigate();
  const [ selectedMethod, setSelectedMethod] = useState(null);
  const [ isPaying, setIsPaying] = useState(false);

  const totalBelanja = selectedItems.reduce(
    (acc, item) => acc + item.book.price_cents * item.quantity,
    0
  );

  const totalPengiriman = 10000;
  const totalPembayaran = totalBelanja + totalPengiriman;

    const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePay = async () => {
    if(!selectedMethod) {
      toast.error("Silahkan Pilih Metode Pembayaran Terlebih Dahulu");
      return;
    }

    setIsPaying(true);

    try {
      const token = localStorage.getItem("token");
      if(!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }

      const orderRes = await apiServices.post("/order/create", {
        address_id : addressId,
        items : selectedItems.map((item) => ({
          book_id : item.book.id_book,
          quantity : item.quantity,
        })),
      }, {
        headers : { Authorization : `Bearer ${token}`},
      });

      const orderData = orderRes.data.data;
      
      const paymentRes = await apiServices.post("/payment/create", {
        order_id : orderData.id_order,
        payment_method : selectedMethod,
        quantity : totalPembayaran,
      }, {
        headers : { Authorization : `Bearer ${token}`},
      });

      if(paymentRes.data.success) {
        navigate("/profile/transaksi", {
          state : { order : orderData, payment : paymentRes.data.data},
        });
      };
    } catch (error) {
      toast(error.response?.data?.message || "Terjadi Kesalahan Saat Proses Pembayaran");
      console.error(error.response?.data?.message);
    } finally {
      setIsPaying(false);
    }
  };

  const paymentMethods = [
    { id : "dana", name : "Dana", icon : Dana},
    { id : "gopay", name : "Gopay", icon : Gopay},
    { id : "ovo", name : "Ovo", icon : Ovo}
  ]
  return (
    <div className='bg-white rounded-xl shadow p-5 mt-6'>
      <h2 className="text-lg font-semibold mb-5">Metode Pembayaran</h2>
      <div className="space-y-3">
        { paymentMethods.map((method) => (
          <label 
          key={method.id}
          className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer
            ${selectedMethod === method.id 
              ? "border-[#b9671f] bg-yellow-100" : "border-gray-300"
            }
            `}
          >
            <div className="flex items-center gap-3">
              <input 
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={ selectedMethod === method.name}
              onChange={() => setSelectedMethod(method.name)}
              className='accent-[#b9671f] w-4 h-4'
              />
              <img 
              src={method.icon}
              alt={method.name}
              className='w-8 h-8 object-contain'
              />
              <span className="font-medium">{method.name}</span>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-5 border-t pt-4 text-sm text-[#333333] space-y-2">
        <p>Total Belanja : {formatRupiah(totalBelanja)}</p>
        <p>Biaya Pengiriman : {formatRupiah(totalPengiriman)}</p>
      </div>

      <hr className="my-3" />

      <div className="flex justify-between font-semibold text-[#da8127] mb-5">
        <span>Total Pembayaran</span>
        <span>{formatRupiah(totalPembayaran)}</span>
      </div>

      <button 
      onClick={handlePay}
      disabled={isPaying}
      className="w-full bg-[#da8127] text-white py-3 rounded-lg hover:bg-[#b9671f] transition">
        {isPaying ? "Memproses..." : "Bayar"} 
      </button>
    </div>
  )
}

export default PaymentSection