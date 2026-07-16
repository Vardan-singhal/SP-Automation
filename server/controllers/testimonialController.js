import Testimonial from '../models/Testimonial.js';

// GET /api/testimonials  (public: only approved + active, sorted)
export const getPublicTestimonials = async (req, res) => {
  const items = await Testimonial.find({ status: 'approved', isActive: true }).sort({ order: 1 });
  res.json(items);
};

// POST /api/testimonials  (public — client submits a review, always goes to "pending")
export const createClientTestimonial = async (req, res) => {
  const { name, designation, quote, rating } = req.body;

  if (!name || !quote) {
    return res.status(400).json({ message: 'name and quote are required' });
  }

  const testimonial = await Testimonial.create({
    name,
    designation,
    quote,
    rating: rating || 5,
    status: 'pending',
    source: 'client',
  });

  res.status(201).json(testimonial);
};

// GET /api/admin/testimonials?status=  (admin: all, filterable, sorted)
export const getAllTestimonials = async (req, res) => {
  const { status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const items = await Testimonial.find(filter).sort({ status: 1, order: 1, createdAt: -1 });
  res.json(items);
};

// POST /api/admin/testimonials  (admin creates directly — auto-approved)
export const createAdminTestimonial = async (req, res) => {
  const { name, designation, quote, rating } = req.body;

  if (!name || !quote) {
    return res.status(400).json({ message: 'name and quote are required' });
  }

  const count = await Testimonial.countDocuments({ status: 'approved' });
  const testimonial = await Testimonial.create({
    name,
    designation,
    quote,
    rating: rating || 5,
    status: 'approved',
    source: 'admin',
    order: count,
  });

  res.status(201).json(testimonial);
};

// PUT /api/admin/testimonials/:id  (admin — edit fields and/or change status)
export const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

  const { name, designation, quote, rating, status, isActive, order } = req.body;

  testimonial.name = name ?? testimonial.name;
  testimonial.designation = designation ?? testimonial.designation;
  testimonial.quote = quote ?? testimonial.quote;
  if (rating !== undefined) testimonial.rating = rating;
  if (isActive !== undefined) testimonial.isActive = isActive;
  if (order !== undefined) testimonial.order = order;

  // If newly approving, give it a display order at the end of the approved list
  if (status && status !== testimonial.status) {
    if (status === 'approved' && testimonial.status !== 'approved') {
      const count = await Testimonial.countDocuments({ status: 'approved' });
      testimonial.order = count;
    }
    testimonial.status = status;
  }

  const updated = await testimonial.save();
  res.json(updated);
};

// DELETE /api/admin/testimonials/:id
export const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
  await testimonial.deleteOne();
  res.json({ message: 'Testimonial deleted' });
};

// PUT /api/admin/testimonials/reorder  (reorders the approved list)
export const reorderTestimonials = async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'items array is required' });
  }

  await Promise.all(
    items.map(({ id, order }) => Testimonial.findByIdAndUpdate(id, { order }))
  );

  const updated = await Testimonial.find({ status: 'approved' }).sort({ order: 1 });
  res.json(updated);
};