
export const getModelRating = async (imageFile: File): Promise<ModelRating> => {
  try {
    console.log("📸 Processing image file:", imageFile);

    // Create a FormData object to send the image directly to Xano
    const formData = new FormData();
    formData.append("Picture", imageFile);

    console.log("🌐 Sending image directly to Xano API");

    const response = await fetch("https://xbut-eryu-hhsg.f2.xano.io/api:TAf2tJRT/ModelRater", {
      method: "POST",
      body: formData, // Send the FormData with the image file
    });

    console.log("📨 Xano response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Xano error response:", errorText);
      throw new Error(`Xano API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Xano response data:", data);

    return {
      angelicness: data.angelicness || 0,
      sexyness: data.sexyness || 0,
      modelType: data.modelType || "",
      uniqueFeatures: data.uniqueFeatures || [],
      dubaiDistrict: data.dubaiDistrict || "",
      comments: data.comments || "",
    };
  } catch (error) {
    console.error("🚨 getModelRating error:", error);
    throw error;
  }
};
