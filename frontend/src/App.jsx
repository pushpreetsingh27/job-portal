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
import Companies from './pages/Companies'
import CreateCompany from './pages/CreateCompany'
import CompanySetup from './pages/CompanySetup'
import AdminJobs from './pages/AdminJobs'
import PostJob from './pages/PostJob'


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
  {
    path : "/admin/companies",
    element :<Companies />
  },
  {
    path : "/admin/companies/:id",
    element :<CompanySetup />
  },
  {
    path : "/admin/companies/create",
    element :<CreateCompany />
  },
  {
    path : "/admin/jobs",
    element :<AdminJobs />
  },
  {
    path : "/admin/jobs/create",
    element :<PostJob />
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