import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Home from "./pages/Home"
import About from "./pages/About"
import Products from './pages/Products';
import Services from "./pages/Services"
import Training from './pages/Training';
import Payment from './pages/Payment';
import Contact from "./pages/Contact"
import PaymentRedirect from './pages/PaymentRedirect';

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
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/training" element={<Training />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment-redirect" element={<PaymentRedirect />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
