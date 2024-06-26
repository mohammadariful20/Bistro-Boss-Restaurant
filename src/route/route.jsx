import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/authentication/login/Login";
import Signup from "../pages/authentication/login/Signup";
import AddItem from "../pages/dashbood/admin/addItem/AddItem";
import Users from "../pages/dashbood/admin/users/Users";
import LayOut from "../pages/dashbood/layout/LayOut";
import MyCart from "../pages/dashbood/users/myCart/MyCart";
import Order from "../pages/order/Order";
import Shop from "../pages/shop/Shop";
import AdminRoute from "../private/AdminRoute";
import PrivateRoute from "../private/PrivateRoute";
import Root from "../root/Root";
import ManageItems from "../pages/dashbood/admin/manageItems/ManageItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/orders",
        element: <Order></Order>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
      {
        path: "/shop/:category",
        element: <Shop></Shop>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <LayOut></LayOut>,
    children: [
      {
        path: "/dashboard/mycart",
        element: (
          <PrivateRoute>
            <MyCart></MyCart>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <Users></Users>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addItem",
        element: (
          <AdminRoute>
            <AddItem></AddItem>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageitems",
        element: (
          <AdminRoute>
           <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
