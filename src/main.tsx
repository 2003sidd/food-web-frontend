import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './component/home/home.tsx';
import Hero from './component/hero/hero.tsx';
import AboutUs from './component/Info-pages/about.tsx';
import GetHelp from './component/Info-pages/getHelp.tsx';
import NotFound from './component/Info-pages/notFound.tsx';
import Privacy from './component/Info-pages/privacyPolicy.tsx';
import TermsCondition from './component/Info-pages/term&condition.tsx';
import Login from './component/Login/login.tsx';
import Register from './component/Register/register.tsx';
import MenuByResturant from './component/menu/menyByResturant.tsx';
import MenuByCategory from './component/menu/menuByCategory.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import ProtectedRoute from './protectedRoute/protectedRoute.ts';
import Cart from './component/cart/cart.tsx';
import Checkout from './component/checkout/checkout.tsx';
import AddAddress from './component/address/AddAdress.tsx';
import OrderList from './component/order/orderList.tsx';
import OrderDetail from './component/order/orderDetail.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<App />} />, // Home route
    children: [{
      path: "/",
      element: <Home />, // About route
    }, {
      path: "/hero",
      element: <Hero />, // About route
    },
     {
      path: "/orderList",
      element: <OrderList />, // About route
    },
     {
      path: "/orderDetail",
      element: <OrderDetail />, // About route
    },
    {
      path: "/address",
      element: <AddAddress />, // About route
    },
    {
      path: "/cart",
      element: <Cart />, // About route

    },
    {
      path: "/checkout",
      element: <Checkout />, // About route
    },
    {
      path: "/about",
      element: < AboutUs />, // Projects route
    },
    {
      path: "/MenuByResturant/:id",
      element: < MenuByResturant />, // Projects route
    },
    {
      path: "/MenuByCategory/:id",
      element: < MenuByCategory />, // Projects route
    },
    {
      path: "/privacyPolicy",
      element: < Privacy />, // Projects route
    },
    {
      path: "/terms&Condition",
      element: < TermsCondition />, // Projects route
    },

    {
      path: "/contact",
      element: <GetHelp />, // Contact route
    },
    {
      path: "*",
      element: <NotFound />, // Catch-all route for 404 Not Found
    },]
  }, {
    path: "/login",
    element: < Login />, // Projects route
  },
  {
    path: "/register",
    element: < Register />, // Projects route
  },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>

      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
