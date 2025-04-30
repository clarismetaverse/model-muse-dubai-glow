
import React, { useState, useRef } from 'react';
import { Camera, UploadCloud, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isLoading: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isLoading }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div 
        className={cn(
          "relative w-full aspect-[3/4] max-w-xs mx-auto glass-card overflow-hidden",
          "flex items-center justify-center mb-4",
          !preview && "border-dashed",
          isLoading && "opacity-70"
        )}
      >
        {preview ? (
          <>
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full"
              disabled={isLoading}
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </>
        ) : (
          <div className="text-center p-6">
            <UploadCloud className="w-12 h-12 text-primary/60 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              Upload a portrait photo to get evaluated
            </p>
            <p className="text-xs text-muted-foreground/70 mt-2">
              High-quality front-facing photo recommended
            </p>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isLoading}
      />
      
      <div className="flex gap-3 w-full max-w-xs mx-auto">
        <Button 
          onClick={handleCameraClick} 
          className="flex-1 bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          <Camera className="w-4 h-4 mr-2" />
          {preview ? "Change Photo" : "Upload Photo"}
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
