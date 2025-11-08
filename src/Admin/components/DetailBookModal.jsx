import React, { useEffect, useState } from "react";
import apiServices from "../../utils/api";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

function DetailBookModal({ isOpen, onClose }) {
  const [book, setBook] = useState(null);

  const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const res = await apiServices.get(`/books/${isOpen}`);
        setBook(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message ||
            "Gagal Mengambil Data Detail Buku from Detail Book"
        );
      }
    };
    if (isOpen) {
      fetchBookDetail();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && book && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-medium mb-4">Book Detail</h2>
              <button
                onClick={onClose}
                className="right-3 top-3 cursor-pointer"
              >
                <MdClose size={20}/>
              </button>
            </div>

            <img
              src={book.cover_path}
              alt={book.title}
              className="w-32 h-44 object-cover rounded-lg mb-4 mx-auto"
            />

            <p>
            <span className="text-xl font-semibold">Title : </span>
            {book.title}
            </p>
            <p>
              <span className="text-lg font-semibold">Author:</span>{" "}
              {book.author}
            </p>
            <p>
              <span className="text-lg font-semibold">Category:</span>
              {book.category?.name_category}
            </p>
            <p>
              <span className="text-lg font-semibold">Price:</span>
              {formatRupiah(book.price_cents)}
            </p>
            <p>
              <span className="text-lg font-semibold">Stock:</span>
              {book.stock}
            </p>

            <div className="mt-4">
              <p className="font-semibold mb-1">Description:</p>
              <p className="text-sm text-gray-700">{book.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DetailBookModal;
