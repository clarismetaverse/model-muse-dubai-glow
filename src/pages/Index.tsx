
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import ImageUpload from '@/components/ImageUpload';
import ResultsCard, { ModelRating } from '@/components/ResultsCard';
import FeatureCard from '@/components/FeatureCard';
import DubaiMap from '@/components/DubaiMap';
import { getModelRating } from '@/services/modelRaterApi';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ModelRating | null>(null);
  const { toast } = useToast();

  const handleImageSelect = async (file: File) => {
    try {
      setIsLoading(true);
      setResults(null);
      
      // Get model rating from API
      const rating = await getModelRating(file);
      
      // Set results
      setResults(rating);
      
      toast({
        title: "Analysis Complete",
        description: "We've analyzed your model potential!",
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-card to-black">
      <Header />
      
      <main className="flex-1 container px-4 py-6 flex flex-col">
        <div className="mb-8">
          <ImageUpload 
            onImageSelect={handleImageSelect}
            isLoading={isLoading}
          />
        </div>
        
        {results && (
          <div className="space-y-6 mb-10">
            <ResultsCard rating={results} />
            <FeatureCard features={results.uniqueFeatures} />
            <DubaiMap district={results.dubaiDistrict} />
          </div>
        )}
        
        {!results && !isLoading && (
          <div className="glass-card p-5 text-center mt-8">
            <h2 className="text-lg font-semibold mb-2 sexy-gradient">Welcome to DubaiMuse</h2>
            <p className="text-sm text-muted-foreground">
              Upload your photo to discover your modeling potential and the perfect Dubai district for your lifestyle
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
