import FooterSettings from '../models/FooterSettings.js';

// Ensures a single settings document always exists (singleton pattern)
const getOrCreateSettings = async () => {
  let settings = await FooterSettings.findOne();
  if (!settings) {
    settings = await FooterSettings.create({});
  }
  return settings;
};

// GET /api/footer  (public)
export const getPublicFooter = async (req, res) => {
  const settings = await getOrCreateSettings();
  res.json({ description: settings.description });
};

// GET /api/admin/footer  (admin)
export const getAdminFooter = async (req, res) => {
  const settings = await getOrCreateSettings();
  res.json(settings);
};

// PUT /api/admin/footer  (admin)
export const updateFooter = async (req, res) => {
  const { description } = req.body;

  if (description === undefined || !description.trim()) {
    return res.status(400).json({ message: 'description is required' });
  }

  const settings = await getOrCreateSettings();
  settings.description = description;
  const updated = await settings.save();

  res.json(updated);
};