import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import apiServices from '../utils/api';
import noReview from "../assets/images/tidak ada ulasan.png"

function DetailBook() {
  const formatRupiah = (value) => {
    if(!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

const renderStars = (rating) => {
  const stars = [];
  const maxStars = 5;
  const rounded = Math.round(rating);

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <span key={i} className={i <= rounded ? "text-yellow-600" : "text-gray-300"}>
        ★
      </span>
    );
  }
  return stars;
};

  const { id } = useParams();
  const [ book, setBook ] = useState(null);
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const fetchBook = async ( ) => {
      try {
        const res = await apiServices(`/books/${id}`);
        setBook(res.data.data || [])
      } catch (error) {
        console.error("Gagal Mengambil Detail Buku", error);
        setError(error.message || "Gagal mengambil Data Detail Buku")
      }
    }
    fetchBook();
  }, [id]);
  console.log(book);

  const handleAddToCart = () => {
    console.log("Ditambahkan Ke Keranjang", book);
    alert(`"${book.title}" Berhasil Ditambahkan Ke keranjang`);
  }

  if(error) return <div className="text-center text-red-700">ERROR : {error}</div>
  if(!book) return <div className="text-center text-emerald-800">404</div>

  return (
    <div className="max-w-xl mx-auto  p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <img 
        src={book.cover_path}
        alt={book.title}
        className="w-full h-96 object-cover rounded-lg shadow"
        />
      </div>

      {/* Detail */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{book.title}</h1>
        <p className="text-gray-600 mt-1">By {book.author}</p>

        <p className="text-xl font-bold mt-4">{formatRupiah(book.price_cents)}</p>
        <p className="text-sm text-gray-500 mt-1">
          Diririlis Pada : {new Date(book.createdAt).toLocaleDateString("id-ID")}
        </p>

        <p className="text-gray-700 mt-4 leading-relaxed">
          {book.description}
        </p>

        <div className="mt-8">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Ulasan Buku
            </h2>
            <span className="text-yellow-600">
              {renderStars(book.averageRating || 0)}
            </span>
            <span className="text-sm text-gray-500">
              ({book.totalReviews || 0} Review)
            </span>

            {book.reviews && book.reviews.length > 0 ? (
              <div className="mt-4 space-y-4">
                { book.reviews.map((review) => (
                  <div key={review.id_review} className="p-4 border border-gray-400 rounded-md shadow-sm">
                    <p className="font-medium">{review.user.username}</p>
                    <p className="text-sm text-yellow-600">{renderStars(review.rating)}</p>
                    <p className="text-gray-700 mt-1">{review.comment}</p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {new Date(review.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex items-center gap-3 border p-4 rounded-md bg-gray-50">
                <img 
                src={noReview}
                alt="No Review"
                className='w-12 h-12 object-contain opacity-70'
                />
                <p className="text-gray-500">Buku Ini Belum Memiliki Ulasan</p>
              </div>
            )}
        </div>
        <button 
        onClick={handleAddToCart}
        className="mt-6 px-4 py-2 bg-[#96A78D] text-[#544646] rounded-md hover:bg-[#7f9573] transition">
        +  Keranjang
        </button>
      </div>
    </div>
  )
}

export default DetailBook