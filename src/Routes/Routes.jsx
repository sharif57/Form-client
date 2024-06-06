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
      },
      {
        path: '/card/:id',
        element: <CardDetails></CardDetails>,
        loader: ({ params }) => fetch(`http://localhost:5000/posts/${params.id}`)
      },
      {
        path: '/comment/:postId',
        element: <Comment></Comment>,
        loader: ({ params }) => fetch(`http://localhost:5000/comments/${params.postId}`)
      },
      {
        path: 'announcement',
        element: <AllAnnouncement></AllAnnouncement>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
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
        element: <MyProfile></MyProfile>
      },
      {
        path: 'allComments/:postId',
        element: <UserAllComment></UserAllComment>,
        loader: ({ params }) => fetch(`http://localhost:5000/comments/${params.postId}`)
      }
      
      ,




      //admin related
      {
        path: 'adminProfile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path: 'manageUsers',
        element: <ManageUser></ManageUser>
      },
      {
        path: 'announcementPost',
        element: <Announcement></Announcement>
      },
      {
        path: 'reported',
        element: <ReportedComment></ReportedComment>
      }
    ]
  }
]);