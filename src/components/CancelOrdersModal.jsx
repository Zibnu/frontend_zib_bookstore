import React from "react";
import { motion } from "framer-motion";

function CancelOrdersModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center"
      >
        <h3 className="text-lg font-semibold mb-2">Batalkan Pesanan</h3>
        <p className="text-gray-600 text-sm mb-6">
          Pesanan yang dibatalkan tidak dapat dikembalikan, apakah kamu yakin untuk melanjutkan pembatalan?
        </p>

        <div className="flex justify-center gap-4">
          <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm">
            Tidak
          </button>

          <button 
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm">
            Ya
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default CancelOrdersModal;
