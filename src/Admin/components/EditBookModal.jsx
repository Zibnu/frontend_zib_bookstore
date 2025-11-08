import React, { useEffect, useState } from 'react'
import apiServices from '../../utils/api'
import toast from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion';

function EditBookModal({isOpen, onClose, onSuccess, book}) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title : "",
    author : "",
    description : "",
    category_id : "",
    price_cents : "",
    stock : "",
    cover_path : null,
  });

  const fetchCategories = async () => {
    try {
      const res = await apiServices.get("/categories/");
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Mengambil Data Category");
    }
  };

  useEffect(() => {
    if(isOpen && book) {
      fetchCategories();
      setFormData({
        title : book.title || "",
        author : book.author || "",
        description : book.description || "",
        category_id : book.category_id || "",
        price_cents : book.price_cents || "",
        stock : book.stock || "",
        cover_path : null
      })
    }
  }, [isOpen, book]);

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name] : value});
  };

  const handleFileChange = (e) => {
    setFormData({...formData, cover_path : e.target.files[0]});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if(formData[key] !== null && formData[key] !== ""){
          form.append(key, formData[key]);
        }
      });

      await apiServices.put(`/books/${book.id_book}`, form, {
        headers : {
          Authorization : `Bearer ${token}`
        },
      });

      toast.success("Update Book Success");
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Gagal Update Book");
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div 
      initial={{opacity : 0}}
      animate={{opacity : 1}}
      exit={{opacity : 0}}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <motion.div 
        initial={{scale : 0.8 , opacity : 0}}
        animate={{scale : 1, opacity : 1}}
        exit={{scale : 0.8, opacity : 0}}
        className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg relative">
          <h2 className="text-lg font-semibold mb-4">Edit Book</h2>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className="text-sm font-medium">Title</label>
              <input 
              type="text" 
              name='title'
              value={formData.title}
              onChange={handleChange}
              className='w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              />
            </div>

            <div>
              <label className="text-sm font-medium">Author</label>
              <input 
              type="text" 
              name='author'
              value={formData.author}
              onChange={handleChange}
              className='w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea 
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              rows={5}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <select 
              type="text" 
              name='category_id'
              value={formData.category_id}
              onChange={handleChange}
              className='w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id_category} value={category.id_category}>
                    {category.name_category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Price</label>
              <input 
              type="number" 
              name='price_cents'
              value={formData.price_cents}
              onChange={handleChange}
              className='w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              />
            </div>

            <div>
              <label className="text-sm font-medium">Stock</label>
              <input 
              type="number" 
              name='stock'
              value={formData.stock}
              onChange={handleChange}
              className='w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              />
            </div>

            <div>
              <label className="text-sm font-medium">Cover Image</label>
              <input 
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className='w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition'
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type='button'
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer">
                Cancel
              </button>

              <button
                type='submit'
                className="px-4 py-2 bg-[#da8127] text-white hover:bg-[#b9671f] rounded-lg transition cursor-pointer">
                Save Changes
              </button>
            </div>


          </form>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EditBookModal