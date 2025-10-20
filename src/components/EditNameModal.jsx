import { useState } from "react";
import { MdClose } from "react-icons/md";
import apiServices from "../utils/api";
import { toast } from "react-hot-toast"

function EditNameModal({ user, onClose, onSuccess}) {
  const [name, setName] = useState(user?.fullname ||"");
  const [loading, setLoading] = useState(false);

  const handleUpdateName = async () => {
    if(!name.trim()) {
      toast.error("Nama Tidak Boleh Kosong");
      return ;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Silahkan Login Kembali");
        return;
      }
      await apiServices.put(
        "/user/update",
        { username : name},
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );
      setLoading(false);
      toast.success("Nama Berhasil di Perbarui");
      onSuccess();
    } catch (error) {
      setLoading(false)
      toast.error( error.response?.data?.message || "Gagal Memperbarui Nama")
    }
  }
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6 relative">
        <button
        onClick={onClose}
        className="absolute right-3 top-3 cursor-pointer hover:rotate-90"
        >
          <MdClose/>
        </button>

        <h2 className="text-lg font-semibold mb-4">Edit Nama Lengkap</h2>

        <input 
        type="text"
        value={name}
        onChange={ (e) => setName(e.target.value)}
        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
        placeholder="Masukkan Name Baru"
        />

        <button
        onClick={handleUpdateName}
        disabled={loading}
        className="mt-4 w-full bg-[#96A78D] text-black py-2 rounded-md cursor-pointer hover:bg-[#96A78D] transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  )
}

export default EditNameModal