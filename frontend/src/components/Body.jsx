import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import Feed from './Feed'
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