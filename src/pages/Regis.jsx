import { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/images/hero auth.webp";
import apiServices from "../utils/api";
import { useState } from "react";

function Regis() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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

    try {
      await apiServices.post("/auth/register", form);
      alert("Registrasi Berhasil Silahkan login");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message || "Gagal Melakukan Registrasi";
      setError(message);
    }
  };
  return (
    <div className=" min-h-screen w-screen flex  items-center justify-center bg-[#96A78D]">
      <div className="bg-[#f0f0f0] rounded-2xl shadow-xl w-[850px] flex items-center p-12">
        <div className="flex-1 flex flex-col items-center">
          <h1 className="font-bold text-2xl">ZibBookstore</h1>
          <img src={authImage} alt="Hero Auth" className="w-64 mt-6" />
        </div>

        <div className="flex-1 px-10">
          <h2 className="text-xl font-medium mb-6 text-center ">Register</h2>

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
              className="bg-[#b6ceb4] rounded-lg px-4 py-2 placeholder-[#898080]  focus:ring-2 focus:ring-[#55624C] outline-none transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="bg-[#b6ceb4] rounded-lg px-4 py-2 placeholder-[#898080]  focus:ring-2 focus:ring-[#55624C] outline-none transition"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-[#b6ceb4] rounded-lg px-4 py-2 placeholder-[#898080]  focus:ring-2 focus:ring-[#55624C] outline-none transition"
            />
            <hr className="border-gray-400 mb-3 "/>
            <button
              type="submit"
              className="bg-[#626a5d] text-white py-2   rounded-lg hover:bg-[#2f342d] transition"
            >
              Daftar
            </button>
            <div className="mt-4 text-center ">
          <p className="text-sm">
            Sudah Punya Akun?{" "}
            <Link to="/login" className="text-black font-medium underline">
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
