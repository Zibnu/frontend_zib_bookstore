import { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/images/hero auth.webp";
import apiServices from "../utils/api";
import { useState } from "react";
import toast from "react-hot-toast";

function Regis() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await apiServices.post("/auth/register", form);
      toast.success("Registrasi Berhasil Silahkan login");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || "Gagal Melakukan Registrasi";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className=" min-h-screen flex items-center justify-center bg-[#2C3E2F] p-4">
      <div className="bg-[#FBF6EE] rounded-lg shadow-lg w-full max-w-[850px] flex flex-col md:flex-row items-center p-6 md:p-10">

        <div className="flex-1 flex flex-col items-center text-center md:flex-1  md:items-center">
          <h1 className="font-bold text-2xl">ZibBookstore</h1>
          <img src={authImage} alt="Hero Auth" className="w-48 sm:w-56 md:w-64 mt-4" />
        </div>

        <div className="w-full md:flex-1 mt-8 md:mt-0">
          <h2 className="text-xl font-medium mb-6 text-center text-[#333333]">Register</h2>

          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{error}</p>
          )}

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="bg-[#F0E9DD] rounded-lg px-4 py-2 border border-[#999999] placeholder-[#757575] focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-[#F0E9DD] rounded-lg px-4 py-2 border border-[#999999] placeholder-[#757575] focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-[#F0E9DD] rounded-lg px-4 py-2 border border-[#999999] placeholder-[#757575] focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
            />
            <hr className="border-gray-400 mb-3 "/>
            <button
              type="submit"
              disabled={loading}
              className={`text-white py-2 rounded-lg transition
                ${loading ? "bg-[#da8127]" : "bg-[#da8127] hover:bg-[#b9671f]"}
                `}
            >
              {loading ? "Memproses....." : "Daftar"}
            </button>
            <div className="mt-4 text-center ">
          <p className="text-sm  text-[#333333]">
            Sudah Punya Akun?{" "}
            <Link to="/login" className="text-[#da8127] font-medium hover:underline hover:text-[#b9671f]">
              Masuk
            </Link>
          </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Regis;
