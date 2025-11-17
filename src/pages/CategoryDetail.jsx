import React, { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import BookCard from '../components/BookCard'
import { Link, useParams } from 'react-router-dom'
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import toast from 'react-hot-toast';

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage : 1,
    totalPages : 1,
  })
  const [loading, setLoading] = useState(true);

  const fetchCategory = async (page = 1) => {
    try {
      const res = await apiServices.get(`/categories/${id}?includeBooks=true&page=${page}`);

      setCategory(res.data.data.category);
      setBooks(res.data.data.books);
      setPagination(res.data.data.pagination);
    } catch (error) {
      console.error(error.response?.data?.message);
      toast.error(error.response?.data?.message || "Gagal Mengambil Data Buku dari Categori Detail");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory(pagination.currentPage);
  }, [id, pagination.currentPage])
  // console.log(category)

  const handlePageChange = (page) => {
    if(page >= 1 && page <= pagination.totalPages){
      fetchCategory(page);
    }
  };

  if(loading) return <div className="text-center text-sm text-gray-400">Memuat Buku....</div>
  if(!category) return <div className="text-red-400 text-lg font-medium">Buku Tidak Ditemukan</div>
  return (
    <div className='px-8 py-3'>
      <h2 className="text-2xl font-semibold mb-6">Kategori {category?.name_category || "Name Categori Not found"}</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        { books.map((book) => (
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
        className={`px-4 py-2 rounded-lg ${
          pagination.currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-700 cursor-pointer transition"
        }`}>
          <MdNavigateBefore size={20}/>
        </button>

        <span className="text-gray-700 font-medium">Page {pagination.currentPage} of {pagination.totalPages}</span>

        <button 
        onClick={() => handlePageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === pagination.totalPages}
        className={`px-4 py-2 rounded-lg ${
          pagination.currentPage === pagination.totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:text-gray-700 cursor-pointer transition"
        }`}>
          <MdNavigateNext size={20}/>
        </button>
      </div>
    </div>
  )
}

export default CategoryDetail