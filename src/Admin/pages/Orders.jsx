import React, { useEffect, useState } from 'react';
import apiServices from '../../utils/api';
import toast from 'react-hot-toast';
import TableOrders from '../components/TableOrders';
import UserAddressModal from '../components/UserAddressModal';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [shipmentsMap, setShipmentsMap] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedShipmentForUserModal, setSelectedShipmentForUserModal] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const orderRes = await apiServices.get("/order/admin/all", {
        params : {page},
        headers : {Authorization : `Bearer ${token}`},
      });

      let fetchOrders = orderRes.data?.data?.orders;
      const pagination = orderRes.data?.data?.pagination.totalPages;
      // console.log(fetchOrders[0].orderItems[0].book.title);

      const shipmentsRes = await apiServices.get("/shipment/log-shipment", {
        headers : { Authorization : `Bearer ${token}`},
      });
      const shipments = shipmentsRes.data?.data?.shipment;
      const map = {};
      shipments.forEach((shipment) => {
        if(shipment.order_id) map[shipment.order_id] = shipment;
      });
      setShipmentsMap(map);

      if(statusFilter){
        fetchOrders = fetchOrders.filter(order => {
          const shipment = map[order.id_order];
          return shipment && shipment.status === statusFilter;
        });
      }

      setOrders(fetchOrders);
      setTotalPages(pagination);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengambil Data Orders");
    } finally{
      setLoading(false);
    };
  }

  useEffect(() => {
    fetchData();
  }, [page, statusFilter]);

  const handleChangePage = (next) => {
    if(next && page < totalPages) setPage((p) => p + 1)
    if(!next && page > 1) setPage((p) => p - 1)
  }

  const handleStatusFilterClick = (status) => {
    setPage(1);
    setStatusFilter((prev) => (prev === status ? "" : status));
  }

  const handleOpenUserModal = (shipment) => {
    setSelectedShipmentForUserModal(shipment);
  };

  const handleCloseUserModal = () => setSelectedShipmentForUserModal(null);

  // const refresh = () => fetchData();

  return (
    <div className='p-6 bg-white rounded-xl shadow'>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">All Orders User</h3>

        <div className="flex items-center gap-2">
          {["processing", "shipped", "delivery", "canceled"].map((status) => (
            <button 
            key={status}
            onClick={() => handleStatusFilterClick(status)}
            className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer transition
              ${statusFilter === status ? "bg-[#da8127] text-white" : "bg-gray-100 text-gray-700 hover:bg-[#da8127] hover:text-white"}
              `}
            >
              {status[0].toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <TableOrders
      orders={orders}
      shipmentsMap={shipmentsMap}
      onUpdateSuccess={fetchData}
      onOpenUserModal={handleOpenUserModal}
      loading={loading}
      />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-6">
        <button 
        disabled={page === 1}
        onClick={() => handleChangePage(false)}
        className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed">
          <MdNavigateBefore size={20}/>
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button 
        disabled={page === totalPages}
        onClick={() => handleChangePage(true)}
        className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed">
          <MdNavigateNext size={20}/>
        </button>

        {/* Modal */}
        <UserAddressModal
        isOpen={!!selectedShipmentForUserModal}
        shipment={selectedShipmentForUserModal}
        onClose={handleCloseUserModal}
        />
      </div>
    </div>
  )
}

export default Orders