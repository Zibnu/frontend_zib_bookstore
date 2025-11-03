import EditNameModal from '../components/EditNameModal'
import EditPasswordModal from '../components/EditPasswordModal'
import { toast } from "react-hot-toast"
import SideBarProfile from '../components/SideBarProfile'
import apiServices from '../utils/api'
import { useEffect, useState } from 'react'
import { RiEdit2Line } from "react-icons/ri";

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
    <div className='min-h-screen flex bg-[#FBF6EE]'>

      <SideBarProfile/>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-10">Akun Saya</h2>

        <div className="bg-[#FFFFFF] shadow-sm p-5 rounded-lg mb-4 border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
            <p className="text-gray-700">Username</p>
            <p className="font-medium mt-3">{user?.username || "-"}</p>
            </div>
            <button
            onClick={ () => setOpenEditName(true)} className='cursor-pointer mt-5 text-[#da8127] hover:text-[#b9671f]'
            >
              <RiEdit2Line size={18}/>
            </button>
          </div>
        </div>

        <div className="bg-[#FFFFFF] shadow-sm p-5 rounded-lg mb-4 border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
            <p className="text-gray-700">Email</p>
            <p className="font-medium mt-3">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF] shadow-sm p-5 rounded-lg mb-4 border border-[#E5E7EB] hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
            <p className="text-gray-700">Kata Sandi</p>
            <p className="font-medium mt-3">******</p>
            </div>
            <button onClick={ () => setOpenEditPassword(true)} className='cursor-pointer mt-5 text-[#da8127] hover:text-[#b9671f]'>
              <RiEdit2Line size={18}/>
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