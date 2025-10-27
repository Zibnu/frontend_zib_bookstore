import  { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/images/hero auth.webp"
import apiServices from "../utils/api";
import { useState } from "react";
import { toast } from "react-hot-toast"


function Login () {
  const navigate = useNavigate();
  const [ formData, setFormData ] = useState({
    email : "",
    password : "",
  });
  const [ error, setError ] = useState("");
  const [ loading, setLoading ] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // console.log("Mengirim data", formData);
      const res = await apiServices.post("/auth/login", formData);

      // console.log("Response Backend", res.data)
      const token = res.data.data.token;
      const user = res.data.data.user.id_user
      const role = res.data.data.user.role

      if(!token) {
        console.error("Token Not Found in response");
        toast.error("Login Gagal : token tidak ditemukan");
        return;
      }
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user)

      toast.success("login Berhasil");
      if(role === "admin"){
        navigate("/admin/dashboard")
      }else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error Login", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Email atau Kata Sandi Salah");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#2C3E2F]">
    <div className="bg-[#FBF6EE] rounded-lg shadow-lg w-[850px] flex items-center p-10">
      <div className="flex-1 flex flex-col items-center">
        <h1 className="font-bold text-2xl mb-5">ZibBookstore</h1>
        <img 
        src={authImage}
        alt="Hero auth"
        className="w-64 mt-6"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-center text-lg font-medium mb-6 text-[#333333]">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="bg-[#F0E9DD] rounded-lg border border-[#999999] px-4 py-2 placeholder-[#757575] focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
          required
          />
          <input 
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="bg-[#F0E9DD] rounded-lg border border-[#999999] px-4 py-2 placeholder-[#757575] focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
          required
          />

          <hr className="border-gray-400 my-2"/>

          { error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button 
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md  text-white font-medium cursor-pointer transition ${
            loading ? "bg-[#da8127]" : "bg-[#da8127] hover:bg-[#b9671f]"
          }`}
          > {loading ? "Memproses..." : "Login"}
          </button>
          <div className="mt-4 text-center">
          <p className="text-sm text-[#333333]">
            Belum Punya Akun? {" "}
            <Link to="/register" className="text-[#da8127] font-medium hover:text-[#b9671f] hover:underline">
            Daftar
            </Link>
          </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Login