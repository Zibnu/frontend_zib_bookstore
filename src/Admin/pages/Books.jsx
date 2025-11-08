import React, { useEffect, useState } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import apiServices from "../../utils/api";
import TableBooks from "../components/TableBooks";
import AddBookModal from "../components/AddBookModal";
import EditBookModal from "../components/EditBookModal";
import DetailBookModal from "../components/DetailBookModal";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDetail, setOpenDetail] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await apiServices.get("/books/all", {
        params: {
          page,
          search,
        },
      });
      setBooks(res.data.data.books);
      setTotalPages(res.data.data.pagination.totalPages);
    } catch (error) {
      toast(error.response?.data?.message || "Gagal Mengambil data Buku");
      console.error(error);
    }
  };

  // console.log(books)

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  const handleDetail = (id) => setOpenDetail(id);
  const handleEdit = (id) => {
    const bookData = books.find((book) => book.id_book === id);
    setOpenEdit(bookData);
  };
  const handleDelete = (id) => setOpenDelete(id);
  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    setPage(1); //reset ke halaman pertama jika search berubah
  };

  return (
    <div className="bg-[#ffffff] p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Books List</h2>
        <input
          type="text"
          placeholder="Search Book by Title"
          value={search}
          onChange={handleSearchInput}
          className="border border-[#999999]  rounded-lg px-6 py-2 w-lg text-sm focus:ring-2 focus:ring-[#CCCCCC] outline-none transition"
        />
        <button
          onClick={() => setOpenAdd(true)}
          className="bg-[#da8127] hover:bg-[#b9671f] px-4 py-2 rounded-lg font-medium"
        >
          <FaPlus/>
        </button>
      </div>

      <TableBooks
        books={books}
        onDetail={handleDetail}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          <MdNavigateBefore size={20} />
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          <MdNavigateNext size={20} />
        </button>
      </div>

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
  );
}

export default Books;
