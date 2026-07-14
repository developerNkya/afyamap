import React from 'react';
import { Star, StarHalf } from 'lucide-react';
interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  className = ''
}) => {
  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24
  };
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            size={iconSizes[size]}
            className="fill-afya-deep text-afya-deep" />

        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={iconSizes[size]} className="text-afya-outline" />
            <div className="absolute inset-0 overflow-hidden w-[50%]">
              <Star
                size={iconSizes[size]}
                className="fill-afya-deep text-afya-deep" />
              
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            size={iconSizes[size]}
            className="text-afya-outline fill-afya-light" />

        );
      }
    }
    return stars;
  };
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">{renderStars()}</div>
      <div
        className={`flex items-center gap-1 font-medium text-afya-text ${textSizes[size]}`}>
        
        <span>{rating.toFixed(1)}</span>
        {reviewCount !== undefined &&
        <span className="text-gray-500 font-normal">({reviewCount})</span>
        }
      </div>
    </div>);

};