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
import MyProfile from "../Page/MyProfile";
import CardDetails from "../Page/CardDetails";
import Comment from "../Page/Comment";
import Announcement from "../Components/Dashboard/Announcement";
import AllAnnouncement from "../Components/Dashboard/AllAnnouncement";
import UserAllComment from "../Page/UserAllComment";
import ReportedComment from "../Components/Dashboard/ReportedComment";
import AdminProfile from "../Components/Dashboard/AdminProfile";
import Membership from "../Components/Dashboard/Membership";
import PrivateRoutes from "./PrivateRoutes";
import Error from "../Page/Error";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error></Error>,
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
        loader: () => fetch('https://forum-server-self.vercel.app/post')
      },
      {
        path: '/card/:id',
        element: <PrivateRoutes><CardDetails></CardDetails></PrivateRoutes>,
        loader: ({ params }) => fetch(`https://forum-server-self.vercel.app/posts/${params.id}`)
      },
      {
        path: '/comment/:postId',
        element: <Comment></Comment>,
        loader: ({ params }) => fetch(`https://forum-server-self.vercel.app/comments/${params.postId}`)
      },
      {
        path: 'announcement',
        element: <AllAnnouncement></AllAnnouncement>
      },
      {
        path: 'membership',
        element: <PrivateRoutes><Membership></Membership></PrivateRoutes>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children: [
      // user related
      {
        path: "addData",
        element: <AddData></AddData>
      },
      {
        path: 'myPost',
        element: <MyPost></MyPost>
      },
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>,

      },
      {
        path: 'allComments/:postId',
        element: <UserAllComment></UserAllComment>,
        loader: ({ params }) => fetch(`https://forum-server-self.vercel.app/comments/${params.postId}`)
      }

      ,




      //admin related
      {
        path: 'adminProfile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
      },
      {
        path: 'announcementPost',
        element: <AdminRoute><Announcement></Announcement></AdminRoute>
      },
      {
        path: 'reported',
        element: <AdminRoute><ReportedComment></ReportedComment></AdminRoute>
      },

    ]
  }
]);