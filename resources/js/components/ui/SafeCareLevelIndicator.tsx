import React from 'react';
interface SafeCareLevelIndicatorProps {
  level: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}
export const SafeCareLevelIndicator: React.FC<SafeCareLevelIndicatorProps> = ({
  level,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const maxLevel = 5;
  const sizeClasses = {
    sm: {
      container: 'gap-0.5',
      segment: 'w-3 h-4',
      text: 'text-xs'
    },
    md: {
      container: 'gap-1',
      segment: 'w-4 h-6',
      text: 'text-sm'
    },
    lg: {
      container: 'gap-1.5',
      segment: 'w-6 h-8',
      text: 'text-base font-medium'
    }
  };
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex items-end ${sizeClasses[size].container}`}>
        {[...Array(maxLevel)].map((_, index) => {
          const isAchieved = index < level;
          // Step-wise height
          const heightMultiplier = (index + 1) / maxLevel;
          return (
            <div
              key={index}
              className={`${sizeClasses[size].segment} rounded-t-sm transition-all duration-300 ${isAchieved ? 'bg-afya-deep' : 'bg-afya-light border border-afya-outline'}`}
              style={{
                height: `calc(${sizeClasses[size].segment.split(' ')[1].replace('h-', '')} * 0.25rem * ${0.5 + heightMultiplier * 0.5})`
              }}
              title={`Level ${index + 1}`} />);


        })}
      </div>
      {showLabel &&
      <span
        className={`text-afya-text whitespace-nowrap ${sizeClasses[size].text}`}>
        
          SafeCare Level {level}
        </span>
      }
    </div>);

};