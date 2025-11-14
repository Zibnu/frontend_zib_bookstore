import React from 'react'
import Lotie from "lottie-react"
import { motion } from 'framer-motion'
import successAnimation from "../assets/animation/Add To Cart Success.json"
import { useNavigate } from 'react-router-dom'


function SuccessCheckout() {
  const navigate = useNavigate();

  return (
    <motion.div 
    initial={{opacity : 0, scale : 0.9}}
    animate={{opacity : 1, scale : 1}}
    transition={{ duration : 0.5}}
    className='flex flex-col items-center justify-center min-h-screen bg-[#FBF6EE] text-center'
    >
      <Lotie animationData={successAnimation} className='w-64 h-64'/>

      <h2 className="text-2xl font-semibold text-[#333333] mt-6">
        Terimakasih Pesanan Anda Sedang di Proses
      </h2>

      <button 
      onClick={() => navigate("/")}
      className="mt-8 px-6 py-3 bg-[#da8127] text-white rounded-xl hover:bg-[#b96a1d] cursor-pointer transition">
        Lanjut Belanja
      </button>
    </motion.div>
  )
}

export default SuccessCheckout