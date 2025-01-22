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
import {AuthProvider} from "@contexts/AuthContext.tsx";
import {Layout} from "@layouts/Layout.tsx";
import {Dashboard} from "@organism/game/Dashboard.tsx";
import {Lobby} from "@organism/game/Lobby.tsx";
import {List} from "@organism/game/List.tsx";

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
    },
    {
        path: "/game",
        element: <Layout />,
        errorElement: <Error404/>,
        children: [
            {
                path: "/game/dashboard",
                element: <Dashboard/>
            },
            {
                path: "/game/lobby/:id",
                element: <Lobby/>
            },
            {
                path: "/game/list",
                element: <List/>
            }
        ]
    }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <div className={"min-h-screen bg-[length:100px_100px] bg-[url('/pokeball-de-miraidon.png')]"}>
          <AuthProvider>
              <div><Toaster position={'top-right'} reverseOrder={false}/></div>
              <RouterProvider router={router}/>
          </AuthProvider>
      </div>
  </StrictMode>,
)
