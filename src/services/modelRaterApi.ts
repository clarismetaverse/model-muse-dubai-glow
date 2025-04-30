
import { ModelRating } from '@/components/ResultsCard';

// Convert blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Upload image and get model rating
export const getModelRating = async (imageFile: File): Promise<ModelRating> => {
  try {
    // Convert image file to base64 string
    const base64Image = await blobToBase64(imageFile);
    
    // Call the API
    const response = await fetch('https://xbut-eryu-hhsg.f2.xano.io/api:TAf2tJRT/ModelRater', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        image: base64Image
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // For demo purposes, return mock data
    // In a real app, you would parse and return the actual API response
    return {
      angelicness: Math.floor(Math.random() * 100),
      sexyness: Math.floor(Math.random() * 100),
      modelType: ["Commercial", "Editorial", "Runway", "Fitness", "Lingerie", "High Fashion"][Math.floor(Math.random() * 6)],
      uniqueFeatures: [
        "Alien Look",
        "Baby Face",
        "High Cheekbones",
        "Cat Eyes",
        "Full Lips",
        "Defined Jawline"
      ].sort(() => 0.5 - Math.random()).slice(0, 4),
      dubaiDistrict: ["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "JBR", "DIFC", "Jumeirah"][Math.floor(Math.random() * 6)]
    };
  } catch (error) {
    console.error('Error getting model rating:', error);
    throw error;
  }
};
