import React from 'react';
import apiServices from "../../utils/api";
import StatCard from '../components/StatCard';
import RevenueChart from '../components/RevenueChart';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaShoppingBasket, FaBook} from "react-icons/fa";
import toast from "react-hot-toast"
import { useState } from 'react';
import { useEffect } from 'react';


function Dashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [revenueData, setRevenueData] = useState([]);

    const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiServices.get("/user/admin/", {
        headers : {Authorization : `Bearer ${token}`},
      });
      setUsersCount(res.data.data.pagination.totalItems);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengambil Total User");
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await apiServices.get("/books/all");
      setBookCount(res.data.data.pagination.totalItems);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengambil Total Buku");
    }
  }

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiServices.get("/order/admin/all", {
        headers : {Authorization : `Bearer ${token}`},
      });
      setOrdersCount(res.data.data.pagination.totalItems);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengambil Total Orders");
    }
  };

  const fetchRevenue = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiServices.get("/dashboard/revenue", {
        headers : { Authorization : `Bearer ${token}`},
      });
      setRevenueData(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengambil data Revenue");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBooks();
    fetchOrders();
    fetchRevenue();
  }, []);

  const earning = revenueData.reduce((sum, item) => sum + item.total, 0);


  return (
    <div className='bg-[#ffffff] p-6 rounded-xl shadow'>
      <h3 className="text-xl font-semibold mb-5">Overview</h3>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Users" value={usersCount} icon={PiUsersThreeFill} />
        <StatCard title="Total Books" value={bookCount} icon={FaBook} />
        <StatCard title="Total Orders" value={ordersCount} icon={FaShoppingBasket} />
        <StatCard title="Total Earning" value={formatRupiah(earning)} icon={FaMoneyBillTrendUp} />
      </div>

      <div className="mt-8">
      <RevenueChart
      data={revenueData}
      />
      </div>
    </div>
  )
}

export default Dashboard