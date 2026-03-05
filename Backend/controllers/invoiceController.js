const Invoice = require('../models/Invoice');

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      companyName,
      clientName,
      clientEmail,
      date,
      items,
      subtotal,
      tax,
      total,
      notes,
    } = req.body;

    const invoice = new Invoice({
      userId: req.user.id,
      invoiceNumber,
      companyName,
      clientName,
      clientEmail,
      date,
      items,
      subtotal,
      tax,
      total,
      notes,
    });

    const createdInvoice = await invoice.save();
    res.status(201).json(createdInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating invoice' });
  }
};

// @desc    Get all invoices for logged in user
// @route   GET /api/invoices
// @access  Private
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching invoices' });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
// @access  Private
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if the user trying to access the invoice is the owner
    if (invoice.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to view this invoice' });
    }

    res.json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching invoice' });
  }
};

// @desc    Delete an invoice
// @route   DELETE /api/invoices/:id
// @access  Private
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if the user trying to delete the invoice is the owner
    if (invoice.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this invoice' });
    }

    await invoice.deleteOne();
    res.json({ message: 'Invoice removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting invoice' });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  deleteInvoice,
};
