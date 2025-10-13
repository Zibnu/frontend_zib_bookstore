import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Regis from "../pages/Regis";
import Login from "../pages/Login";
import Home from "../pages/Home";

const router = createBrowserRouter([
  { path : "/", element : <Home/>},
  { path : "/login", element : <Login/>},
  { path : "/register", element : <Regis/>},
]);

export default function AppRouter () {
  return <RouterProvider router={router}/>
}