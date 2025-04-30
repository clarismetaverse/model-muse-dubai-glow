
import React from 'react';
import { Diamond, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  features: string[];
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ features, className }) => {
  if (!features || features.length === 0) return null;
  
  return (
    <div className={cn("glass-card p-5 animate-slide-up", className)}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1 flex items-center">
          <Diamond className="w-5 h-5 mr-2 text-secondary" />
          <span>Your Unique Features</span>
        </h2>
        <p className="text-sm text-muted-foreground">What makes you stand out</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-card/80 px-3 py-2.5 rounded-lg flex items-center"
          >
            <div className="mr-2 bg-secondary/20 p-1 rounded-full">
              <Star className="w-3 h-3 text-secondary" />
            </div>
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
