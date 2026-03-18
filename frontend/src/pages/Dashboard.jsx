import { useState, useEffect, useContext } from 'react';
import { Link , Navigate} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
  const { logout , token } = useContext(AuthContext);
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  if(!token){
    return <Navigate to="/" replace />;
  }

  const fetchInvoices = async () => {
    try {
      const { data } = await api.get('/invoices');
      setInvoices(data);
    } catch (err) {
      console.error('Error fetching invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await api.delete(`/invoices/${id}`);
        setInvoices(invoices.filter((inv) => inv._id !== id));
      } catch (err) {
        console.error('Error deleting invoice:', err);
      }
    }
  };

  const filteredInvoices = invoices.filter((inv) => 
    inv.clientName.toLowerCase().includes(search.toLowerCase()) || 
    inv.invoiceNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">Invoice Generator</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between flex-wrap gap-4 mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Invoices</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <input 
              type="text"
              placeholder="Search by client or #"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <Link 
              to="/invoices/create"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none whitespace-nowrap"
            >
              + Create Invoice
            </Link>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 whitespace-nowrap text-center text-sm text-gray-500">
                      Loading invoices...
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 whitespace-nowrap text-center text-sm text-gray-500">
                      {search ? 'No invoices found matching your search.' : 'No invoices found. Create one to get started!'}
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-l-4 border-transparent hover:border-blue-500">
                        {invoice.invoiceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {invoice.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        ${invoice.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-4 items-center">
                          <Link 
                            to={`/invoices/${invoice._id}`}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            View
                          </Link>
                          <Link 
                            to={`/invoices/edit/${invoice._id}`}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            Edit
                          </Link>
                          <button 
                            onClick={() => handleDelete(invoice._id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
