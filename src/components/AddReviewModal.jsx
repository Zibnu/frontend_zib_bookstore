import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdClose } from "react-icons/md";
import toast from 'react-hot-toast';
import apiServices from '../utils/api';

function AddReviewModal({ bookId, onSave, onClose}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!token) {
      toast.error("Silahkan Login Terlebih Dahulu");
      return;
    }

    if(!rating || !comment.trim()){
      toast.error("Silahkan Isi Semua Field Terlebih Dahulu");
      return;
    }

    try {
      await apiServices.post("/review/create", {
        book_id : bookId,
        rating,
        comment,
      }, {
        headers : { Authorization : `Bearer ${token}`},
      });

      toast.success("Berhasil Menambahkan Ulasan");
      onSave();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Menambahkan Ulasan");
      console.error(error);
    }
  }
  return (
    <div className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'>
      <motion.div 
      initial={{opacity : 0, scale : 0.8}}
      animate={{opacity : 1, scale : 1}}
      className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#333333]">
            Ulasan Buku
          </h2>
          <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl">
            <MdClose/>
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Rating :</p>
          <div className="flex gap-1">
            {[1,2,3,4,5].map((num) => (
              <span
              key={num}
              onClick={() => setRating(num)}
              className={`text-2xl cursor-pointer ${
                num <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              >
                ★
              </span>
            )) }
          </div>
        </div>

        <textarea 
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Tuliskan Pendapatmu Mengenai Buku Ini'
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 placeholder-[#757575] resize-none focus:outline-none focus:ring-2 focus:ring-[#CCCCCC] "
        rows={3}
        ></textarea>

        <div className="flex justify-end">
          <button
          onClick={handleSubmit}
          className='px-4 py-2 rounded-lg cursor-pointer bg-[#da8127] text-white hover:bg-[#b9671f]'
          >
            Simpan
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default AddReviewModal