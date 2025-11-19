import React, { useEffect, useState } from 'react';
import TableUsers from '../components/TableUsers';
import apiServices from "../../utils/api";
import toast from "react-hot-toast";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { motion } from 'framer-motion';

function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await apiServices.get("/user/admin", {
        params : {page},
        headers : { Authorization : `Bearer ${token}`}
      });
      
      const pagination = res.data.data.pagination
      setUsers(res.data.data.users);
      setTotalPages(pagination.totalPages);
      setCurrentPage(pagination.currentPage);
      setLimit(pagination.itemsPerPage);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mendapatkan Data Users");
    } finally {
      setLoading(false);
    }
  };

  // console.log(users);

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleChangePage = (next) => {
    if(next && page < totalPages) setPage((p) => p + 1);
    if(!next && page) setPage((p) => p - 1);
  }

  return (
    <motion.div
    className='p-6 bg-white rounded-xl shadow'
    initial={{opacity : 0, y : 10}}
    animate={{opacity : 1, y : 0}}
    transition={{duration : 0.35}}
    >
      <h3 className="text-xl font-semibold mb-4">Registered Users</h3>

      <TableUsers
      users={users}
      // loading={loading}
      currentPage={currentPage}
      limit={limit}
      />

      <div className="flex items-center justify-center gap-3 mt-6">
        <button 
        disabled={page === 1}
        onClick={() => handleChangePage(false)}
        className="p-2 text-gray-600 hover:text-gray-700 cursor-pointer disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed">
          <MdNavigateBefore size={20}/>
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button 
        disabled={page === totalPages}
        onClick={() => handleChangePage(true)}
        className="p-2 text-gray-600 hover:text-gray-700 cursor-pointer disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed">
          <MdNavigateNext size={20}/>
        </button>
      </div>
    </motion.div>
  )
}

export default Users