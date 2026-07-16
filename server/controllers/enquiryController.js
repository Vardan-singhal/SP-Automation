import Enquiry from '../models/Enquiry.js';

// POST /api/enquiries  (public — from Contact form or Get a Quote modal)
export const createEnquiry = async (req, res) => {
  const { name, email, phone, subject, message, company, product, source } = req.body;

  if (!name || !email || !source) {
    return res.status(400).json({ message: 'name, email and source are required' });
  }

  const enquiry = await Enquiry.create({
    name, email, phone, subject, message, company, product, source,
  });

  res.status(201).json(enquiry);
};

// GET /api/admin/enquiries?source=&status=  (admin)
export const getAllEnquiries = async (req, res) => {
  const { source, status } = req.query;
  const filter = {};
  if (source) filter.source = source;
  if (status) filter.status = status;

  const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
  res.json(enquiries);
};

// PUT /api/admin/enquiries/:id  (admin — update status)
export const updateEnquiryStatus = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

  const { status } = req.body;
  if (status) enquiry.status = status;

  const updated = await enquiry.save();
  res.json(updated);
};

// DELETE /api/admin/enquiries/:id  (admin)
export const deleteEnquiry = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);
  if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
  await enquiry.deleteOne();
  res.json({ message: 'Enquiry deleted' });
};