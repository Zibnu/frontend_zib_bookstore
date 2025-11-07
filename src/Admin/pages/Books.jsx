import React, { useEffect, useState } from 'react';
import apiServices from '../../utils/api';
import TableBooks from '../components/TableBooks';
import AddBookModal from '../components/AddBookModal';
import EditBookModal from '../components/EditBookModal';
import DetailBookModal from '../components/DetailBookModal';
import DeleteModal from '../components/DeleteModal';
import toast from 'react-hot-toast';

function Books() {
  const [books, setBooks] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDetail, setOpenDetail] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await apiServices.get("/books/all");
      setBooks(res.data.data.books);
    } catch (error) {
      toast(error.response?.data?.message || "Gagal Mengambil data Buku")
      console.error(error)
    }
  };

  // console.log(books)

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDetail = (id) => setOpenDetail(id);
  const handleEdit = (id) => {
    const bookData = books.find((book) => book.id_book === id);
    setOpenEdit(bookData)
  };
  const handleDelete = (id) => setOpenDelete(id);

  return (
    <div className='bg-[#ffffff] p-6 rounded-xl shadow'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Books List</h2>
        <button
        onClick={() => setOpenAdd(true)}
        className="bg-[#da8127] hover:bg-[#b9671f] px-4 py-2 rounded-lg font-medium">
          Add New Book
        </button>
      </div>

        <TableBooks
        books={books}
        onDetail={handleDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
        />

        <AddBookModal
        isOpen={openAdd}
        onSuccess={fetchBooks}
        onClose={() => setOpenAdd(false)}
        />

        <EditBookModal
        isOpen={!!openEdit}
        onClose={() => setOpenEdit(null)}
        onSuccess={fetchBooks}
        book={openEdit}
        />

        <DetailBookModal
        isOpen={openDetail}
        onClose={() => setOpenDetail(null)}
        />

        <DeleteModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(null)}
        onSuccess={fetchBooks}
        />
    </div>
  )
}

export default Books