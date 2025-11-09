import React from 'react'
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

function UserAddressModal({isOpen, shipment, onClose}) {
  if(!shipment) return null;

  const address = shipment?.address || null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
        initial={{opacity : 0}}
        animate={{opacity : 1}}
        exit={{opacity : 0}}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
          initial={{scale : 0.85, opacity : 0}}
          animate={{scale : 1, opacity : 1}}
          exit={{scale : 0.85, opacity : 0}}
          className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
            onClick={onClose}
            className="absolute right-4 top-4 cursor-pointer">
              <MdClose size={22}/>
            </button>

            <h3 className="text-lg font-semibold mb-4">Customor & Address</h3>

            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{address?.full_name}</div>
              </div>

              <div>
                <div className="text-sm to-gray-500">Phone</div>
                <div className="font-medium">{address.phone}</div>
              </div>

              <div>
                <div className="text-sm to-gray-500">Address</div>
                <div className="font-medium">{address.street}, {address.provinces}, {address.postal_code}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default UserAddressModal