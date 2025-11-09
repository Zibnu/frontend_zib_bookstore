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
import AdminLayout from "../layouts/adminLayout";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../Admin/pages/Dashboard";
import Books from "../Admin/pages/Books";
import Orders from "../Admin/pages/Orders";

export default function AppRouter () {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/book/:id" element={<DetailBook/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/category/:id" element={<CategoryDetail/>}></Route>

        <Route path="/profile/akun" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
          }></Route>
        <Route path="/profile/transaksi" element={
          <ProtectedRoute>
            <Transaction/>
          </ProtectedRoute>
          }></Route>
        <Route path="/profile/ulasan" element={
          <ProtectedRoute>
            <Review/>
          </ProtectedRoute>
          }></Route>
        <Route path="/profile/alamat" element={
          <ProtectedRoute>
            <Address/>
          </ProtectedRoute>
          }></Route>
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
          }></Route>
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout/>
          </ProtectedRoute>
          }></Route>
      </Route>

      <Route path="/success-checkout" element={<SuccessCheckout/>} />

      <Route path="/login" element={
        <GuestRoute>
          <Login/>
        </GuestRoute>
        }/>
      <Route path="/register" element={
        <GuestRoute>
          <Regis/>
        </GuestRoute>
        }/>

      <Route element={<AdminLayout/>}>
        <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
        <Route path="/admin/books" element={<Books/>}></Route>
        <Route path="/admin/orders" element={<Orders/>}></Route>
      </Route>
    </Routes>
  )
}