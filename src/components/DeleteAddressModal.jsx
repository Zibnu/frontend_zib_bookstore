import React from 'react'
import apiServices from '../utils/api'
import { MdClose } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'

function DeleteAddressModal({isOpen, onClose, onSuccess , addressId}) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token")
      if(!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }

      await apiServices.delete(`/address/delete/${addressId}`, {
        headers : { Authorization : `Bearer ${token}`},
      });
      toast.success("Alamat Berhasil Dihapus");
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Menghapus Alamat")
      console.error(error.response?.data?.message)
    }
  };

  return (
    <AnimatePresence>
      { isOpen && (
        <motion.div
        key="delete-modal"
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        exit={{opacity : 0}}
        transition={{duration : 0.2}}
        >
          <motion.div 
          initial={{scale : 0.8, opacity : 0}}
          animate={{scale : 1, opacity : 1}}
          exit={{scale : 0.8, opacity : 0}}
          transition={{duration : 0.2}}
          className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Hapus Alamat
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Apakah Kamu Yakin Ingin Menghapus Alamat Ini? Alamat Yang Dihapus Tidak Dapat Dikembalikan
            </p>

            <div className="flex justify-center gap-3">
              <button 
              onClick={onClose}
              className='px-4 py-2 text-sm rounded-lg cursor-pointer bg-gray-200 hover:bg-gray-300 transition'
              >
                Batal
              </button>
              <button 
              onClick={handleDelete}
              className="px-4 py-2 text-sm rounded-lg cursor-pointer bg-red-600 text-white hover:bg-red-700 transition">
                Hapus
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DeleteAddressModal