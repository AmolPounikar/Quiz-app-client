import React from 'react'
import '../styles/App.css'
import Main from './Main'
import Quiz from './Quiz'
import Result from './Result'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { CheckUserExist } from '../helper/helper'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/quiz',
    element: <CheckUserExist>
      <Quiz />
    </CheckUserExist>
  },
  {
    path: '/result',
    element: <CheckUserExist>
      <Result />
    </CheckUserExist>
  },
])
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App