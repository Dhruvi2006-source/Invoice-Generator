import { useState, useEffect, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';

const Dashboard = () => {
  const { logout, token } = useContext(AuthContext);
  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Settings State
  const [activeTab, setActiveTab] = useState('invoices');
  const [settings, setSettings] = useState({ logoUrl: '', signatureUrl: '', defaultGstRate: 0 });
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingSignature, setUploadingSignature] = useState(false);

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

  const fetchSettings = async () => {
    try {
      const { data } = await api.get('/users/settings');
      setSettings(data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInvoices();
      fetchSettings();
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

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

  // Settings Handlers
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      await api.put('/users/settings', { defaultGstRate: settings.defaultGstRate || 0 });
      alert('Settings saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('logo', file);
    setUploadingLogo(true);
    try {
      const { data } = await api.post('/users/upload-logo', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSettings((prev) => ({ ...prev, logoUrl: data.logoUrl }));
    } catch (err) {
      console.error(err);
      alert('Failed to upload logo');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSignatureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('signature', file);
    setUploadingSignature(true);
    try {
      const { data } = await api.post('/users/upload-signature', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSettings((prev) => ({ ...prev, signatureUrl: data.signatureUrl }));
    } catch (err) {
      console.error(err);
      alert('Failed to upload signature');
    } finally {
      setUploadingSignature(false);
    }
  };

  const filteredInvoices = invoices.filter((inv) =>
    inv.clientName.toLowerCase().includes(search.toLowerCase()) ||
    inv.invoiceNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-bold text-xl">
                P
              </div>
              <Link to="/" className="text-xl font-bold text-green-800 tracking-tight">
                Paymint Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('invoices')}
                className={`text-sm font-medium ${activeTab === 'invoices' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-500'}`}
              >
                Invoices
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`text-sm font-medium ${activeTab === 'settings' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-500'}`}
              >
                Settings
              </button>
              <button
                onClick={logout}
                className="ml-4 px-4 py-2 border border-green-200 shadow-sm text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {activeTab === 'invoices' && (
          <>
            <div className="flex flex-col sm:flex-row justify-between flex-wrap gap-4 mb-8">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Invoices</h2>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <input
                  type="text"
                  placeholder="Search by client or #"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <Link
                  to="/invoices/create"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none whitespace-nowrap"
                >
                  + Create Invoice
                </Link>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr><td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">Loading invoices...</td></tr>
                    ) : filteredInvoices.length === 0 ? (
                      <tr><td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500">{search ? "No invoices found matching your search." : "No invoices found. Create one to get started!"}</td></tr>
                    ) : (
                      filteredInvoices.map((invoice) => (
                        <tr key={invoice._id} className="hover:bg-green-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-l-4 border-transparent hover:border-green-500">{invoice.invoiceNumber}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.clientName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">${invoice.total.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-4 items-center">
                              <Link to={`/invoices/${invoice._id}`} className="text-green-600 hover:text-green-800 transition-colors">View</Link>
                              <Link to={`/invoices/edit/${invoice._id}`} className="text-emerald-600 hover:text-emerald-800 transition-colors">Edit</Link>
                              <button onClick={() => handleDelete(invoice._id)} className="text-red-600 hover:text-red-900 transition-colors">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Profile & Settings</h2>
            
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Default GST Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.defaultGstRate}
                  onChange={(e) => setSettings({ ...settings, defaultGstRate: e.target.value })}
                  className="mt-1 block w-1/3 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={settingsLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:opacity-50"
              >
                {settingsLoading ? 'Saving...' : 'Save General Settings'}
              </button>
            </form>

            <div className="mt-8 border-t pt-8 space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Shop Logo</h3>
                <p className="text-sm text-gray-500 mb-4">Upload a logo to appear on the top of your invoices.</p>
                {settings.logoUrl && (
                  <div className="mb-4">
                    <img src={settings.logoUrl} alt="Logo" className="h-16 object-contain" />
                  </div>
                )}
                <div className="flex items-center">
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logoUpload" />
                  <label htmlFor="logoUpload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    {uploadingLogo ? 'Uploading...' : 'Choose Logo'}
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">Digital Signature</h3>
                <p className="text-sm text-gray-500 mb-4">Upload a signature to appear at the bottom of your invoices.</p>
                {settings.signatureUrl && (
                  <div className="mb-4">
                    <img src={settings.signatureUrl} alt="Signature" className="h-16 object-contain" />
                  </div>
                )}
                <div className="flex items-center">
                  <input type="file" accept="image/*" onChange={handleSignatureUpload} className="hidden" id="signatureUpload" />
                  <label htmlFor="signatureUpload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    {uploadingSignature ? 'Uploading...' : 'Choose Signature'}
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
