import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Register} from "./components/organism/authent/Register.tsx";
import {AuthLayout} from "./components/layouts/AuthLayout.tsx";
import {Error404} from "./components/errors/Error404.tsx";
import {Login} from "./components/organism/authent/Login.tsx";
import {Toaster} from "react-hot-toast";
import {Validate} from "@organism/authent/Validate.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/validate/:id",
                element: <Validate />
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div><Toaster position={'top-right'} reverseOrder={false}/></div>
    <RouterProvider router={router} />
  </StrictMode>,
)
