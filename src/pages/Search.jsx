import React, { useEffect, useState } from 'react'
import notFound from "../assets/images/iconBukuTidakTersedia.png"
import BookCard from '../components/BookCard'
import apiServices from "../utils/api"
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from "react-hot-toast"

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!keyword) return;
      setLoading(true)
      try {
        const res = await apiServices.get(`/books/all?search=${keyword}`);
        setBooks(res.data.data.books || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Gagal Mengambil Buku From Search");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [keyword]);

  if(loading) return <div className='text-sm text-center text-shadow-gray-300'>Memuat Data Buku....</div>
  return (
    <div className='max-w-6xl mx-auto px-4 py-10'>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#333333]">
          Hasil Pencarian Untuk : {" "}
          <span className='text-[#da8127]'>"{keyword}"</span>
        </h2>
      </div>

      {books.length === 0 ? (
        <motion.div 
        initial={{opacity : 0, y : 20}}
        animate={{opacity : 1, y : 0}}
        className="p-10  flex flex-col items-center justify-center text-center gap-10 "
        >
          <img 
          src={notFound}
          alt="Tidak Ada Product"
          className='w-3xs h-50 object-contain opacity-70 '
          />
          <p className="text-lg font-medium">Tidak Ada Hasil Yang Ditemukan</p>
          <p className="text-sm mb-4">Coba Dengan Kata Kunci Lain Atau Periksa Ejaan Pencarian Mu</p>
        </motion.div>
      ) : (
        <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {books.map((book) => (
            <motion.div 
            key={book.id_book}
            layout
            initial={{opacity : 0, y : 20}}
            animate={{opacity : 1, y : 0}}
            transition={{delay : 0.05}}
            >
              <Link to={`/book/${book.id_book}`}>
              <BookCard
              image={book.cover_path}
              title={book.title}
              price={book.price_cents}
              />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Search