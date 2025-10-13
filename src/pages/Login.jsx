import  { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/images/hero auth.webp"
import apiServices from "../utils/api";
import { useState } from "react";


export default function Login () {
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
      const res = await apiServices.post("/auth/login", formData);
      const token = res.data.token;

      if(token) {
        localStorage.setItem("token", token);
        alert ("login Berhasil");
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Email atau Kata Sandi Salah");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#96A78D]">
    <div className="bg-[#f0f0f0] rounded-lg shadow-lg w-[850px] flex items-center p-10 border-2">
      <div className="flex-1 flex flex-col items-center">
        <h1 className="font-bold text-shadow-xl">ZibBookstore</h1>
        <img 
        src={authImage}
        alt="Hero auth"
        className="w-64 mb-4"
        />
      </div>

      <div>
        <h2>Login</h2>
        <form action="">
          <input 
          type="email"
          name="email"
          id=""
          />
        </form>
      </div>



    </div>
  </div>
  );
}