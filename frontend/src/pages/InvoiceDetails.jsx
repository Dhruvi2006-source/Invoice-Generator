import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const InvoiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const { data } = await api.get(`/invoices/${id}`);
        setInvoice(data);
      } catch (err) {
        console.error('Error fetching invoice:', err);
        setError('Failed to load invoice details.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-gray-500 text-xl font-medium">Loading Invoice...</div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <div className="text-red-500 text-xl font-medium mb-4">{error || 'Invoice not found'}</div>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto">
        {/* Actions - hidden when printing */}
        <div className="mb-6 flex justify-between items-center print:hidden">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            &larr; Back to Dashboard
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Print Invoice
          </button>
        </div>

        {/* Invoice Paper */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8 sm:p-12 print:shadow-none print:p-0">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">INVOICE</h1>
              <p className="mt-2 text-gray-500">#{invoice.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">{invoice.companyName}</h2>
              <p className="mt-1 text-sm text-gray-500">
                Date: {new Date(invoice.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Bill To */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Billed To</h3>
            <div className="text-gray-900 font-semibold">{invoice.clientName}</div>
            {invoice.clientEmail && (
              <div className="text-gray-600 mt-1">{invoice.clientEmail}</div>
            )}
          </div>

          {/* Table */}
          <div className="mt-10">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-4 text-sm text-gray-900">{item.name}</td>
                    <td className="py-4 text-sm text-gray-900 text-right">{item.quantity}</td>
                    <td className="py-4 text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                    <td className="py-4 text-sm text-gray-900 text-right font-medium">${(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-8 flex justify-end">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Notes</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
