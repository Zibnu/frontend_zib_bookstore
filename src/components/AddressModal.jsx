import React, { useEffect, useState } from 'react'
import AddAddressModal from './AddAddressModal'
import { MdClose } from "react-icons/md";
import apiServices from '../utils/api'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'

function AddressModal({isOpen, onClose, onSelectAddress}) {
  const [addresses, setAddresses] = useState([])
  const [isAddModalOpen, setIsModalOpen] = useState(false)

  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await apiServices.get("/address/user's", {
        headers : { Authorization : `Bearer ${token}`},
      });
      setAddresses(res.data.data || [])
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Mengambil Data Alamat from Address Modal");
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) fetchAddress();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        initial={{ opacity : 0}}
        animate={{ opacity : 1}}
        exit={{ opacity : 0}}
        >
          <motion.div 
          initial={{ scale : 0.9, opacity : 0}}
          animate={{ scale : 1, opacity : 1}}
          exit={{ scale : 0.9, opacity : 0}}
          className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pilih Alamat Pengiriman
            </h3>

            {addresses.length === 0 ? (
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">Alamat</h2>
        <p className="text-gray-500 text-sm mb-4">
          Belum Ada Alamat Yang Terdaftar
        </p>
        <button
        className="bg-white text-gray-300 px-4 py-2 border border-gray-200 rounded-md hover:border transition"
        >
          Buat Alamat
        </button>
      </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
                {addresses.map((address) => (
                  <div 
                  key={address.id_address}
                  onClick={() => onSelectAddress(address)}
                  className="border rounded-lg p-3 cursor-pointer hover:border-green-500 border-green-50 transition"
                  >
                    <h3 className="font-medium text-gray-800">
                      {address.full_name} &bull; {address.phone}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {address.street}, {address.provinces}, {" "}
                      {address.postal_code}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition">
                Buat Alamat
              </button>
              <button 
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-sm rounded-lg hover:bg-gray-300 transition">
                Batal
              </button>
            </div>

            <AddAddressModal
            isOpen={isAddModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSucces={() => fetchAddress()}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddressModal