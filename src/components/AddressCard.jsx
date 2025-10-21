import React from "react";
import { RiDeleteBin6Fill, RiEdit2Line } from "react-icons/ri";

function AddressCard({ address, onEdit, onDelete }) {
  const { full_name, phone, provinces, postal_code, street } = address;
  return (
    <div className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
      <div className="mb-2">
        <p className="font-semibold text-gray-800">{full_name}</p>
        <p className="font-semibold text-gray-500">{phone}</p>
      </div>

      <p className="text-gray-700 text-sm mb-4">
        {street}, {provinces}, {postal_code}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(address)}
          className="text-blue-500 cursor-pointer hover:text-blue-700"
        >
          <RiEdit2Line size={20} />
        </button>
        <button
          onClick={() => onDelete(address)}
          className="text-red-500 cursor-pointer hover:text-red-700"
        >
          <RiDeleteBin6Fill size={20} />
        </button>
      </div>
    </div>
  );
}

export default AddressCard;
