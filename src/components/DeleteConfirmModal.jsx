import React from 'react'
import { motion } from 'framer-motion'

function DeleteConfirmModal({onClose, onConfirm}) {
  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <motion.div
      initial={{opacity : 0, scale : 0.8}}
      animate={{opacity : 1, scale : 1}}
      className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h3 className="text-lg font-semibold mb-3">
          Hapus Ulasan Ini?
        </h3>
        <p className="text-sm to-gray-500 mb-4">
          Tindakan Ini Tidak Dapat Dibatalkan
        </p>

        <div className="flex justify-center gap-3">
          <button 
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-gray-100 cursor-pointer text-gray-700 hover:bg-gray-200">
            Batal
          </button>
          <button 
          onClick={onConfirm}
          className="px-4 py-2 rounded-md bg-red-500 cursor-pointer text-white hover:bg-red-600">
            Hapus
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default DeleteConfirmModal