
import React from 'react';
import { Camera } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 flex items-center justify-between bg-card/60 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-primary/20 p-2 rounded-full">
          <Camera className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-lg font-semibold">
          <span className="sexy-gradient">Dubai</span>
          <span className="text-white">Muse</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs text-dubai-gold font-medium">Discover your model potential</div>
      </div>
    </header>
  );
};

export default Header;
