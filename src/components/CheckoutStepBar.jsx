import React from 'react'

function CheckoutStepBar({ currentStep}) {
  return (
    <div className='flex items-center gap-4 mb-8'>
      <div className={`flex items-center gap-2 ${currentStep === "shipping" ? "text-[#da8127]" : "text-gray-400"}`}>
        <div className="w-8 h-8 flex items-center justify-center border rounded-full font-medium">
          1
        </div>
        <span className='text-sm'>Pengiriman</span>
      </div>

      <div className="flex-1 border-t border-gray-300"></div>

      <div className={`flex items-center gap-2 ${currentStep === "payment" ? "text-[#da8127]" : "text-gray-300"}`}>
        <div className="w-8 h-8 flex items-center justify-center border rounded-full font-medium">
          2
        </div>
        <span className='text-sm'>Pembayaran</span>
      </div>
    </div>
  )
}

export default CheckoutStepBar