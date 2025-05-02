
import { ModelRating } from '@/components/ResultsCard';

// Function to get model rating with API integration
export const getModelRating = async (imageFile: File): Promise<ModelRating> => {
  try {
    console.log('Processing image analysis...');
    
    // Try to upload to freeimage.host with the provided API key
    const apiKey = '6d207e02198a847aa98d0a2a901485a5';
    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', imageFile);
    
    console.log('Attempting to upload image to freeimage.host...');
    
    try {
      const response = await fetch('https://freeimage.host/api/1/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Image upload failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Image uploaded successfully:', data);
      
      // Use the image URL from the response for further processing if needed
      const imageUrl = data.image?.url;
      console.log('Image URL:', imageUrl);
      
      // Here you would typically send this URL to your backend for analysis
      // For now, we'll still use the fallback response
      
    } catch (uploadError) {
      console.error('Error uploading image:', uploadError);
      console.log('Falling back to local results generation');
    }
    
    // Generate realistic random values for the model rating
    // This serves as both a fallback and as the actual implementation for now
    const angelicness = Math.floor(Math.random() * 100);
    const sexyness = Math.floor(Math.random() * 100);
    
    // Select a random model type
    const modelTypes = ["Commercial", "Editorial", "Runway", "Fitness", "Lingerie", "High Fashion"];
    const modelType = modelTypes[Math.floor(Math.random() * modelTypes.length)];
    
    // Generate random unique features
    const allFeatures = [
      "Alien Look",
      "Baby Face",
      "High Cheekbones",
      "Cat Eyes",
      "Full Lips",
      "Defined Jawline",
      "Symmetrical Face",
      "Strong Brows",
      "Freckles",
      "Dimples",
      "Sharp Nose",
      "Almond Eyes"
    ];
    
    // Shuffle and pick 4 features
    const uniqueFeatures = [...allFeatures]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    
    // Select a random Dubai district
    const districts = ["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "JBR", "DIFC", "Jumeirah", "Business Bay"];
    const dubaiDistrict = districts[Math.floor(Math.random() * districts.length)];
    
    // Generate personalized comments based on the values
    const commentTemplates = [
      `You have a ${angelicness > 70 ? 'striking' : 'pleasant'} face with ${uniqueFeatures.join(', ')}.`,
      `Your ${modelType.toLowerCase()} potential is ${sexyness > 80 ? 'exceptional' : 'good'}.`,
      `Based on your look, you'd fit well in the ${dubaiDistrict} scene.`,
      `With your features, you could excel in ${modelType} modeling.`
    ];
    
    // Join 2-3 random comments
    const comments = commentTemplates
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 2) + 2)
      .join(' ');
    
    // Return the complete model rating
    return {
      angelicness,
      sexyness,
      modelType,
      uniqueFeatures,
      dubaiDistrict,
      comments
    };
  } catch (error) {
    console.error('Error getting model rating:', error);
    throw error;
  }
};
