import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import Regis from "../pages/Regis";
import Login from "../pages/Login";
import Home from "../pages/home/home";


export default function AppRouter () {
  return (
    <Routes>
      <Route element={<UserLayout/>}>
        <Route path="/" element={<Home/>}></Route>
      </Route>

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Regis/>}/>

      
    </Routes>
  )
}