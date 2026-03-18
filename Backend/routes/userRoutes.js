const express = require('express');
const router = express.Router();
const {
  getUserSettings,
  updateUserSettings,
  uploadLogo,
  uploadSignature,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/settings')
  .get(protect, getUserSettings)
  .put(protect, updateUserSettings);

router.post('/upload-logo', protect, upload.single('logo'), uploadLogo);
router.post('/upload-signature', protect, upload.single('signature'), uploadSignature);

module.exports = router;
