import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Building2, Eye, EyeOff, Lock, Mail, MessageSquare, Star, User as UserIcon, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

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

const SimpleStarRating: React.FC<{ rating: number; size?: 'sm' | 'md' | 'lg' }> = ({ rating, size = 'md' }) => {
    const starSizes = { sm: 14, md: 18, lg: 24 };
    const starSize = starSizes[size];

    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={starSize} className={star <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
            ))}
        </div>
    );
};

export const FacilityReviews: React.FC<FacilityReviewsProps> = ({ facility, comments = [], ratingDistribution = {}, auth }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Ref for the review form
    const reviewFormRef = useRef<HTMLDivElement>(null);
    // Ref for the section header
    const sectionHeaderRef = useRef<HTMLDivElement>(null);

    // Close auth modal when user logs in successfully
    useEffect(() => {
        if (auth?.user) {
            setIsAuthModalOpen(false);
            setIsReviewFormOpen(true);
            setTimeout(() => {
                scrollToReviewsSection();
            }, 400);
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

    // Scroll to the reviews section - targets the section header
    const scrollToReviewsSection = () => {
        if (sectionHeaderRef.current) {
            const elementPosition = sectionHeaderRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - 140;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginForm.post('/login', {
            preserveScroll: true,
            onSuccess: () => {
                loginForm.reset();
            },
        });
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerForm.post('/register', {
            preserveScroll: true,
            onSuccess: () => {
                registerForm.reset();
            },
        });
    };

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        reviewForm.post(`/facility/${facility.facility_id ?? facility.id}/review`, {
            preserveScroll: true,
            onSuccess: () => {
                reviewForm.reset();
                setIsReviewFormOpen(false);
                setIsSubmitting(false);
            },
            onError: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleWriteReviewClick = () => {
        if (!auth?.user) {
            setIsAuthModalOpen(true);
        } else {
            const newState = !isReviewFormOpen;
            setIsReviewFormOpen(newState);
            if (newState) {
                setTimeout(() => {
                    scrollToReviewsSection();
                }, 200);
            }
        }
    };

    // Handle "Write First Review" from empty state
    const handleWriteFirstReview = () => {
        if (!auth?.user) {
            setIsAuthModalOpen(true);
        } else {
            setIsReviewFormOpen(true);
            setTimeout(() => {
                scrollToReviewsSection();
            }, 200);
        }
    };

    return (
        <section id="section-reviews" className="scroll-mt-32 pt-4">
            {/* Section Header - with ref for scrolling to the beginning */}
            <div ref={sectionHeaderRef}>
                <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Patient Reviews</h2>
                        <p className="mt-0.5 text-sm text-gray-500">What people are saying about this facility</p>
                    </div>
                    <button
                        onClick={handleWriteReviewClick}
                        className={`bg-afya-deep hover:bg-opacity-90 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md active:scale-95 ${
                            isReviewFormOpen ? 'bg-gray-600 hover:bg-gray-700' : ''
                        }`}
                    >
                        {isReviewFormOpen ? (
                            <>
                                <X size={16} />
                                Cancel Review
                            </>
                        ) : (
                            <>
                                <MessageSquare size={16} />
                                Write a Review
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Review Form */}
            <AnimatePresence>
                {isReviewFormOpen && auth?.user && (
                    <motion.div
                        ref={reviewFormRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-8 overflow-hidden"
                    >
                        <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                                <div className="bg-afya-light text-afya-deep flex h-10 w-10 items-center justify-center rounded-full font-bold">
                                    {auth.user.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{auth.user.name}</p>
                                    <p className="text-xs text-gray-500">Writing a review</p>
                                </div>
                            </div>

                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Rating</label>
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
                                                    size={32}
                                                    className={
                                                        star <= (hoveredStar ?? reviewForm.data.rating)
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                    }
                                                />
                                            </button>
                                        ))}
                                        <span className="ml-2 text-sm font-medium text-gray-500">{reviewForm.data.rating} / 5</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                        Your Comment <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={reviewForm.data.comment}
                                        onChange={(e) => reviewForm.setData('comment', e.target.value)}
                                        placeholder="Share your experience at this facility..."
                                        className="focus:border-afya-deep focus:ring-afya-deep/20 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 transition-all placeholder:text-gray-400 focus:ring-2"
                                    />
                                </div>

                                {reviewForm.errors.comment && (
                                    <div className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">
                                        <AlertCircle size={14} />
                                        {reviewForm.errors.comment}
                                    </div>
                                )}

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || reviewForm.processing}
                                        className="bg-afya-deep hover:bg-opacity-95 flex items-center gap-2 rounded-xl px-6 py-2.5 font-bold text-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        {isSubmitting || reviewForm.processing ? (
                                            <>
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <MessageSquare size={16} />
                                                Post Review
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsReviewFormOpen(false)}
                                        className="rounded-xl border border-gray-300 px-6 py-2.5 font-medium text-gray-600 transition-all hover:bg-gray-50 active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Aggregate Rating Info */}
            <div className="mb-8 flex flex-col items-center gap-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:flex-row">
                <div className="border-gray-200 text-center md:border-r md:pr-8">
                    <div className="mb-2 text-5xl font-bold text-gray-800">{(facility.rating ?? 0).toFixed(1)}</div>
                    <SimpleStarRating rating={facility.rating ?? 0} size="lg" />
                    <div className="mt-2 flex items-center justify-center gap-1 text-sm text-gray-500">
                        <MessageSquare size={14} />
                        Based on {facility.reviewCount ?? 0} reviews
                    </div>
                </div>
                <div className="w-full flex-grow">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const percent = ratingDistribution[star] ?? 0;
                        return (
                            <div key={star} className="mb-2 flex items-center gap-3 last:mb-0">
                                <div className="flex w-12 items-center gap-1 text-sm font-medium text-gray-600">
                                    {star} <Star size={12} className="fill-gray-400 text-gray-400" />
                                </div>
                                <div className="h-2 flex-grow overflow-hidden rounded-full bg-gray-100">
                                    <div
                                        className="from-afya-deep to-afya-mid h-full rounded-full bg-gradient-to-r transition-all duration-500"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                                <div className="w-12 text-right text-xs text-gray-500">{percent}%</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Reviews Comments List */}
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="mb-3 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    {comment.user_image ? (
                                        <img
                                            src={comment.user_image}
                                            alt={comment.name}
                                            className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                                        />
                                    ) : (
                                        <div className="bg-afya-light text-afya-deep border-afya-mid/10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold">
                                            {comment.initials || comment.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-sm font-semibold text-gray-800">{comment.name}</div>
                                        <div className="text-xs text-gray-400">{comment.date}</div>
                                    </div>
                                </div>
                                {comment.rating !== null && <SimpleStarRating rating={comment.rating} size="sm" />}
                            </div>
                            <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700">{comment.text}</p>
                        </motion.div>
                    ))
                ) : (
                    <div className="rounded-xl border border-gray-100 bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
                            <MessageSquare size={24} className="text-gray-400" />
                        </div>
                        <h3 className="mb-1 text-lg font-bold text-gray-900">No reviews yet</h3>
                        <p className="mx-auto mb-6 max-w-sm text-sm text-gray-500">
                            Have you visited this facility? Share your experience with the community.
                        </p>
                        <button
                            onClick={handleWriteFirstReview}
                            className="bg-afya-light text-afya-deep hover:bg-afya-deep rounded-xl px-5 py-2 text-sm font-semibold shadow-sm transition-all hover:text-white"
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
                            className="relative z-10 w-full max-w-md overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl"
                        >
                            {/* Header */}
                            <div className="from-afya-deep to-afya-mid/90 relative bg-gradient-to-br px-6 py-6 text-white">
                                <button
                                    onClick={() => setIsAuthModalOpen(false)}
                                    className="absolute top-3 right-3 rounded-full bg-white/10 p-1.5 text-white/80 transition-all hover:bg-white/20 hover:text-white"
                                >
                                    <X size={18} />
                                </button>

                                <div className="mb-2 flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                        <Building2 size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Welcome to AfyaMap</h3>
                                        <p className="text-sm text-white/80">Sign in to share your experience</p>
                                    </div>
                                </div>

                                {/* Tab Selector */}
                                <div className="mt-3 flex rounded-xl bg-white/10 p-1 backdrop-blur-sm">
                                    <button
                                        onClick={() => setAuthTab('login')}
                                        className={`flex-1 rounded-lg py-2 text-center text-sm font-semibold transition-all ${
                                            authTab === 'login' ? 'text-afya-deep bg-white shadow-md' : 'text-white/90 hover:bg-white/5'
                                        }`}
                                    >
                                        Log In
                                    </button>
                                    <button
                                        onClick={() => setAuthTab('register')}
                                        className={`flex-1 rounded-lg py-2 text-center text-sm font-semibold transition-all ${
                                            authTab === 'register' ? 'text-afya-deep bg-white shadow-md' : 'text-white/90 hover:bg-white/5'
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
                                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                Email Address
                                            </label>
                                            <div className="group relative">
                                                <Mail
                                                    className="group-focus-within:text-afya-deep absolute top-3.5 left-3.5 text-gray-400 transition-colors"
                                                    size={18}
                                                />
                                                <input
                                                    type="email"
                                                    required
                                                    value={loginForm.data.email}
                                                    onChange={(e) => loginForm.setData('email', e.target.value)}
                                                    placeholder="name@example.com"
                                                    className="focus:border-afya-deep focus:ring-afya-deep/20 w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-11 text-gray-800 transition-all placeholder:text-gray-400 focus:ring-2"
                                                />
                                            </div>
                                            {loginForm.errors.email && (
                                                <div className="mt-1 flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-500">
                                                    <AlertCircle size={12} />
                                                    {loginForm.errors.email}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                Password
                                            </label>
                                            <div className="group relative">
                                                <Lock
                                                    className="group-focus-within:text-afya-deep absolute top-3.5 left-3.5 text-gray-400 transition-colors"
                                                    size={18}
                                                />
                                                <input
                                                    type={showLoginPassword ? 'text' : 'password'}
                                                    required
                                                    value={loginForm.data.password}
                                                    onChange={(e) => loginForm.setData('password', e.target.value)}
                                                    placeholder="••••••••"
                                                    className="focus:border-afya-deep focus:ring-afya-deep/20 w-full rounded-xl border border-gray-200 bg-white py-3 pr-12 pl-11 text-gray-800 transition-all placeholder:text-gray-400 focus:ring-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                                    className="absolute top-3.5 right-3.5 text-gray-400 transition-colors hover:text-gray-600"
                                                >
                                                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {loginForm.errors.password && (
                                                <div className="mt-1 flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-500">
                                                    <AlertCircle size={12} />
                                                    {loginForm.errors.password}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    checked={loginForm.data.remember}
                                                    onChange={(e) => loginForm.setData('remember', e.target.checked)}
                                                    className="text-afya-deep focus:ring-afya-deep rounded border-gray-300"
                                                />
                                                Remember me
                                            </label>
                                            <a href="/forgot-password" className="text-afya-deep text-sm font-medium hover:underline">
                                                Forgot password?
                                            </a>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loginForm.processing}
                                            className="from-afya-deep to-afya-mid hover:shadow-afya-deep/20 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r py-3 font-bold text-white transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                                        >
                                            {loginForm.processing ? (
                                                'Logging in...'
                                            ) : (
                                                <>
                                                    Log In
                                                    <ArrowRight size={18} />
                                                </>
                                            )}
                                        </button>

                                        <p className="pt-2 text-center text-sm text-gray-500">
                                            Don't have an account?{' '}
                                            <button
                                                type="button"
                                                onClick={() => setAuthTab('register')}
                                                className="text-afya-deep font-semibold hover:underline"
                                            >
                                                Sign up
                                            </button>
                                        </p>
                                    </form>
                                ) : (
                                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                Full Name
                                            </label>
                                            <div className="group relative">
                                                <UserIcon
                                                    className="group-focus-within:text-afya-deep absolute top-3.5 left-3.5 text-gray-400 transition-colors"
                                                    size={18}
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    value={registerForm.data.name}
                                                    onChange={(e) => registerForm.setData('name', e.target.value)}
                                                    placeholder="John Doe"
                                                    className="focus:border-afya-deep focus:ring-afya-deep/20 w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-11 text-gray-800 transition-all placeholder:text-gray-400 focus:ring-2"
                                                />
                                            </div>
                                            {registerForm.errors.name && (
                                                <div className="mt-1 flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-500">
                                                    <AlertCircle size={12} />
                                                    {registerForm.errors.name}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                Email Address
                                            </label>
                                            <div className="group relative">
                                                <Mail
                                                    className="group-focus-within:text-afya-deep absolute top-3.5 left-3.5 text-gray-400 transition-colors"
                                                    size={18}
                                                />
                                                <input
                                                    type="email"
                                                    required
                                                    value={registerForm.data.email}
                                                    onChange={(e) => registerForm.setData('email', e.target.value)}
                                                    placeholder="name@example.com"
                                                    className="focus:border-afya-deep focus:ring-afya-deep/20 w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-11 text-gray-800 transition-all placeholder:text-gray-400 focus:ring-2"
                                                />
                                            </div>
                                            {registerForm.errors.email && (
                                                <div className="mt-1 flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-500">
                                                    <AlertCircle size={12} />
                                                    {registerForm.errors.email}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                Password <span className="font-normal text-gray-400 lowercase">(min 6 characters)</span>
                                            </label>
                                            <div className="group relative">
                                                <Lock
                                                    className="group-focus-within:text-afya-deep absolute top-3.5 left-3.5 text-gray-400 transition-colors"
                                                    size={18}
                                                />
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    required
                                                    value={registerForm.data.password}
                                                    onChange={(e) => registerForm.setData('password', e.target.value)}
                                                    placeholder="••••••••"
                                                    className="focus:border-afya-deep focus:ring-afya-deep/20 w-full rounded-xl border border-gray-200 bg-white py-3 pr-12 pl-11 text-gray-800 transition-all placeholder:text-gray-400 focus:ring-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute top-3.5 right-3.5 text-gray-400 transition-colors hover:text-gray-600"
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {registerForm.errors.password && (
                                                <div className="mt-1 flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-500">
                                                    <AlertCircle size={12} />
                                                    {registerForm.errors.password}
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                                Confirm Password
                                            </label>
                                            <div className="group relative">
                                                <Lock
                                                    className="group-focus-within:text-afya-deep absolute top-3.5 left-3.5 text-gray-400 transition-colors"
                                                    size={18}
                                                />
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    required
                                                    value={registerForm.data.password_confirmation}
                                                    onChange={(e) => registerForm.setData('password_confirmation', e.target.value)}
                                                    placeholder="••••••••"
                                                    className="focus:border-afya-deep focus:ring-afya-deep/20 w-full rounded-xl border border-gray-200 bg-white py-3 pr-12 pl-11 text-gray-800 transition-all placeholder:text-gray-400 focus:ring-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute top-3.5 right-3.5 text-gray-400 transition-colors hover:text-gray-600"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {registerForm.errors.password_confirmation && (
                                                <div className="mt-1 flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-500">
                                                    <AlertCircle size={12} />
                                                    {registerForm.errors.password_confirmation}
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={registerForm.processing}
                                            className="from-afya-deep to-afya-mid hover:shadow-afya-deep/20 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r py-3 font-bold text-white transition-all hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
                                        >
                                            {registerForm.processing ? (
                                                'Creating Account...'
                                            ) : (
                                                <>
                                                    Create Account
                                                    <ArrowRight size={18} />
                                                </>
                                            )}
                                        </button>

                                        <p className="pt-2 text-center text-sm text-gray-500">
                                            Already have an account?{' '}
                                            <button
                                                type="button"
                                                onClick={() => setAuthTab('login')}
                                                className="text-afya-deep font-semibold hover:underline"
                                            >
                                                Log in
                                            </button>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};
