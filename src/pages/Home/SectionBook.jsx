import { useEffect, useState } from "react"
import IconBook from "../../assets/images/Buku Terlaris.png"
import BookCard from "../../components/BookCard"
import apiServices from "../../utils/api";


function SectionBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    apiServices.get("/books/all")
    .then(res => {
      setBooks(res.data?.data || []);
    })
    .catch(err => {
      console.error("Error Fetching Books", err);
    })
  }, [])
  return (
    <div>SectionBook</div>
  )
}

export default SectionBook