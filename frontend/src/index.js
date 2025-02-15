import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import Navbar from './components/WebNav';
import HomeScreen from './screens/HomeScreen';
import store from './store.js';
import { Provider } from 'react-redux';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import SignupScreen from './screens/SignupScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import OrderConfirmation from './screens/OrderConfirmation.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import UserOrderScreen from './screens/UserOrderScreen.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import UpdateProductScreen from './screens/admin/UpdateProductScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import WebNav from './components/WebNav';
import SearchResults from './screens/SearchResults.jsx';
import AboutUs from './screens/AboutUs.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route
        path="product/:id"
        element={
          <div>
            <Navbar /> {/* Include Navbar for consistency */}
            <ProductScreen />
          </div>
        }
      />
      <Route
        path="products"
        element={
          <div>
            <Navbar /> {/* Include Navbar for consistency */}
            <HomeScreen />
          </div>
        }
      />
      <Route path="/search/:keyword" element={
        <div>
        <WebNav/> 
        <SearchResults /></div>} />

        <Route path="/about" element={<AboutUs />} />
      <Route
        path="cart"
        element={
          <div>
            <Navbar /> {/* Include Navbar for consistency */}
            <CartScreen />
          </div>
        }
      />
      <Route
        path="login"
        element={
          <div>
            <Navbar /> {/* Include Navbar for consistency */}
            <LoginScreen />
          </div>
        }
      />
      <Route
        path="signup"
        element={
          <div>
            <Navbar /> {/* Include Navbar for consistency */}
            <SignupScreen />
          </div>
        }
      />
      <Route path="" element={<PrivateRoutes />}>
        <Route
          path="checkout"
          element={
            <div>
              <ShippingScreen />
            </div>
          }
        />
        <Route
          path="payment"
          element={
            <div>
              <PaymentScreen />
            </div>
          }
        />
      </Route>
      <Route path="/payment-success" element={<OrderConfirmation />} />
      <Route path="/order/:id" element={<OrderScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/user-order" element={<UserOrderScreen />} />
      <Route path="" element={<AdminRoute />}>
        <Route path="admin/order" element={<div><WebNav/><OrderListScreen /></div>}/>
        <Route path="admin/product" element={<div><WebNav/><ProductListScreen /></div> }/>
        <Route path="admin/product/:id/edit"  element={<div><WebNav/><UpdateProductScreen /></div>}/>
        <Route path="admin/user" element={<div><WebNav/><UserListScreen /></div> }/>
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
