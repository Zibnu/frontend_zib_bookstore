import React, { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import BookCard from '../components/BookCard'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await apiServices.get(`/categories/${id}?includeBooks=true`);
        setCategory(res.data.data);
      } catch (error) {
        console.error(error.response?.data?.message);
        toast.error(error.response?.data?.message || "Gagal Mengambil Data Buku dari Categori Detail");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id])

  if(loading) return <div className="text-center text-sm text-gray-400">Memuat Buku....</div>
  if(!category) return <div className="text-red-400 text-lg font-medium">Buku Tidak Ditemukan</div>
  return (
    <div className='px-8 py-3'>
      <h1 className="text-2xl font-semibold mb-6">Kategori {category.name_category}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        { category.books.map((book) => (
          <Link key={book.id_book} to={`/book/${book.id_book}`}>
          <BookCard
          image={book.cover_path}
          title={book.title}
          price={book.price_cents}
          />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryDetail