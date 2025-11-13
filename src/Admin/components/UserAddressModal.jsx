import React from 'react'
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

function UserAddressModal({isOpen, shipment, onClose}) {
  if(!shipment) return null;

  // console.log(shipment);
  const address = shipment?.address || null;
  const orderId = shipment?.order_id

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

            <h3 className="text-lg font-semibold mb-4">Custumer & Detail Order</h3>

            <div className="space-y-2">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-medium">{address?.full_name || "Data Name is Deleted"}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{address?.phone || "Data Phone is Deleted"}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Address</div>
                <div className="font-medium">{address?.street || "Data street is Deleted"}, {address?.provinces || "Data Provinces Is Deleted"}, {address?.postal_code || "Data Postal_code Is Deleted"}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Order ID :</div>
                <div className="font-medium">{orderId || "Data OrderId is Deleted"}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default UserAddressModal