import Product from '../models/Product.js';
import Category from '../models/Category.js';
import TeamMember from '../models/TeamMember.js';
import Testimonial from '../models/Testimonial.js';
import Enquiry from '../models/Enquiry.js';
import Blog from '../models/Blog.js';

export const getDashboard = async (req, res) => {
  try {
    const [
      products,
      categories,
      team,
      testimonials,
      enquiries,
      recentEnquiries,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      TeamMember.countDocuments(),
      Testimonial.countDocuments(),
      Enquiry.countDocuments(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.status(200).json({
      products,
      categories,
      blogs: 0,        // placeholder until Blog module exists
      team,
      testimonials,
      enquiries,
      recentBlogs: [],  // placeholder until Blog module exists
      recentEnquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};