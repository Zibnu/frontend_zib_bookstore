import React from 'react'
import apiServices from '../../utils/api'
import { VscEye } from "react-icons/vsc";
import toast from 'react-hot-toast';


function TableOrders({orders = [], shipmentsMap = {}, onUpdateSuccess, onOpenUserModal, loading}) {
    const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleStatusChange = async (shipmentId, newStatus) => {
    try {
      if(!shipmentId) return toast.error("Shipment Not Found");
      const token = localStorage.getItem("token");
      await apiServices.put(`/shipment/update/${shipmentId}`, {status : newStatus}, {
        headers : { Authorization : `Bearer ${token}`},
      });
      toast.success("Status Update");
      onUpdateSuccess();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Menganti Status Orders");
    }
  };

  if(loading) return <div className="text-center text-sm text-gray-400">Loading Data Orders...</div>

  return (
    <div className='w-full overflow-x-auto mt-4'>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='bg-gray-100 text-gray-500 text-left'>
            <th className="p-3 border border-gray-300">No</th>
            <th className="p-3 border border-gray-300">User</th>
            <th className="p-3 border border-gray-300">Books</th>
            <th className="p-3 border border-gray-300">Total</th>
            <th className="p-3 border border-gray-300">Status</th>
            <th className="p-3 border border-gray-300">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className='p-4 text-center to-gray-500'>Data Orders is Not Availabe Yet</td>
            </tr>
          ) : (
            orders.map((order, index) => {
              const shipment = shipmentsMap[order.id_order] || null;
              // console.log(shipment);
              // const booksList = (order.orderItems || []).map((item) => {
              //   const title = item.book?.title || "Buku Tidak Tersedia"
              //   return `${title} : ${item.quantity}x `;
              // }).join(" , ");
              // console.log(booksList);

              return (
                <tr key={order.id_order} className='border hover:bg-gray-50 align-top'>
                  <td className="p-3 border border-gray-300 align-middle">{index + 1}</td>
                  <td className="p-3 border border-gray-300 align-middle">{order.user?.username || "-"}</td>
                  <td className="p-3 border border-gray-300 align-middle max-w-[340px] break-words">
                    {(order.orderItems).map((item, index) => (
                      <div key={index} className="mb-1">
                        {item.book?.title || "Book Has Deleted"} Qty : {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 border border-gray-300 align-middle">{formatRupiah(order.total_cents)}</td>
                  <td className="p-3 border border-gray-300 align-middle">
                    {/* sts dropdown */}
                    <select
                    value={shipment?.status}
                    onChange={(e) => handleStatusChange(shipment?.id_shipment, e.target.value)}
                    className='px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
                    >
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivery">delivery</option>
                      <option value="canceled">canceled</option>
                      {(!shipment) && <option value="unknown">unknown</option>}
                    </select>
                  </td>
                  <td className="p-3 border border-gray-300 align-middle text-center">
                    <button 
                    onClick={() => onOpenUserModal(shipment)}
                    className="text-[#da8127] hover:text-[#b9671f] cursor-pointer">
                      <VscEye/>
                    </button>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableOrders