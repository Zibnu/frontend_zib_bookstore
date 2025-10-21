import { useState } from "react";
import apiServices from "../utils/api";
import { toast } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { motion } from "framer-motion";


function EditPasswordModal({onClose, onSuccess}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassword = async () => {
    if(!oldPassword.trim() || !newPassword.trim()){
      toast.error("Semua Field Wajib Di Isi");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await apiServices.patch("/user/update/password", {
        oldPassword,
        newPassword,
      }, {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      setLoading(false);
      toast.success("Kata Sandi Berhasil Diperbaharui");
      onSuccess();
    } catch (error) {
      setLoading(false)
      toast.error(error.response?.data?.message || "Gagal Memperbarui Kata Sandi")
    }
  }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
      initial={{opacity : 0, scale : 0.8}}
      animate={{opacity : 1, scale : 1}}
      className="bg-white w-full max-w-md rounded-xl shadow-md p-6 relative">
        <button 
        onClick={onClose}
        className="absolute right-3 top-3 cursor-pointer hover:rotate-90"
        >
          <MdClose/>
          </button>

          <h2 className="text-lg font-semibold mb-4">Ubah Kata Sandi</h2>

          <label className="text-sm text-gray-600">Kata Sandi Lama</label>
          <input 
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-gray-300"
          placeholder="Masukkan Kata Sandi Lama"
          />

          <label className="text-sm text-shadow-gray-600">Kata Sandi Baru</label>
          <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-gray-300"
          placeholder="Masukkan Password Baru"
          />

          <button
          onClick={handlePassword}
          disabled={loading}
          className="mt-4 w-full bg-[#96A78D] text-black py-2 rounded-md hover:bg-[#96A78D] transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
      </motion.div>
    </div>
  )
}

export default EditPasswordModal