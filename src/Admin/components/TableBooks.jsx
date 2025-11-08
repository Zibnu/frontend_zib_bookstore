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
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">No</th>
            <th className="p-3 border">Cover</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Stock</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Rating</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {books.length > 0 ? (
            books.map((book,index) => (
              <tr
              key={book.id_book}
              className='border hover:bg-gray-50'
              >
                <td className="p-3 border">{index + 1}</td>
                <td className='p-3 border'>
                  <img
                  src={book.cover_path}
                  alt={book.title}
                  className='w-12 h-16 object-cover'
                  />
                </td>
                <td className="p-3 border">{book.title}</td>
                <td className="p-3 border">{formatRupiah(book.price_cents)}</td>
                <td className="p-3 border">{book.stock}</td>
                <td className="p-3 border">{book.category?.name_category}</td>
                <td className="p-3 border"><IoIosStar className='text-yellow-300'/>{book.averageRating}</td>
                <td className="p-3 border text-center align-middle">
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