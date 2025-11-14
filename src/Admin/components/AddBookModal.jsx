import React from "react";
import apiServices from "../../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

function AddBookModal({ isOpen, onClose, onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category_id: "",
    price_cents: "",
    stock: "",
    cover_path: null,
  });

  const fetchCategories = async () => {
    try {
      const res = await apiServices.get("/categories/");
      setCategories(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Gagal Mengambil Data Category from add Book Modal"
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cover_path: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));

      await apiServices.post("/books/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Upload Book Success");
      setFormData({
        title: "",
        author: "",
        description: "",
        category_id: "",
        price_cents: "",
        stock: "",
        cover_path: null,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg"
          >
            <h2 className="text-lg font-semibold mb-4">Add New Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full border border-[#999999] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#CCCCCC] transition"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option
                      key={category.id_category}
                      value={category.id_category}
                    >
                      {category.name_category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price_cents"
                  value={formData.price_cents}
                  onChange={handleChange}
                  className="w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-[#999999] rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
                  rows={5}
                  required
                />
              </div>





              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#da8127] text-white hover:bg-[#b9671f] transition rounded-lg cursor-pointer"
                >
                  Add New Book
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddBookModal;
