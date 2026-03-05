const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    invoiceNumber: {
      type: String,
      required: [true, 'Please add an invoice number'],
    },
    companyName: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    clientName: {
      type: String,
      required: [true, 'Please add a client name'],
    },
    clientEmail: {
      type: String,
      required: [true, 'Please add a client email'],
    },
    date: {
      type: Date,
      required: [true, 'Please add a date'],
    },
    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Invoice', invoiceSchema);
