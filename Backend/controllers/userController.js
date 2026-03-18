const User = require('../models/User');

const getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      logoUrl: user.logoUrl,
      signatureUrl: user.signatureUrl,
      defaultGstRate: user.defaultGstRate,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (req.body.defaultGstRate !== undefined) {
      user.defaultGstRate = req.body.defaultGstRate;
    }
    if (req.body.logoUrl !== undefined) user.logoUrl = req.body.logoUrl;
    if (req.body.signatureUrl !== undefined) user.signatureUrl = req.body.signatureUrl;

    const updatedUser = await user.save();
    res.json({
      logoUrl: updatedUser.logoUrl,
      signatureUrl: updatedUser.signatureUrl,
      defaultGstRate: updatedUser.defaultGstRate,
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const uploadLogo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    user.logoUrl = req.file.path;
    await user.save();

    res.json({ logoUrl: user.logoUrl });
  } catch (error) {
    console.error('Error uploading logo:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const uploadSignature = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    user.signatureUrl = req.file.path;
    await user.save();

    res.json({ signatureUrl: user.signatureUrl });
  } catch (error) {
    console.error('Error uploading signature:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getUserSettings,
  updateUserSettings,
  uploadLogo,
  uploadSignature,
};
