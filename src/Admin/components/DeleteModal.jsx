import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'

function DeleteModal({isOpen, onClose, onSuccess}) {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await apiServices.get(`/books/${isOpen}`);
        setBook(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Gagal Mengambil Data Buku from delete modal")
      }
    }

    if(isOpen) {
      fetchBook();
    }
  }, [isOpen])

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await apiServices.delete(`/books/${isOpen}`, {
        headers : { Authorization : `Bearer ${token}`},
      });

      toast.success("Book Success Deleted");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed Deleted Book");
    }
  };
  return (
    <AnimatePresence>
      {isOpen && book && (
        <motion.div
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        exit={{opacity : 0}}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
          initial={{scale : 0.85, opacity : 0}}
          animate={{scale : 1, opacity : 1}}
          exit={{scale : 0.85, opacity : 0}}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-center">Confirm Delete</h3>

            <p className="text-center text-gray-700">Are you sure want to delete book :</p>
            <p className="text-center font-semibold mt-1 mb-4">"{book.title}"</p>

            <div className="flex justify-center gap-3 mt-6">
              <button
              onClick={onClose}
              className='px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer transition'
              >
                Cancel
              </button>
              <button
              onClick={handleDelete}
              className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg cursor-pointer transition'
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeleteModal