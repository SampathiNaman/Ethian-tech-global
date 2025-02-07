
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"
import Products from './pages/Products';


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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
      
  )
}

export default App
