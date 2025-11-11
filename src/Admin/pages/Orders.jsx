import React, { useEffect, useState } from 'react';
import apiServices from '../../utils/api';
import toast from 'react-hot-toast';
import TableOrders from '../components/TableOrders';
import UserAddressModal from '../components/UserAddressModal';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

function Orders() {
  const [orders, setOrders] = useState([]);
  // const [shipmentsMap, setShipmentsMap] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [shipmentStatus, setShipmentStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedShipmentForUserModal, setSelectedShipmentForUserModal] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const orderRes = await apiServices.get("/order/admin/all", {
        params : {
          page,
          limit : 12,
          shipment_status : shipmentStatus || undefined,
        },
        headers : {Authorization : `Bearer ${token}`},
      });
      
      const fetchOrders = orderRes.data?.data?.orders;
      const pagination = orderRes.data?.data?.pagination;
      // console.log(fetchOrders[0].orderItems[0].book.title);
      // console.log(fetchOrders.length); berisi 12

      // const shipmentsRes = await apiServices.get("/shipment/log-shipment", {
      //   params : {
      //     page,
      //     limit : 12,
      //     search : search || undefined
      //   },
      //   headers : { Authorization : `Bearer ${token}`},
      // });
      
      // const shipments = shipmentsRes.data?.data?.shipment;

      // const map = {};
      // shipments.forEach((shipment) => {
      //   if(shipment.order_id) map[shipment.order_id] = shipment;
      // });

      // const filteredOrders = search ? fetchOrders.filter(order => map[order.id_order]) : fetchOrders;

      setOrders(fetchOrders);
      setTotalPages(pagination.totalPages);
      setLimit(pagination.itemsPerPage)
      setCurrentPage(pagination.currentPage)
      // console.log(pagination.itemsPerPage)

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengambil Data Orders");
    } finally{
      setLoading(false);
    };
  }

  useEffect(() => {
    fetchData();
  }, [page, shipmentStatus]);

  const handleChangePage = (next) => {
    if(next && page < totalPages) setPage((p) => p + 1)
    if(!next && page > 1) setPage((p) => p - 1)
  }

  const handleStatusChange = (e) => {
    setShipmentStatus(e.target.value);
    setPage(1);
  };

  const handleOpenUserModal = (shipment) => {
    setSelectedShipmentForUserModal(shipment);
  };

  const handleCloseUserModal = () => setSelectedShipmentForUserModal(null);

  // const refresh = () => fetchData();

  return (
    <div className='p-6 bg-white rounded-xl shadow'>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">All Orders User</h3>

        <select 
        value={shipmentStatus} 
        onChange={handleStatusChange}
        className='border border-gray-300 rounded-lg px-3 py-2 text-sm w-60 bg-white focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
        >
          <option value="">Filter Status</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivery">Delivery</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <TableOrders
      orders={orders}
      // shipmentsMap={shipmentsMap}
      onUpdateSuccess={fetchData}
      onOpenUserModal={handleOpenUserModal}
      loading={loading}
      currentPage={currentPage}
      limit={limit}
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