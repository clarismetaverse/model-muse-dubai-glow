
import React from 'react';
import { Star, MapPin, Award, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModelRating {
  angelicness: number;
  sexyness: number;
  modelType: string;
  uniqueFeatures: string[];
  dubaiDistrict: string;
  comments?: string;
}

interface ResultsCardProps {
  rating: ModelRating | null;
  className?: string;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ rating, className }) => {
  if (!rating) return null;
  
  return (
    <div className={cn("glass-card p-5 animate-slide-up", className)}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1 flex items-center">
          <Award className="w-5 h-5 mr-2 text-dubai-gold" />
          <span>Model Rating Results</span>
        </h2>
        <p className="text-sm text-muted-foreground">Your potential as a fashion model</p>
      </div>
      
      {/* Angelicness Rating */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Angelicness</div>
          <div className="value-circle w-10 h-10 text-sm">{rating.angelicness}</div>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary/80 to-primary animate-pulse-glow"
            style={{ width: `${rating.angelicness}%` }}
          ></div>
        </div>
      </div>
      
      {/* Sexyness Rating */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Sexyness</div>
          <div className="value-circle w-10 h-10 text-sm">{rating.sexyness}</div>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-secondary/80 to-secondary animate-pulse-glow"
            style={{ width: `${rating.sexyness}%` }}
          ></div>
        </div>
      </div>
      
      {/* Model Type */}
      <div className="mb-5">
        <div className="text-sm font-medium mb-2">Model Type</div>
        <div className="flex">
          <div className="bg-card px-3 py-1.5 rounded-full text-sm flex items-center">
            <Star className="w-4 h-4 mr-1.5 text-dubai-gold" />
            {rating.modelType}
          </div>
        </div>
      </div>
      
      {/* Dubai District */}
      <div className="mb-5">
        <div className="text-sm font-medium mb-2">Recommended Dubai District</div>
        <div className="flex">
          <div className="bg-card px-3 py-1.5 rounded-full text-sm flex items-center">
            <MapPin className="w-4 h-4 mr-1.5 text-accent" />
            {rating.dubaiDistrict}
          </div>
        </div>
      </div>
      
      {/* Comments */}
      {rating.comments && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="flex items-start">
            <MessageCircle className="w-4 h-4 mr-2 text-primary mt-1 flex-shrink-0" />
            <div>
              <div className="text-sm font-medium mb-1">Feedback</div>
              <p className="text-sm text-muted-foreground">{rating.comments}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsCard;
