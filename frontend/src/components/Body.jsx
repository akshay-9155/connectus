import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import Feed from './Feed'
import Bookmark from './Bookmark'
import ImageUpload from './ImageUpload'
import { useSelector } from 'react-redux'

const Body = () => {
  const { loggedInUser } = useSelector(state => state.user);
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: loggedInUser ? <Home /> : <Login />,
      children: [
        {
          path: "/",
          element: loggedInUser ? <Feed /> : <Login />,
        },
        {
          path: "/profile/:id",
          element: loggedInUser ? <Profile /> : <Login />,
        },
        {
          path: "/bookmarks",
          element: loggedInUser ? <Bookmark /> : <Login />,
        },
        {
          path: "/upload",
          element: loggedInUser ? <ImageUpload /> : <Login />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
        <RouterProvider router={browserRouter}/>
    </>
  )
}

export default Body