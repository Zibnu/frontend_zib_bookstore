import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiServices from "../utils/api";
import noReview from "../assets/images/tidak ada ulasan.png";
import toast from "react-hot-toast";
import AddReviewModal from "../components/AddReviewModal";

function DetailBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showMiniCart, setShowMiniCart] = useState(false);
  // const [ error, setError ] = useState(null);
  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);
  const [userHasReview, setUserHasReview] = useState(false);

  const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;
    const rounded = Math.round(rating);

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rounded ? "text-yellow-600" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await apiServices(`/books/${id}`);
        const fetchBook = res.data.data || [];
        setBook(fetchBook);

        if (token && fetchBook?.reviews?.length > 0 ) {
          const userId = JSON.parse(localStorage.getItem("userId"));
          const alReadyReview = fetchBook.reviews.some(
            (review) => review.user.id_user === userId
          );
          setUserHasReview(alReadyReview);
        } else {
          setUserHasReview(false);
        }
      } catch (error) {
        console.error("Gagal Mengambil Detail Buku", error);
        toast.error(error.message || "Gagal mengambil Data Detail Buku");
      }
    };
    fetchBook();
  }, [id, token]);
  // console.log(book);
  
  const updateData = async () => {
    try {
      const res = await apiServices(`/books/${id}`);
      const updateBook = res.data.data || [];
      // console.log(updateBook)
      setBook(updateBook);

      if(updateBook.reviews && token) {
        const userId = JSON.parse(localStorage.getItem("userId"));
        const alReadyReview = updateBook.reviews.some(
          (review) => review.user.id_user === userId
        );
        setUserHasReview(alReadyReview);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal Memuat Buku From Detail Buku"
      );
      console.error(error);
    }
  };

  // useEffect(() => {
    //   if(book && token) {
  //     const userId = JSON.parse(localStorage.getItem("userId"));
  //     const alReadyReview = book.reviews.some(
    //       (review) => review.user.id === userId
    //     );
    //     setUserHasReview(alReadyReview);
  //   }
  // }, [book, token]);
  
  // console.log(userHasReview)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowMiniCart(true);
      } else {
        setShowMiniCart(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await apiServices.post(
        "/cart/add",
        {
          book_id: book.id_book,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`"${book.title}" Berhasil Ditambahkan Ke Keranjang`);
    } catch (error) {
      console.error("Gagal Menambahkan Ke keranjang", error);
      toast.error(error.message, "Gagal Menambahkan ke Keranjang");
    }
  };

  // if(error) return <div className="text-center text-red-700">ERROR : {error}</div>
  if (!book)
    return <div className="text-center text-emerald-800">Loading...</div>;

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <img
            src={book.cover_path}
            alt={book.title}
            className="w-80 h-[420px] object-cover rounded-lg shadow"
          />
        </div>

        {/* Detail */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl text-[#333333] font-bold leading-snug">
            {book.title}
          </h1>
          <p className="text-[#757575] text-sm">By {book.author}</p>
          <p className="text-2xl text-[#da8127] font-bold">
            {formatRupiah(book.price_cents)}
          </p>
          <p className="text-sm text-[#757575]">
            Diririlis Pada :{" "}
            {new Date(book.createdAt).toLocaleDateString("id-ID")}
          </p>
          <p className="text-[#757575] mt-4 leading-relaxed">
            {book.description}
          </p>

          <div className="mt-6 bg-[#FFFFFF] p-6 rounded-md shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  Ulasan Buku
                </h2>
                <span className="flex items-center gap-2 text-yellow-600">
                  {renderStars(book.averageRating || 0)}
                </span>
                <span className="text-sm text-gray-500">
                  ({book.totalReviews || 0} Review)
                </span>
              </div>

              {book.reviews && book.reviews.length > 0 ? (
                <button
                  onClick={() => {
                    if (!token) {
                      toast.error("Silahkan Login Terlebih Dahulu");
                      navigate("/login");
                      return;
                    }
                    if (userHasReview) {
                      toast.error("Anda Telah Memberikan Ulasan Pada Buku Ini");
                      return;
                    }
                    setOpenAddReviewModal(true);
                  }}
                  disabled={userHasReview}
                  className={`px-3 py-2 border rounded-lg text-sm transition
                ${
                  userHasReview
                    ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                    : "bg-[#da8127] text-white cursor-pointer hover:bg-[#b9671f]"
                }
                `}
                >
                  Tambah Ulasan
                </button>
              ) : (
                <div className="w-2"></div>
              )}
            </div>

            {book.reviews && book.reviews.length > 0 ? (
              <div className="space-y-4 bg-[#FFFFFF]">
                {book.reviews.map((review) => (
                  <div
                    key={review.id_review}
                    className="p-4 border border-[#CCCCCC]rounded-md shadow-sm"
                  >
                    <p className="font-medium">{review.user.username}</p>
                    <p className="text-sm text-yellow-600">
                      {renderStars(review.rating)}
                    </p>
                    <p className="text-gray-700 mt-1">{review.comment}</p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {new Date(review.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex flex-col md:flex-row items-center md:items-start justify-center gap-6 border border-[#CCCCCC] p-6 rounded-md bg-[#FFFFFF] ">
                <img
                  src={noReview}
                  alt="No Review"
                  className="w-40 h-40 object-contain opacity-70"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-lg font-semibold text-[#333333]">
                    Buku Ini Belum Memiliki Ulasan
                  </h3>
                  <p className="text-gray-500 mb-4 leading-relaxed">
                    Jadilah Yang Pertama Dalam Memberikan Ulasan
                  </p>
                  <button
                    onClick={() => {
                      if (!token) {
                        toast.error("Silahkan Login Terlebih Dahulu");
                        navigate("/login");
                        return;
                      }
                      setOpenAddReviewModal(true);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-[#333] hover:border-gray-500 cursor-pointer transition"
                  >
                    Tulis Ulasan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`sticky bottom-0 left-0 w-full bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-all duration-100 ${
          showMiniCart
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        } h-20 flex justify-between items-center px-4 overflow-hidden`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={book.cover_path}
            className="w-12 h-16 object-cover rounded shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-[#333333] text-sm truncate block w-full">
              {book.title}
            </span>
            <span className="text-xs text-[#757575] truncate block w-full">{book.author}</span>
            <span className="text-sm text-[#da8127] font-bold">
              {formatRupiah(book.price_cents)}
            </span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="px-4 py-2 cursor-pointer bg-[#da8127] text-white rounded-md hover:bg-[#b9671f] transition shrink-0 ml-2"
        >
          + Keranjang
        </button>
      </div>

      {openAddReviewModal && (
        <AddReviewModal
          onClose={() => setOpenAddReviewModal(false)}
          bookId={book.id_book}
          onSave={updateData}
        />
      )}
    </>
  );
}

export default DetailBook;
