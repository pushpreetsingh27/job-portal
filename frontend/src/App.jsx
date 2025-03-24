import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Jobs from './pages/Jobs'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import JobDescription from './pages/JobDescription'


const router = createBrowserRouter([
  {
    path : "/",
    element :<Home/>
  },
  {
    path : "/login",
    element :<Login/>
  },
  {
    path : "/signup",
    element :<Signup/>
  },
  {
    path : "/jobs",
    element :<Jobs  />
  },
  {
    path : "/browse",
    element :<Browse  />
  },
  {
    path : "/profile",
    element :<Profile  />
  },
  {
    path : "/description/:id",
    element :<JobDescription />
  },
])

const App = () => {
  return (
    <>

<RouterProvider router = {router}/>
<Toaster/>
    </>
  )
}

export default App