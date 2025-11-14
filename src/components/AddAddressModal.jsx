import React, { useEffect, useState } from 'react'
import apiServices from '../utils/api'
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';


function AddAddressModal({isOpen, onClose, onSucces}) {
  const [formData, setFormData] = useState({
    full_name : "",
    phone : "",
    provinces : "",
    postal_code : "",
    street : "",
  });

  useEffect(() => {
    if(!isOpen) {
      setFormData({
        full_name : "",
        phone : "",
        provinces : "",
        postal_code : "",
        street : ""
      })
    }
  }, [isOpen])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if(!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      };

      await apiServices.post("/address/create",formData,{
        headers : { Authorization : `Bearer ${token}`}
      });
      toast.success("Alamat Berhasil Dibuat");
      setFormData({
        full_name : "",
        phone : "",
        provinces : "",
        postal_code : "",
        street : ""
      });
      onSucces();
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Membuat Alamat")
      console.error(error.response?.data?.message);
    }
  }
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        className='fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50'
        initial={{ opacity : 0}}
        animate={{ opacity : 1}}
        exit={{opacity : 0}}
        >
          <motion.div 
          initial={{scale : 0.8, opacity : 0}}
          animate={{scale : 1, opacity : 1}}
          exit={{scale : 0.8, opacity : 0}}
          className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className='text-lg font-semibold text-[#333333] mb-4'>
              Tambah Alamat Baru
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input 
              type="text" 
              name='full_name'
              placeholder='Nama Lengkap'
              value={formData.full_name}
              onChange={handleChange}
              className='border border-[#999999] rounded-lg px-3 py-2 placeholder-[#757575] text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              required
              />

              <input 
              type="text" 
              name='phone'
              placeholder='No. Telepon'
              value={formData.phone}
              onChange={handleChange}
              className='border border-[#999999] rounded-lg px-3 py-2 placeholder-[#757575] text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              required
              />

              <input 
              type="text" 
              name='provinces'
              placeholder='Provinsi'
              value={formData.provinces}
              onChange={handleChange}
              className='border border-[#999999] rounded-lg px-3 py-2 placeholder-[#757575] text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              required
              />

              <input 
              type="text" 
              name='postal_code'
              placeholder='Kode Pos'
              value={formData.postal_code}
              onChange={handleChange}
              className='border border-[#999999] rounded-lg px-3 py-2 placeholder-[#757575] text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              required
              />

              <textarea 
              name='street'
              placeholder='Nama Jalan'
              value={formData.street}
              onChange={handleChange}
              className='border border-[#999999] rounded-lg px-3 py-2 placeholder-[#757575] text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              required
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer transition'
                >
                  Batal
                </button>
                <button 
                className='px-4 py-2 text-sm rounded-lg bg-[#da8127] text-white hover:bg-[#b9671f] cursor-pointer transition'
                type="submit">
                  Simpan
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddAddressModal