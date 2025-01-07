import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './routes/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/Provider.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <AuthProvider>
    <Toaster  />
    <RouterProvider router={router}></RouterProvider>

    </AuthProvider>
   
  </StrictMode>,
)
