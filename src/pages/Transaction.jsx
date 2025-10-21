import React, { useEffect, useState } from "react";
import apiServices from "../utils/api";
import { toast } from "react-hot-toast";
import SideBarProfile from "../components/SideBarProfile";
import TidakAdaTransaksi from "../assets/images/tidak ada transaksi.avif";

function Transaction() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatTanggal = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }

      const res = await apiServices.get("/order/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const orderData = res.data.data.orders;

      const updateOrders = await Promise.all(
        orderData.map(async (order) => {
          try {
            const shipRes = await apiServices.get(
              `/shipment/log-order/${order.id_order}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            return { ...order, shipment: shipRes.data.data };
          } catch (error) {
            console.error(error);
            return { ...order, shipment: null };
          }
        })
      );
      setOrders(updateOrders);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">
        Memuat Transaksi....
      </div>
    );

  return (
    <div className="min-h-screen flex bg-[#f5f5f5]">
      <SideBarProfile />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Transaksi</h2>

        {orders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow flex items-center justify-center text-center gap-10">
            <img
              src={TidakAdaTransaksi}
              alt="Belum Ada Transaksi"
              className="w-3xs h-auto object-contain opacity-70 mb-4"
            />
            <div className="text-left">
              <p className="text-lg font-medium">Belum Ada Transaksi</p>
              <p className="text-sm text-gray-500 mb-4">
                Yuk Mulai Berbelanja Buku Favorit Kamu!
              </p>
              <a
                href="/"
                className="px-4 py-2 bg-[#96A78D] text-white rounded-md hover:bg-[#7f9573]"
              >
                Mulai Belanja
              </a>
            </div>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id_order}
              className="bg-white p-5 rounded-xl shadow mb-4 border border-gray-200 hover:shadow-md transition"
            >
              {/* Header Order */}
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                  ID Pesanan : {order.id_order}
                </p>
                <p className="text-sm text-gray-500">
                  {formatTanggal(order.createdAt)}
                </p>
              </div>

              {order.orderItems.map((item) => (
                <div
                  key={item.id_order_items}
                  className="flex gap-4 mb-3 border-b pb-3"
                >
                  <img
                    src={item.book.cover_path}
                    alt={item.book.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.book.title}</p>
                    <p className="text-gray-600">
                      {item.quantity} x {formatRupiah(item.price_cent)}
                    </p>
                  </div>
                </div>
              ))}
              {/* Footer Info */}
              <div className="flex justify-between items-center mt-4">
                <p className="font-semibold text-lg">
                  Total : {formatRupiah(order.total_cents)}
                </p>

                <div className="flex gap-2">
                  {/* Sts Payment */}
                  <span
                    className={`px-2 py-1 text-xs rounded capitalize
                ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-500"
                    : order.status === "paid"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-600"
                }
                `}
                  >
                    {order.status}
                  </span>

                  {/* sts Pengiriman */}
                  <span
                    className={`px-2 py-1 text-xs rounded capitalize
                ${
                  order.shipment?.status === "processing"
                    ? "bg-blue-100 text-blue-500"
                    : order.shipment?.status === "shipped"
                    ? "bg-indigo-200 text-indigo-600"
                    : order.shipment?.status === "delivery"
                    ? "bg-green-100 text-green-500"
                    : "bg-red-100 text-red-600"
                }
                `}
                  >
                    {order.shipment?.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transaction;
