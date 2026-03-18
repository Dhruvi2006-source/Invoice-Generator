const Invoice = require('../models/Invoice');

// @desc    Create new invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = async (req, res) => {
  try {
    const {
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

    const User = require('../models/User');
    const user = await User.findById(req.user.id);

    // Auto-generate invoice number sequentially
    let generatedInvoiceNumber = req.body.invoiceNumber;
    if (!generatedInvoiceNumber) {
      const lastInvoice = await Invoice.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
      if (lastInvoice && lastInvoice.invoiceNumber) {
        // Try to parse invoice number format like 'INV-001'
        const match = lastInvoice.invoiceNumber.match(/^(.*?)(\d+)$/);
        if (match) {
          const prefix = match[1];
          const numberStr = match[2];
          const nextNumber = parseInt(numberStr, 10) + 1;
          const paddedNumber = nextNumber.toString().padStart(numberStr.length, '0');
          generatedInvoiceNumber = `${prefix}${paddedNumber}`;
        } else {
          // Fallback if parsing fails to guess the number
          const count = await Invoice.countDocuments({ userId: req.user.id });
          generatedInvoiceNumber = `INV-${String(count + 1).padStart(3, '0')}`;
        }
      } else {
        generatedInvoiceNumber = 'INV-001';
      }
    }

    const invoice = new Invoice({
      userId: req.user.id,
      invoiceNumber: generatedInvoiceNumber,
      companyName,
      clientName,
      clientEmail,
      date,
      items,
      subtotal,
      tax,
      total,
      notes,
      logoUrl: user?.logoUrl || '',
      signatureUrl: user?.signatureUrl || '',
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

// @desc    Update an invoice
// @route   PUT /api/invoices/:id
// @access  Private
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Check if the user trying to update the invoice is the owner
    if (invoice.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this invoice' });
    }

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

    invoice.invoiceNumber = invoiceNumber || invoice.invoiceNumber;
    invoice.companyName = companyName || invoice.companyName;
    invoice.clientName = clientName || invoice.clientName;
    invoice.clientEmail = clientEmail || invoice.clientEmail;
    invoice.date = date || invoice.date;
    invoice.items = items || invoice.items;
    invoice.subtotal = subtotal || invoice.subtotal;
    invoice.tax = tax || invoice.tax;
    invoice.total = total || invoice.total;
    invoice.notes = notes || invoice.notes;

    const User = require('../models/User');
    const user = await User.findById(req.user.id);
    invoice.logoUrl = user?.logoUrl || invoice.logoUrl;
    invoice.signatureUrl = user?.signatureUrl || invoice.signatureUrl;

    const updatedInvoice = await invoice.save();
    res.json(updatedInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating invoice' });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
