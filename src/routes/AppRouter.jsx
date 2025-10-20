import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import Regis from "../pages/Regis";
import Login from "../pages/Login";
import Home from "../pages/home/home";
import DetailBook from "../pages/DetailBook";
import Profile from "../pages/Profile";


export default function AppRouter () {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/book/:id" element={<DetailBook/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Route>

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Regis/>}/>

      
    </Routes>
  )
}