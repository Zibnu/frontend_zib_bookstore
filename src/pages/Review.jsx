import React, { useEffect, useState } from "react";
import EditReviewModal from "../components/EditReviewModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ReviewCard from "../components/ReviewCard";
import apiServices from "../utils/api";
import toast from "react-hot-toast";
import notYetReview from "../assets/images/tidak ada ulasan.png";
import SideBarProfile from "../components/SideBarProfile";

function Review() {
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }

      const { data } = await apiServices.get("/review/my-review", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReviews(data.data || []);
      setLoading(false)
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal Mendapatkan Review User"
      );
      console.error(error.response?.data?.message);
      setLoading(false)
    }
  };

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
      fetchReviews();
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
      setLoading(false)
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Menghapus Ulasan");
      console.error(error.response?.data?.message);
      setLoading(false)
    }
  };

  if(loading) return <div className="text-center py-10 text-gray-400">Loading Ulasan....</div>
  return (
    <div className="min-h-screen flex bg-[#FBF6EE]">
      <SideBarProfile />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-6">Ulasan Produk</h2>

        {reviews.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow flex items-center justify-center text-center gap-10">
            <img
              src={notYetReview}
              alt="Belum Ada ulasan"
              className="w-3xs h-50 object-contain opacity-70 mb-4"
            />
            <div className="text-left">
              <p className="text-lg font-medium">Belum Membuat Ulasan</p>
              <p className="text-sm text-gray-500 mb-4">Yuk, tulis ulasan produk agar membantu pengguna lain menemukan produk terbaik</p>
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
