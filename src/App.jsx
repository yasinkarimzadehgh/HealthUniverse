import React from 'react';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

import AppLayout from "./pages/AppLayout";


// Pages
import Welcome from './pages/Welcome';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import DietRegistryForms from './pages/DietRegistryForms';
import UniverseChat from './pages/UniverseChat';

// Fonts
import './styles/fonts.css';
import "./styles/variables.css"


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppLayout />
      ),
      children: [
        {
          path: '/',
          element: <Welcome />,
        },
        {
          path: '/signUp',
          element: <SignUp />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/home',
          element: <Home />,
        },
        {
          path: '/dietRegistryForm',
          element: <DietRegistryForms />,
        },
        {
          path: '/universeChat',
          element: <UniverseChat />,
        },
        {
          path: '*',
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;