import React, { useEffect, useState } from 'react'
import AddressModal from "./AddressModal"
import AddAddressModal from './AddAddressModal'
import toast from 'react-hot-toast'
import apiServices from '../utils/api'

function AddressSection({activeAddress, setActiveAddress}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  const fetchAddres = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await apiServices.get("/address/user's", {
        headers : { Authorization : `Bearer ${token}`},
      });

      const addresses = res.data.data || []
      if(addresses.length > 0) {
        setActiveAddress(addresses[addresses.length -1])
      }

      setIsAddModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Memuat data alamat terbaru");
      console.error(error);
    }
  }

  
  useEffect(() => {
    const fetchActivteAddress = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token) {
          toast.error("Silahkan Login Terlebih Dahulu");
          return;
        }
  
        const res = await apiServices.get("/address/user's", {
          headers : {Authorization : `Bearer ${token}`},
        });
  
        const addresses = res.data.data || [];
        if(addresses.length > 0 ) {
          setActiveAddress(addresses[0]);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Gagal Mendapatkan Alamat User from Address Section");
        console.log(error)
      }
    };
    fetchActivteAddress();
  }, []);
  return (
    <div className='bg-white rounded-xl shadow-sm p-5'>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-[#333333]">Alamat Pengiriman</h2>

        {activeAddress && (
        <button
        onClick={() => setIsModalOpen(true)}
        className="text-[#da8127] hover:text-[#b9671f] text-sm font-medium underline transition">
          Alamat Lainnya
        </button>
        )}
      </div>

      {activeAddress ? (
        <div className="border rounded-lg p-4 bg-green-50">
          <h3 className="font-semibold text-[#333333]">
            {activeAddress.full_name} &bull; {activeAddress.phone}
          </h3>
          <p className="text-sm text-[#757575] mt-1">
            {activeAddress.street}, {activeAddress.provinces}, {" "}
            {activeAddress.postal_code}
          </p>
        </div>
      ) : (
        <div>
          <p className="text-gray-500 text-sm">
            Kamu Belum Memiliki Alamat Pengiriman
          </p>
          <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 border border-gray-400 text-sm rounded-md hover:border-gray-600 transition">
            Buat Alamat
            </button>
        </div>
      )}

      <AddressModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSelectAddress={(selected) =>{
        setActiveAddress(selected);
        setIsModalOpen(false)
      }}
      />

      <AddAddressModal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      onSucces={fetchAddres }
      />
    </div>
  )
}

export default AddressSection