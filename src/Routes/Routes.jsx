import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Page/Home";
import LogIn from "../Page/LogIn";
  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path:'login',
            element:<LogIn></LogIn>
        }
      ]
    },
  ]);