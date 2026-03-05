import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const InvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    companyName: '',
    clientName: '',
    clientEmail: '',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    taxRate: 0,
  });

  const [items, setItems] = useState([
    { name: '', quantity: 1, price: 0 }
  ]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchInvoice = async () => {
        try {
          const { data } = await api.get(`/invoices/${id}`);
          
          setFormData({
            companyName: data.companyName,
            clientName: data.clientName,
            clientEmail: data.clientEmail || '',
            invoiceNumber: data.invoiceNumber,
            date: data.date ? data.date.split('T')[0] : new Date().toISOString().split('T')[0],
            notes: data.notes || '',
            taxRate: data.subtotal > 0 ? (data.tax / data.subtotal) * 100 : 0,
          });
          setItems(data.items);
        } catch (err) {
          console.error('Error fetching invoice for edit:', err);
          setError('Failed to load invoice details for editing.');
        } finally {
          setFetching(false);
        }
      };
      
      fetchInvoice();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = name === 'quantity' || name === 'price' ? parseFloat(value) || 0 : value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) return; // keep at least one
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const tax = (subtotal * formData.taxRate) / 100;
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.clientName || !formData.invoiceNumber) {
      setError('Please fill in all required fields (Company, Client, Invoice Number).');
      return;
    }
    if (items.some((item) => !item.name)) {
      setError('All items must have a name.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const invoiceData = {
        companyName: formData.companyName,
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        invoiceNumber: formData.invoiceNumber,
        date: formData.date,
        items,
        subtotal,
        tax,
        total,
        notes: formData.notes
      };

      if (id) {
        await api.put(`/invoices/${id}`, invoiceData);
      } else {
        await api.post('/invoices', invoiceData);
      }
      navigate('/');
    } catch (err) {
      console.error('Error creating invoice:', err);
      setError(err.response?.data?.message || 'Failed to create invoice.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-gray-500 text-xl font-medium">Loading Invoice Data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">{id ? 'Edit Invoice' : 'Create New Invoice'}</h2>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Sender & Client Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. Acme Corp"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name *</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g. John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Email</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700">Invoice Number *</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="INV-001"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Items */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Items</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
                >
                  + Add Item
                </button>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50 p-4 rounded-md border border-gray-200">
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Item Name"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div className="w-full sm:w-24">
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Qty"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="w-full sm:w-32">
                      <input
                        type="number"
                        name="price"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, e)}
                        placeholder="Price"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="w-full sm:w-24 text-right font-medium text-gray-700">
                      ${(item.quantity * item.price).toFixed(2)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      className="p-2 text-red-500 shrink-0 hover:bg-red-50 rounded-md disabled:opacity-50"
                      title="Remove Item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations & Notes */}
            <div className="pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Payment terms, bank details, or a simple thank you."
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Tax Rate (%):</span>
                  <input
                    type="number"
                    name="taxRate"
                    min="0"
                    max="100"
                    value={formData.taxRate}
                    onChange={handleChange}
                    className="w-20 border border-gray-300 rounded-md shadow-sm py-1 px-2 text-right focus:outline-none focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600">Tax Amount:</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-4 text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : id ? 'Update Invoice' : 'Save Invoice'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
