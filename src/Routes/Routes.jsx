import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Page/Home";
import LogIn from "../Page/LogIn";
import Dashboard from "../Components/Dashboard/Dashboard";
import ManageUser from "../Components/Dashboard/ManageUser";
import Register from "../Page/Register";
import PostData from "../Page/PostData";
import AddData from "../Page/AddData";
import MyPost from "../Page/MyPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <LogIn></LogIn>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: '/post',
        element: <PostData></PostData>,
        loader: () => fetch('http://localhost:5000/post')
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      // user related
      {
        path:"addData",
        element:<AddData></AddData>
      },
      {
        path: 'myPost',
        element: <MyPost></MyPost>
      },

      //admin related
      {
        path: 'manageUsers',
        element: <ManageUser></ManageUser>
      }
    ]
  }
]);