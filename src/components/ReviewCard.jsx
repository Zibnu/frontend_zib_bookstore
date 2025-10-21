import React from 'react'
import { RiDeleteBin6Fill, RiEdit2Line } from "react-icons/ri";

function ReviewCard({ review, onEdit, onDelete}) {
  const { book, rating ,comment, createdAt} = review;

    const formatTanggal = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day : "2-digit",
      month : "long",
      year : "numeric",
    });
  };

  // console.log(book.cover_path);

  return (
    <div className='bg-white shadow-sm rounded-xl p-4 border border-gray-200 flex items-center justify-between hover:shadow-md transition-all'>
      <div className="flex items-center gap-4">
        <img 
        src={book?.cover_path}
        alt={book?.title}
        className= "w-16 h-20 object-cover rounded-md"
        />
        <div>
          <p className="font-semibold text-gray-800">{book?.title}</p>
          <p className="text-xs text-gray-500 mb-1">{formatTanggal(createdAt)}</p>
          <div className="flex items-center mb-1">
            {[1,2,3,4,5].map((num) => (
              <span 
              key={num}
              className={`text-lg ${
                num <= rating ? "text-yellow-400" : "text-gray-300"
              }`}>
                ★
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600 italic">{comment}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
        onClick={ () => onEdit(review)}
        className="text-blue-500 cursor-pointer hover:text-blue-700">
          <RiEdit2Line size={20}/>
        </button>
        <button 
        onClick={() => onDelete(review)}
        className="text-red-500 cursor-pointer hover:text-red-700">
          <RiDeleteBin6Fill size={20}/>
        </button>
      </div>
    </div>
  )
}

export default ReviewCard