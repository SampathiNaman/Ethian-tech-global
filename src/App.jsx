import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CoursePurchasesProvider } from './context/CoursePurchasesContext';
import Home from "./pages/Home"
import About from "./pages/About"
import Products from './pages/Products';
import Services from "./pages/Services"
import Training from './pages/Training';
import Payment from './pages/Payment';
import Contact from "./pages/Contact";
import Policies from './pages/Policies';
import InstallmentPayment from './pages/InstallmentPayment';
import PaymentRedirect from './pages/PaymentRedirect';
import LoginPopup from './components/LoginPopup';
import SignupPopup from './components/SignupPopup';

function App() {
  return (
    <div className="App">
      <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={24}
          toastOptions={{
              className: 'bg-white border border-gray-300 rounded-md shadow-md',
              duration: 3000,
              removeDelay: 1000,
              ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
              },
          }}
      />      
      <BrowserRouter>
          <AuthProvider>
              <CoursePurchasesProvider>
                  <AppRoutes />
              </CoursePurchasesProvider>
          </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

function AppRoutes() {
    const { authPopupState, closeAuthPopup, switchToSignupForm, switchToLoginForm } = useAuth();
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/services" element={<Services />} />
                <Route path="/training" element={<Training />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment-redirect" element={<PaymentRedirect />} />
                <Route path="/installment-payment" element={<InstallmentPayment />} />
                <Route path="/policies" element={<Policies />} />
            </Routes>
            {authPopupState === 'login' && (
                <LoginPopup onClose={closeAuthPopup} onSwitchToSignup={switchToSignupForm} />
            )}
            {authPopupState === 'signup' && (
                 <SignupPopup onClose={closeAuthPopup} onSwitchToLogin={switchToLoginForm} />
            )}
        </>
    );
}

export default App;
