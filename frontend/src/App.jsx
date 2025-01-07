import { createContext, useContext, useState } from 'react'
import Login from './components/Login'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FrontPage from './FrontPage';
import Signup from './components/Signup';
import ProductDetail from './components/ProductDetail'
import BulkOrderPage from './components/BulkOrderPage';
import SmartWatch from './components/Pages/SmartWatch';
import NewLaunches from './components/Pages/NewLaunches';
import EarPhones from './components/Pages/EarPhones';
import Speaker from './components/Pages/Speaker';
import Accessories from './components/Pages/Accessories';
import User from './components/User'
import Admin from './components/Admin';
import AddProduct from './components/Pages/AddProduct';
import UserInfo from './components/UserInfo';
import MyOrders from './components/MyOrders';
import AdminInfo from './components/AdminInfo';
import AddAdvPageProduct from './components/Pages/AddAdvPageProduct';
import UpdateProduct from './components/UpdateProduct';
import OrderDetails from './components/OrderDetails';
import Users from './components/Users';
import StripeCheckout from './components/StripeCheckout';
import LuxeEditionPage from './components/Pages/LuxeEditionPage';
import ValueEditionPage from './components/Pages/ValueEditionPage';
import ScrollToTop from './components/ScrollComponent';
import { Toaster } from 'react-hot-toast';
import AllProducts from './components/Pages/AllProducts';
import OrderInformationForm from './components/OrderPages/OrderInformationFrom';
import Header from './components/Header';
import { AuthProvider, useAuth } from './AuthProvider';
import OTPVerification from './components/OTPVerification';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Toaster position="top-center" />
        
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/ProductDetail/:id" element={<ProductDetail />} />
          <Route path="/smartwatch" element={<SmartWatch />} />
          <Route path="/newlaunches" element={<NewLaunches />} />
          <Route path="/earphones" element={<EarPhones />} />
          <Route path="/speakers" element={<Speaker />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/viewall" element={<AllProducts />} />
          <Route path="/luxeEditionPage" element={<LuxeEditionPage />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/ValueEditionPage" element={<ValueEditionPage />} />

          {/* Protected routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-information-form"
            element={
              <ProtectedRoute>
                <OrderInformationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <StripeCheckout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myOrders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UserInfo"
            element={
              <ProtectedRoute>
                <UserInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/OrderDetails"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>           
                <Users/>
              </ProtectedRoute> 
            } />
          <Route 
            path="/viewall" 
            element={
              <ProtectedRoute>           
                <AllProducts/>
              </ProtectedRoute> 
            } />
          <Route
            path="/addProducts"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminInfo"
            element={
              <ProtectedRoute>
                <AdminInfo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProductDetail/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          /> 
          <Route
            path="/updateProduct/:id"
            element={
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;



// function App() {
//   return (
//     <>
//         <BrowserRouter> 
//         <Toaster />
//         <ScrollToTop/>
//           <Routes>
//             <Route path="/" element={<FrontPage />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/addProducts" element={<AddProduct />} />
//             <Route path="/register" element={<Signup/>} />
//             <Route path="/user" element={<User />} />
//             <Route path="/ProductDetail/:id" element={<ProductDetail/>} />
//             <Route path="/updateProduct/:id" element={<UpdateProduct/>} />
//             <Route path="/bulkorder" element={<BulkOrderPage/>} />
//             <Route path="/smartwatch" element={<SmartWatch/>} />
//             <Route path="/newlaunches" element={<NewLaunches/>} />
//             <Route path="/earphones" element={<EarPhones/>} />
//             <Route path="/speakers" element={<Speaker/>} />
//             <Route path="/accessories" element={<Accessories/>} />
//             <Route path="/UserInfo" element={<UserInfo/>} />
//             <Route path="/myOrders" element={<MyOrders/>} />
//             <Route path="/addProductToAdvPage" element={<AddAdvPageProduct/>} />
//             <Route path="/AdminInfo" element={<AdminInfo/>} />
//             <Route path="/luxeEditionPage" element={<LuxeEditionPage/>} />
//             <Route path="/ValueEditionPage" element={<ValueEditionPage/>} />
//             <Route path="/OrderDetails" element={<OrderDetails/>} />
//             <Route path="/users" element={<Users/>} />
//             <Route path="/viewall" element={<AllProducts/>} />
//             <Route path="/stripeCheckout" element={<StripeCheckout/>} />
//             <Route path="/order-information-form" element={<OrderInformationForm/>} />
//           </Routes>
//         </BrowserRouter>

        
        
        
        
//     </>
//   )
// }
// export default App;
