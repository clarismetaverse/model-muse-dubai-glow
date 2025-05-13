
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-4 flex items-center justify-between bg-card/60 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full">
          <img 
            src="/lovable-uploads/46105593-7dc9-4d55-a7b5-d4b215daf1a6.png" 
            alt="Modelrater Logo" 
            className="w-6 h-6" 
          />
        </div>
        <h1 className="text-lg font-semibold">
          <span className="text-[#FF385C]">Modelrater</span>
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs text-[#FF385C] font-medium">Discover your model potential</div>
      </div>
    </header>
  );
};

export default Header;
