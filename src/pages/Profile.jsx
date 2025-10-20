import EditNameModal from '../components/EditNameModal'
import EditPasswordModal from '../components/EditPasswordModal'
import { toast } from "react-hot-toast"
import SideBarProfile from '../components/SideBarProfile'
import apiServices from '../utils/api'
import { useEffect, useState } from 'react'
import { FaPencilAlt } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEditName, setOpenEditName] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if(!token) {
        toast.error("Silahkan Login Terlebih Dahulu");
        return;
      }
      const res = await apiServices.get("/user/myProfile", {
        headers : {
          Authorization : `Bearer ${token}`,
        }
      });
      setUser(res.data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal Mengambil Data User");
      console.error(error.message)
      setLoading(false);
    }
  };

  // console.log(user)

  useEffect(() => {
    fetchProfile();
  }, []);
  
  if(loading) return <div className="text-center py-10 text-gray-600">Memuat Profile....</div>
  return (
    <div className='min-h-screen flex bg-[#f5f5f5]'>

      <SideBarProfile/>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-10">Akun Saya</h2>

        <div className="bg-[#f5f5f5] shadow-lg p-5 rounded-lg mb-4 border border-gray-200 backdrop-blur-md">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Nama Lengkap</p>
            <p className="font-medium">{user?.username || "-"}</p>
            <button
            onClick={ () => setOpenEditName(true)} className='cursor-pointer'
            >
              <FaPencilAlt size={15}/>
            </button>
          </div>
        </div>

        <div className="bg-[##f5f5f5] shadow-lg p-5 rounded-lg mb-4 border border-gray-200 backdrop-blur-md">
            <p className="text-gray-700">Email</p>
            <p className="font-medium">{user?.email}</p>
        </div>

        <div className="bg-[##f5f5f5] shadow-lg p-5 rounded-lg mb-4 border border-gray-200 backdrop-blur-md">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Kata Sandi</p>
            <p className="font-medium">******</p>
            <button onClick={ () => setOpenEditPassword(true)} className='cursor-pointer'>
              <FaPencilAlt size={15}/>
            </button>
          </div>
        </div>

        {/* Modal Edit Name */}
        { openEditName && (
          <EditNameModal
          user={user}
          onClose={() => setOpenEditName(false)}
          onSuccess={() => {
            fetchProfile();
            setOpenEditName(false)
          }}
          />
        )}

        { openEditPassword && (
          <EditPasswordModal
          onClose={ () => setOpenEditPassword(false)}
          onSuccess={() => {
            fetchProfile();
            setOpenEditPassword(false)
          }}
          />
        )}
      </div>
    </div>
  )
}

export default Profile