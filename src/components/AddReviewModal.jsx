import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MdClose } from "react-icons/md";

function AddReviewModal({ book, onSave, onClose}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("")
  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <motion.div 
      initial={{opacity : 0, scale : 0.8}}
      animate={{opacity : 1, scale : 1}}
      className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Tambah Ulasan Buku
          </h2>
          <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl">
            <MdClose/>
          </button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <img 
          src={book.cover_path} 
          alt={book.title} 
          className='w-14 h-18 object-cover rounded-md'
          />
          <p className="font-semibold">{book.title}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm to-gray-600 mb-1">Rating :</p>
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
        className="w-full border-gray-300 rounded-lg p-3 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-400 "
        rows={3}
        ></textarea>

        <div className="flex justify-end">
          <button
          onClick={() => onSave({book_id : book.id_book, rating, comment})}
          className='px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700'
          >
            Kirim
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default AddReviewModal