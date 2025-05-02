export const getModelRating = async (imageFile: File): Promise<ModelRating> => {
  try {
    console.log("🔄 Uploading image to freeimage.host...");
    console.log("📸 File:", imageFile);

    const formData = new FormData();
    formData.append("source", imageFile);
    formData.append("type", "file");

    const uploadResponse = await fetch("https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5", {
      method: "POST",
      body: formData,
    });

    const uploadResult = await uploadResponse.json();
    console.log("✅ Upload result:", uploadResult);

    // Handle both possible image URL fields
    const imageUrl = uploadResult?.image?.url || uploadResult?.image?.display_url;

    if (!imageUrl) {
      console.error("❌ Failed to get image URL from upload result.");
      throw new Error("Image upload succeeded but no URL was returned.");
    }

    console.log("🌐 Sending image URL to Xano:", imageUrl);

    const response = await fetch("https://xbut-eryu-hhsg.f2.xano.io/api:TAf2tJRT/ModelRater", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl }),
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
