import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Regis from "../pages/Regis";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
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
import AdminLayout from "../layouts/AdminLayout";
import GuestRoute from "./GuestRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import Dashboard from "../Admin/pages/Dashboard";
import Books from "../Admin/pages/Books";
import Orders from "../Admin/pages/Orders";
import Users from "../Admin/pages/Users";
import Categories from "../pages/Categories";
import ListNewbook from "../pages/ListNewbook";

export default function AppRouter () {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/book/:id" element={<DetailBook/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        <Route path="/category/:id" element={<CategoryDetail/>}></Route>
        <Route path="/categories" element={<Categories/>} />
        <Route path="/books/terbaru" element={<ListNewbook/>} />

        <Route path="/profile/akun" element={
          <UserRoute>
            <Profile/>
          </UserRoute>
          }></Route>
        <Route path="/profile/transaksi" element={
          <UserRoute>
            <Transaction/>
          </UserRoute>
          }></Route>
        <Route path="/profile/ulasan" element={
          <UserRoute>
            <Review/>
          </UserRoute>
          }></Route>
        <Route path="/profile/alamat" element={
          <UserRoute>
            <Address/>
          </UserRoute>
          }></Route>
        <Route path="/cart" element={
          <UserRoute>
            <Cart/>
          </UserRoute>
          }></Route>
        <Route path="/checkout" element={
          <UserRoute>
            <Checkout/>
          </UserRoute>
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
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <Dashboard/>
          </AdminRoute>
          }></Route>
        <Route path="/admin/books" element={
          <AdminRoute>
            <Books/>
          </AdminRoute>
          }></Route>
        <Route path="/admin/orders" element={
          <AdminRoute>
            <Orders/>
          </AdminRoute>
          }></Route>
        <Route path="/admin/users" element={
          <AdminRoute>
            <Users/>
          </AdminRoute>
          }></Route>
      </Route>
    </Routes>
  )
}