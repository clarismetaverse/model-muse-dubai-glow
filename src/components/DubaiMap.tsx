
import React from 'react';
import { MapPin, Building, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DubaiMapProps {
  district: string | null;
  className?: string;
}

const DubaiMap: React.FC<DubaiMapProps> = ({ district, className }) => {
  if (!district) return null;
  
  const getDistrictInfo = (districtName: string) => {
    const districts = {
      "Downtown Dubai": {
        description: "Glamorous district with high fashion and luxury brands",
        icon: Building
      },
      "Dubai Marina": {
        description: "Waterfront lifestyle with yacht clubs and beach shoots",
        icon: Building
      },
      "Palm Jumeirah": {
        description: "Exclusive island with luxury resorts and private beaches",
        icon: Building
      },
      "JBR": {
        description: "Beachfront with a lively atmosphere and outdoor activities",
        icon: Building
      },
      "DIFC": {
        description: "Financial center with high-end fashion and business venues",
        icon: Landmark
      },
      "Jumeirah": {
        description: "Upscale residential area with beachfront properties",
        icon: Building
      }
    };
    
    // Default district if not in our list
    return districts[districtName as keyof typeof districts] || {
      description: "Exclusive area perfect for your modeling career",
      icon: MapPin
    };
  };
  
  const districtInfo = getDistrictInfo(district);
  const DistrictIcon = districtInfo.icon;
  
  return (
    <div className={cn("glass-card p-5 animate-slide-up", className)}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-dubai-gold" />
          <span>Your Dubai Lifestyle</span>
        </h2>
        <p className="text-sm text-muted-foreground">Where you belong in Dubai</p>
      </div>
      
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dubai-skyline/90"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center w-3/4">
            <div className="bg-black/30 backdrop-blur-md p-4 rounded-xl">
              <DistrictIcon className="w-8 h-8 mx-auto mb-2 text-dubai-gold" />
              <h3 className="text-dubai-gold font-semibold mb-1">{district}</h3>
            </div>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1000"
          alt="Dubai Skyline" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <p className="text-sm">
        {districtInfo.description}
      </p>
    </div>
  );
};

export default DubaiMap;
