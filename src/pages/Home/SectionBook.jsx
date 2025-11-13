import { useEffect, useState } from "react"
import IconBook from "../../assets/images/bukuTerbaru.jpg"
import BookCard from "../../components/BookCard"
import apiServices from "../../utils/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function SectionBook() {
  const [books, setBooks] = useState([]);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true)
      try {
      const res = await apiServices.get("/books/all")
      setBooks(res.data?.data.books || []);
      } catch (error) {
        console.error("Error Mengambil data Buku", error);
        toast.error(error.message || "Gagal Mengambil Data Buku")
      } finally{
        setLoading(false)
      }
    }
    fetchBook();
  }, [])

  if(loading) return <div className="text-center text-[#96A78D]">Loading Data Buku....</div>
  // if(error) return <div className="text-center text-red-700">Error : {error}</div>

  
  // console.log(books)
  // console.log(error);
  return (
    <div className="w-full py-10 relative">

      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-lg font-bold text-[#333333]">Buku Terbaru</h2>
        <Link to={"/books/terbaru"}>
        <p
        className="text-sm text-[#da8127] hover:underline cursor-pointer"
        >
          Lihat Semua
        </p>
        </Link>
      </div>

      <div className="flex gap-4 relative">
        <div className="hidden md:block w-[220px] flex-shrink-0">
          <img src={IconBook} alt="Banner" className="w-full object-cover rounded-xl" />
        </div>

        <div className="flex-1 relative mt-12 z-20">
          {/* PC */}
          <div className="hidden md:grid grid-cols-5 gap-4 mr-2 ">
            { books.slice(0,10).map((book, index) => (
              <Link key={index} to={`/book/${book.id_book}`}>
                <BookCard
                image={book.cover_path}
                title={book.title}
                price={book.price_cents}
                />
              </Link>
            ))}
          </div>

          {/* Mobile */}
          <div className="grid grid-cols-2 md:hidden gap-4 px-2">
            { books.slice(0,6).map((book, index) => (
              <Link key={index} to={`/book/${book.id_book}`}>
              <BookCard 
              image={book.cover_path}
              title={book.title}
              price={book.price_cents}
              />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionBook;