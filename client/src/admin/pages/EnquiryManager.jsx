import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const STATUS_STYLES = {
  new: 'bg-yellow-100 text-yellow-700',
  read: 'bg-blue-100 text-blue-700',
  responded: 'bg-green-100 text-green-700',
};

const EnquiryManager = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = sourceFilter !== 'all' ? { source: sourceFilter } : {};
      const { data } = await api.get('/admin/enquiries', { params });
      setEnquiries(data);
    } catch (err) {
      setError('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [sourceFilter]);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/admin/enquiries/${id}`, { status });
      setEnquiries((prev) => prev.map((e) => (e._id === id ? data : e)));
    } catch (err) {
      setError('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await api.delete(`/admin/enquiries/${id}`);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError('Delete failed');
    }
  };

  const toggleExpand = (enquiry) => {
    const isOpening = expandedId !== enquiry._id;
    setExpandedId(isOpening ? enquiry._id : null);
    if (isOpening && enquiry.status === 'new') {
      updateStatus(enquiry._id, 'read');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Enquiries</h1>
      <p className="text-gray-500 mb-6">Submissions from the Contact form and Get a Quote requests.</p>

      {error && <p className="bg-red-100 text-red-700 text-sm rounded p-2 mb-4">{error}</p>}

      <div className="flex gap-2 mb-4">
        {['all', 'contact', 'quote'].map((f) => (
          <button
            key={f}
            onClick={() => setSourceFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${
              sourceFilter === f ? 'bg-red-600 text-white' : 'bg-white border text-gray-600'
            }`}
          >
            {f === 'all' ? 'All' : f === 'contact' ? 'Contact Form' : 'Get a Quote'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : enquiries.length === 0 ? (
          <p className="p-6 text-gray-500">No enquiries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">From</th>
                <th className="p-3">Source</th>
                <th className="p-3">Subject / Product</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq) => (
                <React.Fragment key={enq._id}>
                  <tr className="border-t cursor-pointer hover:bg-gray-50" onClick={() => toggleExpand(enq)}>
                    <td className="p-3 whitespace-nowrap text-gray-500">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{enq.name}</div>
                      <div className="text-gray-500 text-xs">{enq.email}</div>
                    </td>
                    <td className="p-3 capitalize">{enq.source === 'contact' ? 'Contact Form' : 'Get a Quote'}</td>
                    <td className="p-3">{enq.subject || enq.product || '—'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[enq.status]}`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-3" onClick={(e) => e.stopPropagation()}>
                      {enq.status !== 'responded' && (
                        <button onClick={() => updateStatus(enq._id, 'responded')} className="text-green-600 hover:underline">
                          Mark Responded
                        </button>
                      )}
                      <button onClick={() => handleDelete(enq._id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                  {expandedId === enq._id && (
                    <tr className="border-t bg-gray-50">
                      <td colSpan={6} className="p-4 text-gray-700">
                        {enq.phone && <p><span className="font-medium">Phone:</span> {enq.phone}</p>}
                        {enq.company && <p><span className="font-medium">Company:</span> {enq.company}</p>}
                        {enq.product && <p><span className="font-medium">Product:</span> {enq.product}</p>}
                        {enq.message && <p className="mt-2 whitespace-pre-line"><span className="font-medium">Message:</span> {enq.message}</p>}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EnquiryManager;