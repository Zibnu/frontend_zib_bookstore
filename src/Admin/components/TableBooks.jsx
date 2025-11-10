import React from 'react'
import { VscEye } from "react-icons/vsc";
import { RiEdit2Line, RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosStar } from "react-icons/io";


function TableBooks({books, onDetail, onEdit, onDelete}) {
    const formatRupiah = (value) => {
    if (!value && value !== 0) return "0";
    const cleaned = value.toString().replace(/[^\d]/g, "");
    return "Rp" + cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="w-full overflow-x-auto mt-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-500 text-left">
            <th className="p-3 border border-gray-300">No</th>
            <th className="p-3 border border-gray-300">Cover</th>
            <th className="p-3 border border-gray-300">Title</th>
            <th className="p-3 border border-gray-300">Price</th>
            <th className="p-3 border border-gray-300">Stock</th>
            <th className="p-3 border border-gray-300">Category</th>
            <th className="p-3 border border-gray-300">Rating</th>
            <th className="p-3 border border-gray-300">Action</th>
          </tr>
        </thead>

        <tbody>
          {books.length > 0 ? (
            books.map((book,index) => (
              <tr
              key={book.id_book}
              className='border hover:bg-gray-50'
              >
                <td className="p-3 border border-gray-300">{index + 1}</td>
                <td className='p-3 border border-gray-300'>
                  <img
                  src={book.cover_path}
                  alt={book.title}
                  className='w-12 h-16 object-cover'
                  />
                </td>
                <td className="p-3 border border-gray-300">{book.title}</td>
                <td className="p-3 border border-gray-300">{formatRupiah(book.price_cents)}</td>
                <td className="p-3 border border-gray-300">{book.stock}</td>
                <td className="p-3 border border-gray-300">{book.category?.name_category}</td>
                <td className="p-3 border border-gray-300"><IoIosStar className='text-yellow-300'/>{book.averageRating}</td>
                <td className="p-3 border border-gray-300 text-center align-middle">
                  <div className="flex justify-center items-center gap-3">
                  <button
                  onClick={() => onDetail(book.id_book)}
                  className='text-[#da8127] hover:text-[#b9671f] cursor-pointer'
                  >
                    <VscEye/>
                  </button>
                  <button
                  onClick={() => onEdit(book.id_book)}
                  className='text-[#da8127] hover:text-[#b9671f] cursor-pointer'
                  >
                    <RiEdit2Line/>
                  </button>
                  <button
                  onClick={() => onDelete(book.id_book)}
                  className='text-red-400 hover:text-red-600 cursor-pointer'
                  >
                    <RiDeleteBin6Fill/>
                  </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className='text-center p-4 text-gray-500'>
                The book is not available yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TableBooks