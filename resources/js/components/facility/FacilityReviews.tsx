import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Lock, Mail, User as UserIcon, MessageSquare, AlertCircle } from 'lucide-react';
import { useForm } from '@inertiajs/react';

interface Comment {
  id: number;
  text: string;
  created_at: string;
  name: string;
  user_image: string | null;
  rating: number | null;
  initials: string;
  date: string;
}

interface FacilityReviewsProps {
  facility: any;
  comments: Comment[];
  ratingDistribution: Record<number, number>;
  auth: any;
}

const SimpleStarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ 
  rating, 
  size = 'md' 
}) => {
  const starSizes = { sm: 14, md: 18, lg: 24 };
  const starSize = starSizes[size];
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={starSize}
          className={star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
};

export const FacilityReviews: React.FC<FacilityReviewsProps> = ({ 
  facility, 
  comments = [], 
  ratingDistribution = {}, 
  auth 
}) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  // Close auth modal when user logs in successfully
  useEffect(() => {
    if (auth?.user) {
      setIsAuthModalOpen(false);
      setIsReviewFormOpen(true);
    }
  }, [auth?.user]);

  // Login Form
  const loginForm = useForm({
    email: '',
    password: '',
    remember: true,
  });

  // Register Form
  const registerForm = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  // Review Form
  const reviewForm = useForm({
    rating: 5,
    comment: '',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginForm.post('/login', {
      preserveScroll: true,
      onSuccess: () => {
        loginForm.reset();
      }
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerForm.post('/register', {
      preserveScroll: true,
      onSuccess: () => {
        registerForm.reset();
      }
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reviewForm.post(`/facility/${facility.facility_id ?? facility.id}/review`, {
      preserveScroll: true,
      onSuccess: () => {
        reviewForm.reset();
        setIsReviewFormOpen(false);
      }
    });
  };

  const handleWriteReviewClick = () => {
    if (!auth?.user) {
      setIsAuthModalOpen(true);
    } else {
      setIsReviewFormOpen(!isReviewFormOpen);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      id="section-reviews"
      className="scroll-mt-32 pt-4"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Patient Reviews</h2>
        <button 
          onClick={handleWriteReviewClick}
          className="bg-afya-deep text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-opacity-90 hover:shadow-md active:scale-95 transition-all"
        >
          {isReviewFormOpen ? 'Cancel Review' : 'Write a Review'}
        </button>
      </div>

      {/* Review Input Box (Visible when toggled and logged in) */}
      <AnimatePresence>
        {isReviewFormOpen && auth?.user && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <form onSubmit={handleReviewSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-gray-800 text-lg">Submit your review</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => reviewForm.setData('rating', star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                      className="transition-transform active:scale-90"
                    >
                      <Star
                        size={28}
                        className={
                          star <= (hoveredStar ?? reviewForm.data.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    </button>
                  ))}
                  <span className="text-sm font-medium text-gray-500 ml-2">
                    {reviewForm.data.rating} out of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Comment</label>
                <textarea
                  required
                  rows={4}
                  value={reviewForm.data.comment}
                  onChange={(e) => reviewForm.setData('comment', e.target.value)}
                  placeholder="Share your experience at this facility (cleanliness, service speed, staff helpfulness...)"
                  className="w-full rounded-xl border-gray-200 focus:border-afya-deep focus:ring-afya-deep transition-all placeholder:text-gray-400"
                />
              </div>

              {reviewForm.errors.comment && (
                <div className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle size={14} />
                  {reviewForm.errors.comment}
                </div>
              )}

              <button
                type="submit"
                disabled={reviewForm.processing}
                className="bg-afya-deep text-white px-6 py-2.5 rounded-xl font-bold hover:bg-opacity-95 active:scale-95 disabled:opacity-50 transition-all shadow-sm"
              >
                {reviewForm.processing ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aggregate Rating Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="text-center md:border-r border-gray-200 md:pr-8">
          <div className="text-5xl font-bold text-gray-800 mb-2">{(facility.rating ?? 0).toFixed(1)}</div>
          <SimpleStarRating rating={facility.rating ?? 0} size="lg" />
          <div className="text-sm text-gray-500 mt-2">Based on {facility.reviewCount ?? 0} reviews</div>
        </div>
        <div className="flex-grow w-full">
          {[5, 4, 3, 2, 1].map((star) => {
            const percent = ratingDistribution[star] ?? 0;
            return (
              <div key={star} className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1 w-12 text-sm font-medium text-gray-600">
                  {star} <Star size={12} className="fill-gray-400 text-gray-400" />
                </div>
                <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-afya-deep rounded-full transition-all duration-500" 
                    style={{ width: `${percent}%` }} 
                  />
                </div>
                <div className="w-10 text-right text-xs text-gray-500">{percent}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {comment.user_image ? (
                    <img 
                      src={comment.user_image} 
                      alt={comment.name} 
                      className="w-10 h-10 rounded-full object-cover border border-gray-100"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-afya-light rounded-full flex items-center justify-center text-afya-deep font-bold border border-afya-mid/10">
                      {comment.initials}
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-gray-900">{comment.name}</div>
                    <div className="text-xs text-gray-500">{comment.date}</div>
                  </div>
                </div>
                {comment.rating !== null && (
                  <SimpleStarRating rating={comment.rating} size="sm" />
                )}
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{comment.text}</p>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <MessageSquare size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No reviews yet</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
              Have you visited this facility? Share your experience with the community.
            </p>
            <button
              onClick={handleWriteReviewClick}
              className="bg-afya-light text-afya-deep px-5 py-2 rounded-xl text-sm font-semibold hover:bg-afya-deep hover:text-white transition-all shadow-sm"
            >
              Write First Review
            </button>
          </div>
        )}
      </div>

      {/* LOGIN / SIGN UP MODAL */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden z-10 relative"
            >
              {/* Header / Tabs */}
              <div className="bg-gradient-to-tr from-afya-deep to-afya-mid/90 p-6 text-white relative">
                <button 
                  onClick={() => setIsAuthModalOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-all rounded-full p-1.5"
                >
                  <X size={18} />
                </button>
                
                <h3 className="text-2xl font-bold mb-1">Join AfyaMap</h3>
                <p className="text-white/80 text-sm mb-6">Please log in or register to submit reviews.</p>

                {/* Double Tabs Selector */}
                <div className="flex bg-white/10 backdrop-blur p-1 rounded-xl">
                  <button
                    onClick={() => setAuthTab('login')}
                    className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-all ${
                      authTab === 'login' ? 'bg-white text-afya-deep shadow-sm' : 'text-white/95 hover:bg-white/5'
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setAuthTab('register')}
                    className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-all ${
                      authTab === 'register' ? 'bg-white text-afya-deep shadow-sm' : 'text-white/95 hover:bg-white/5'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {authTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="email"
                          required
                          value={loginForm.data.email}
                          onChange={(e) => loginForm.setData('email', e.target.value)}
                          placeholder="name@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 focus:border-afya-deep focus:ring-afya-deep transition-all placeholder:text-gray-400"
                        />
                      </div>
                      {loginForm.errors.email && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {loginForm.errors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="password"
                          required
                          value={loginForm.data.password}
                          onChange={(e) => loginForm.setData('password', e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 focus:border-afya-deep focus:ring-afya-deep transition-all placeholder:text-gray-400"
                        />
                      </div>
                      {loginForm.errors.password && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {loginForm.errors.password}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loginForm.processing}
                      className="w-full bg-afya-deep text-white py-3 rounded-xl font-bold hover:bg-opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 shadow-md shadow-afya-deep/20 mt-2"
                    >
                      {loginForm.processing ? 'Logging in...' : 'Log In'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="text"
                          required
                          value={registerForm.data.name}
                          onChange={(e) => registerForm.setData('name', e.target.value)}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 focus:border-afya-deep focus:ring-afya-deep transition-all placeholder:text-gray-400"
                        />
                      </div>
                      {registerForm.errors.name && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {registerForm.errors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="email"
                          required
                          value={registerForm.data.email}
                          onChange={(e) => registerForm.setData('email', e.target.value)}
                          placeholder="name@example.com"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 focus:border-afya-deep focus:ring-afya-deep transition-all placeholder:text-gray-400"
                        />
                      </div>
                      {registerForm.errors.email && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {registerForm.errors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="password"
                          required
                          value={registerForm.data.password}
                          onChange={(e) => registerForm.setData('password', e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 focus:border-afya-deep focus:ring-afya-deep transition-all placeholder:text-gray-400"
                        />
                      </div>
                      {registerForm.errors.password && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {registerForm.errors.password}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                        <input
                          type="password"
                          required
                          value={registerForm.data.password_confirmation}
                          onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-11 pr-4 py-3 rounded-xl border-gray-200 focus:border-afya-deep focus:ring-afya-deep transition-all placeholder:text-gray-400"
                        />
                      </div>
                      {registerForm.errors.password_confirmation && (
                        <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} />
                          {registerForm.errors.password_confirmation}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={registerForm.processing}
                      className="w-full bg-afya-deep text-white py-3 rounded-xl font-bold hover:bg-opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 shadow-md shadow-afya-deep/20 mt-2"
                    >
                      {registerForm.processing ? 'Creating Account...' : 'Sign Up'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};