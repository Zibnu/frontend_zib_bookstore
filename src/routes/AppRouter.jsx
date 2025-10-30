import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import Regis from "../pages/Regis";
import Login from "../pages/Login";
import Home from "../pages/home/home";
import DetailBook from "../pages/DetailBook";
import Profile from "../pages/Profile";
import Transaction from "../pages/Transaction";
import Review from "../pages/Review";
import Address from "../pages/Address";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import SuccessCheckout from "../pages/SuccessCheckout";
import Search from "../pages/Search";
import CategoryDetail from "../pages/CategoryDetail";

export default function AppRouter () {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/book/:id" element={<DetailBook/>}></Route>
        <Route path="/profile/akun" element={<Profile/>}></Route>
        <Route path="/profile/transaksi" element={<Transaction/>}></Route>
        <Route path="/profile/ulasan" element={<Review/>}></Route>
        <Route path="/profile/alamat" element={<Address/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/category/:id" element={<CategoryDetail/>}></Route>
      </Route>

      <Route path="/success-checkout" element={<SuccessCheckout/>} />

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Regis/>}/>

      
    </Routes>
  )
}