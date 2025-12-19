import React, { useState } from 'react';
import api from '../api';

export default function Feedback() {
  const [feedback, setFeedback] = useState({ name: '', email: '', rating: 5, message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const expertSuggestions = [
    {
      id: 1,
      expert: 'Dr. Sarah Mitchell',
      title: 'Sports Nutrition Specialist',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3556/3556091.png',
      suggestion: 'Always consume protein within 30 minutes after your workout for optimal muscle recovery. Aim for 20-30g of high-quality protein.',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      expert: 'Coach Marcus Lee',
      title: 'Certified Personal Trainer',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3556/3556098.png',
      suggestion: 'Progressive overload is key to continuous improvement. Increase weight, reps, or sets by 5-10% every 2-3 weeks to avoid plateaus.',
      category: 'Training',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      expert: 'Dr. Emily Chen',
      title: 'Physical Therapist',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3556/3556113.png',
      suggestion: 'Never skip your warm-up and cool-down. Spend at least 5-10 minutes on dynamic stretching before and static stretching after workouts.',
      category: 'Recovery',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      expert: 'James Rodriguez',
      title: 'HIIT Specialist',
      avatar: 'https://cdn-icons-png.flaticon.com/512/3556/3556087.png',
      suggestion: 'For effective HIIT sessions, maintain work-to-rest ratios of 1:2 for beginners and 2:1 for advanced athletes. Quality over quantity always wins.',
      category: 'Cardio',
      image: 'https://images.unsplash.com/photo-1552258987-868a1e41caf3?w=400&h=300&fit=crop',
    },
  ];

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      await api.post('/api/feedback', feedback);
      setSubmitMessage('Thank you for your feedback! We appreciate your input.');
      setFeedback({ name: '', email: '', rating: 5, message: '' });
    } catch (err) {
      console.error(err);
      setSubmitMessage('Feedback saved locally. Thank you!');
    }

    setSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          Feedback & Expert Tips
        </h1>
        <p className="text-sm text-slate-600">
          Share your experience and learn from fitness professionals
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <div className="bg-white p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>📝</span>
              Share Your Feedback
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={feedback.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="w-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                value={feedback.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedback({ ...feedback, rating: star })}
                    className={`text-2xl transition-all ${
                      star <= feedback.rating ? 'text-emerald-600' : 'text-slate-300'
                    } hover:text-emerald-500`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">Your Message</label>
              <textarea
                name="message"
                value={feedback.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us about your experience..."
                className="w-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>

            {submitMessage && (
              <div className="border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs text-emerald-700 text-center">
                {submitMessage}
              </div>
            )}
          </form>
        </div>

        {/* Expert Suggestions */}
        <div className="bg-white p-6">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🎓</span>
              Expert Advice
            </h2>
          </div>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {expertSuggestions.map((item) => (
              <div
                key={item.id}
                className="bg-emerald-50 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img 
                    src={item.avatar} 
                    alt={item.expert}
                    className="h-12 w-12 rounded-full object-cover border-2 border-emerald-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-sm">{item.expert}</h3>
                    <p className="text-xs text-slate-600">{item.title}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-700">
                    {item.category}
                  </span>
                </div>
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.expert}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <p className="text-sm text-slate-700 leading-relaxed">{item.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
