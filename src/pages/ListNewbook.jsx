import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import apiServices from '../utils/api'
import toast from 'react-hot-toast';
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';

function ListNewbook() {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage : 1,
    totalPages : 1,
  });
  const [loading, setLoading] = useState(false);

  const fetchBook = async (page = 1) => {
    setLoading(true);
    try {
      const res = await apiServices.get(`/books/all?page=${page}`,);
      setBooks(res.data.data.books);
      setPagination(res.data.data.pagination);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengambil Data Buku");
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    fetchBook(pagination.currentPage);
  },[pagination.currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchBook(page)
    }
  }

  if(loading) return <div className="text-sm text-center text-gray-300">Loading....</div>
  return (
    <div className='min-h-screen bg-[#f5f5f5] px-6 md:px-12 py-10'>
      <h1 className="text-xl md:text-2xl font-semibold mb-6">Buku Terbaru</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {books.map((book) => (
          <Link key={book.id_book} to={`/book/${book.id_book}`}>
          <BookCard
          image={book.cover_path}
          title={book.title}
          price={book.price_cents}
          />
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 mt-10">
        <button 
        onClick={() => handlePageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className={`px-4 py-2 rounded-lg  ${
          pagination.currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-700 cursor-pointer transition"
          }`}>
          <MdNavigateBefore size={20}/>
        </button>

        <span className="text-gray-700 font-medium">Page {pagination.currentPage} of {pagination.totalPages}</span>

        <button 
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
        className={`px-4 py-2 rounded-lg  ${
          pagination.currentPage === pagination.totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-700 cursor-pointer transition"
        }`}>
          <MdNavigateNext size={20}/>
        </button>
      </div>
    </div>
  )
}

export default ListNewbook