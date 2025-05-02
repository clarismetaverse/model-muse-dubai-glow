
import { ModelRating } from '@/components/ResultsCard';
// src/services/modelRaterApi.ts

export interface ModelRating {
  angelicness: number;
  sexyness: number;
  modelType: string;
  uniqueFeatures: string[];
  dubaiDistrict: string;
  comments: string;
}

export const getModelRating = async (imageFile: File): Promise<ModelRating> => {
  try {
    // Step 1: Upload image to freeimage.host
    const formData = new FormData();
    formData.append("source", imageFile);
    formData.append("type", "file");

    const uploadResponse = await fetch("https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5", {
      method: "POST",
      body: formData,
    });

    const uploadResult = await uploadResponse.json();
    const imageUrl = uploadResult?.image?.url;

    if (!imageUrl) {
      throw new Error("Image upload failed");
    }

    // Step 2: Send image URL to Xano
    const response = await fetch("https://xbut-eryu-hhsg.f2.xano.io/api:TAf2tJRT/ModelRater", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Xano error: ${response.status} — ${errorText}`);
    }

    const data = await response.json();

    // Step 3: Extract and return model rating
    return {
      angelicness: data.angelicness || 0,
      sexyness: data.sexyness || 0,
      modelType: data.modelType || "",
      uniqueFeatures: data.uniqueFeatures || [],
      dubaiDistrict: data.dubaiDistrict || "",
      comments: data.comments || "",
    };
  } catch (error) {
    console.error("Error getting model rating:", error);
    throw error;
  }
};
