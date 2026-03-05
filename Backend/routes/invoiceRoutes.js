const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoiceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createInvoice).get(protect, getInvoices);
router.route('/:id').get(protect, getInvoiceById).put(protect, updateInvoice).delete(protect, deleteInvoice);

module.exports = router;
