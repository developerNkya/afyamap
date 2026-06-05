// components/facility/FacilityReviews.tsx (simplified)
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface FacilityReviewsProps {
  facility: any;
}

const mockReviews = [
  {
    id: 1,
    initials: 'JD',
    name: 'John Doe',
    date: '2 weeks ago',
    rating: 5,
    text: 'Excellent facility with very professional staff. The waiting time was minimal and the doctors were very thorough in their explanation.'
  },
  {
    id: 2,
    initials: 'SM',
    name: 'Sarah M.',
    date: '2 weeks ago',
    rating: 4.5,
    text: 'Clean environment and clear signage. The SafeCare rating really shows in their day-to-day operations. Highly recommended.'
  },
  {
    id: 3,
    initials: 'AK',
    name: 'Amina K.',
    date: '2 weeks ago',
    rating: 4,
    text: 'Good service overall, though the pharmacy queue was a bit long. The medical care itself was top notch.'
  }
];

// Simple star rating component
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

export const FacilityReviews: React.FC<FacilityReviewsProps> = ({ facility }) => {
  const getRatingPercentage = (star: number) => {
    const percentages: Record<number, number> = { 5: 60, 4: 25, 3: 10, 2: 3, 1: 2 };
    return percentages[star] || 0;
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
        <button className="bg-afya-deep text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
          Write a Review
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-8 items-center">
        <div className="text-center md:border-r border-gray-200 md:pr-8">
          <div className="text-5xl font-bold text-gray-800 mb-2">{facility.rating.toFixed(1)}</div>
          <SimpleStarRating rating={facility.rating} size="lg" />
          <div className="text-sm text-gray-500 mt-2">Based on {facility.reviewCount} reviews</div>
        </div>
        <div className="flex-grow w-full">
          {[5, 4, 3, 2, 1].map((star) => {
            const percent = getRatingPercentage(star);
            return (
              <div key={star} className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1 w-12 text-sm font-medium text-gray-600">
                  {star} <Star size={12} className="fill-gray-400 text-gray-400" />
                </div>
                <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-afya-deep rounded-full" style={{ width: `${percent}%` }} />
                </div>
                <div className="w-10 text-right text-xs text-gray-500">{percent}%</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-afya-light rounded-full flex items-center justify-center text-afya-deep font-bold">
                  {review.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{review.name}</div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
              </div>
              <SimpleStarRating rating={review.rating} size="sm" />
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
        Load more reviews
      </button>
    </motion.section>
  );
};