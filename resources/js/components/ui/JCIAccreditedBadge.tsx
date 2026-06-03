import React from 'react';
import { ShieldCheck } from 'lucide-react';
interface JCIAccreditedBadgeProps {
  className?: string;
  size?: 'sm' | 'md';
}
export const JCIAccreditedBadge: React.FC<JCIAccreditedBadgeProps> = ({
  className = '',
  size = 'sm'
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5'
  };
  const iconSizes = {
    sm: 12,
    md: 16
  };
  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-afya-deep text-white rounded-full font-medium ${sizeClasses[size]} ${className}`}>
      
      <ShieldCheck size={iconSizes[size]} className="text-yellow-400" />
      <span>JCI Accredited</span>
    </div>);

};