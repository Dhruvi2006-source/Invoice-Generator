import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InvoiceForm from './pages/InvoiceForm';
import InvoiceDetails from './pages/InvoiceDetails';
import Home from './pages/Home';
import Pricing from './pages/Pricing';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="animate-fade-in-up">
      <Routes location={location}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/invoices/create" 
          element={
            <ProtectedRoute>
              <InvoiceForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/invoices/edit/:id" 
          element={
            <ProtectedRoute>
              <InvoiceForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/invoices/:id" 
          element={
            <ProtectedRoute>
              <InvoiceDetails />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
