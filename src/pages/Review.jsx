import React, { useEffect, useState } from "react";
import EditReviewModal from "../components/EditReviewModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ReviewCard from "../components/ReviewCard";
import apiServices from "../utils/api";
import toast from "react-hot-toast";
import notYetReview from "../assets/images/tidak ada ulasan.png";
import SideBarProfile from "../components/SideBarProfile";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage : 1,
    totalPages : 1,
  })
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState(true)

  
  const fetchReviews = async (page = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }
      
      const res = await apiServices.get(`/review/my-review?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(res.data.data.reviews || []);
      setPagination(res.data.data.pagination)
      setLoading(false)
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal Mendapatkan Review User"
      );
      console.error(error.response?.data?.message);
      setLoading(false)
    }
  };
  
  useEffect(() => {
    fetchReviews(pagination.currentPage);
  }, [pagination.currentPage]);

  const handleSave = async (updated) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }

      await apiServices.put(
        `/review/edit/${updated.id_review}`,
        {
          rating: updated.rating,
          comment: updated.comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Ulasan Diperbaharui");
      setEditing(null);
      setLoading(false)
      fetchReviews(pagination.currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Memperbarui Ulasan");
      console.error(error.response?.data?.message);
      setLoading(false)
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }

      await apiServices.delete(`/review/delete/${deleting.id_review}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Ulasan Berhasil Dihapus");
      setDeleting(null);
      setLoading(false);

      let newPage = pagination.currentPage;
      if(reviews.length === 1 && pagination.currentPage > 1){
        newPage = pagination.currentPage - 1;
      }

      fetchReviews(newPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Menghapus Ulasan");
      console.error(error.response?.data?.message);
      setLoading(false)
    }
  };

  const handleChangePage = (page) => {
    if(page >= 1 && page <= pagination.totalPages) {
      // fetchReviews(page);
      setPagination((prev) => ({...prev, currentPage : page}))
    }
  };

  // console.log(pagination)

  if(loading) return <div className="text-center py-10 text-gray-400">Loading Ulasan....</div>
  return (
    <div className="min-h-screen flex bg-[#FBF6EE] pb-16 md:pb-0 ">
      <SideBarProfile />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6">Ulasan Produk</h2>

        {reviews.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow flex flex-col md:flex-row items-center justify-center text-center gap-10">
            <img
              src={notYetReview}
              alt="Belum Ada ulasan"
              className="w-3xs h-50 object-contain opacity-70 mb-4"
            />
            <div className="text-center md:text-left">
              <p className="text-lg font-medium">Belum Membuat Ulasan</p>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">Yuk, tulis ulasan produk agar membantu pengguna lain menemukan produk terbaik</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id_review}
                review={review}
                onEdit={() => setEditing(review)}
                onDelete={() => setDeleting(review)}
              />
            ))}
          </div>
        )}
        {reviews.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button 
            onClick={() => handleChangePage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 cursor-pointer transition disabled:text-gray-300 disabled:cursor-not-allowed">
              <MdNavigateBefore size={20}/>
            </button>

            <span className="text-gray-700 font-medium">Page {pagination.currentPage} of {pagination.totalPages}</span>

            <button 
            onClick={() => handleChangePage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 cursor-pointer transition disabled:text-gray-300 disabled:cursor-not-allowed">
              <MdNavigateNext size={20}/>
            </button>
          </div>
        )}
      </div>

      {editing && (
        <EditReviewModal
          review={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <DeleteConfirmModal
          onClose={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default Review;
