import React, { useEffect, useState } from 'react'
import AddressModal from "./AddressModal"
import toast from 'react-hot-toast'
import apiServices from '../utils/api'

function AddressSection({activeAddress, setActiveAddress}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  
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
        <button
        onClick={() => setIsModalOpen(true)}
        className="text-[#da8127] hover:text-[#b9671f] text-sm font-medium underline transition">
          Alamat Lainnya
        </button>
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
        <p className="text-gray-500 text-sm">
          Kamu Belum Memiliki Alamat Pengiriman
        </p>
      )}

      <AddressModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSelectAddress={(selected) =>{
        setActiveAddress(selected);
        setIsModalOpen(false)
      }}
      />
    </div>
  )
}

export default AddressSection