import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import InvoiceForm from './pages/InvoiceForm';
import InvoiceDetails from './pages/InvoiceDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
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
      </Router>
    </AuthProvider>
  );
}

export default App;
