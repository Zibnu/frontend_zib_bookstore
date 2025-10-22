import React, { useEffect, useState } from 'react'
import notYetAddress from "../assets/images/tidak ada alamat.png"
import SideBarProfile from "../components/SideBarProfile"
import apiServices from "../utils/api"
import AddressCard from "../components/AddressCard"
import AddAddressModal from "../components/AddAddressModal"
import EditAddressModal from "../components/EditAddressModal"
import DeleteAddressModal from "../components/DeleteAddressModal"
import toast from 'react-hot-toast'
import { FaPlus } from "react-icons/fa6"
import { motion } from 'framer-motion'

function Address() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null)

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }

      const res = await apiServices.get("/address/user's", {
        headers : {Authorization : `Bearer ${token}`}
      });
      setAddresses(res.data.data || [])
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error.response?.data?.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEdit = (address) => {
    setSelectedAddress(address);
    setIsEditOpen(true);
  }

  const handleDelete = (address) => {
    setSelectedAddress(address);
    setIsDeleteOpen(true);
  }

  if(loading) return <div className="text-center text-gray-500 text-sm">Memuat Alamat...</div>

  return (
    <div className='w-full min-h-screen bg-[#f5f5f5] flex'>
      <SideBarProfile/>
      <div className="flex-1 p-6 md:p-10">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Daftar Alamat</h2>
          <button 
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 bg-[#96A78D] curpoin text-black flex text-sm rounded-lg hover:bg-[#7f9276] transition cursor-pointer">
            <FaPlus />
          </button>
        </div>

      {/* Content */}
      { addresses.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow flex items-center justify-center text-center gap-10">
          <img 
          src={notYetAddress} 
          alt="Tidak Ada Alamat"
          className='w-3xs h-auto object-contain opacity-70 mb-4'
          />
          <div className="text-left">
            <p className="text-lg font-medium">Belum Ada Alamat</p>
            <p className="text-sm text-gray-500 mb-4">Buat alamat untuk kami bisa mengirim buku anda</p>
            <button 
            onClick={() => setIsAddOpen(true)}
            className='px-4 py-2 bg-[#96A78D] text-white rounded-md hover:bg-[#7f9573]'>
              Buat Alamat
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        initial={{ opacity : 0}}
        animate={{ opacity : 1}}
        transition={{ duration : 0.3}}
        >
          { addresses.map((address) => (
            <AddressCard
            key={address.id_address}
            address={address}
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
          ))}
        </motion.div>
      )}
      </div>

      {/* Modal */}
      <AddAddressModal
      isOpen={isAddOpen}
      onClose={() => setIsAddOpen(false)}
      onSucces={fetchAddresses}
      />

      <EditAddressModal
      isOpen={isEditOpen}
      onClose={() => setIsEditOpen(false)}
      address={selectedAddress}
      onSuccess={fetchAddresses}
      />

      <DeleteAddressModal
      isOpen={isDeleteOpen}
      onClose={() => setIsDeleteOpen(false)}
      addressId={selectedAddress?.id_address}
      onSuccess={fetchAddresses}
      />
    </div>
  )
}

export default Address