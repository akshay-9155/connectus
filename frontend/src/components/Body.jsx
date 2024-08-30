import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import Feed from './Feed'
import Bookmark from './Bookmark'
import ImageUpload from './ImageUpload'
const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
    children: [
      {
        path: '/',
        element: <Feed/>
      },
      {
        path: '/profile/:id',
        element: <Profile/>
      },
      {
        path: '/bookmarks',
        element: <Bookmark/>
      },
      {
        path: '/upload',
        element: <ImageUpload/>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  }
])
const Body = () => {
  return (
    <>
        <RouterProvider router={browserRouter}/>
    </>
  )
}

export default Body