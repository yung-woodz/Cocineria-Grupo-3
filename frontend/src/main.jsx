import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Dishes from '@pages/Dishes';
import CreateDishForm from '@pages/CreateDish';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Inventory from '@pages/Inventory';
import CreateProduct from '@pages/createProduct';
import Order from '@pages/Order';
import Notifications from '@pages/Notifications';
import Allorders from '@pages/Allorders';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";  
import "@fontsource/montserrat/700.css";

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error404/>,
    children: [
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/inventory',
        element: <Inventory/>
      },
      {
        path: '/inventory/create-product',
        element: <CreateProduct />
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dishes', // Ruta para DishesPage
        element: (
          <ProtectedRoute allowedRoles={['administrador']}> 
            <Dishes/>
          </ProtectedRoute>
        ),
      },
      {
        path: '/create-dish', // Nueva ruta para el formulario de creación
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <CreateDishForm /> 
          </ProtectedRoute>
        ),
      },
      {
        path: '/order',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'mesero']}>
          <Order />
        </ProtectedRoute>
        ),
      },
      {
        path: '/order/orderByChef',
        element: (
        <ProtectedRoute allowedRoles={['administrador', 'mesero', 'cocinero', 'jefeCocina']}>
          <Notifications />
        </ProtectedRoute>
        ),
      },
      {
        path: '/order/all',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'mesero', 'cocinero', 'jefeCocina']}>
            <Allorders />
          </ProtectedRoute>
        ),
      }
    ]
  },
  {
    path: '/auth',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router}/>
  </ThemeProvider>
);
