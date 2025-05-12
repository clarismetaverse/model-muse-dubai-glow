
import { ModelRating } from '@/components/ResultsCard';

export const getModelRating = async (imageFile: File): Promise<ModelRating> => {
  try {
    console.log("📸 Processing image file:", imageFile);

    // Create a FormData object to send the image directly to Xano
    const formData = new FormData();
    formData.append("Picture", imageFile);

    console.log("🌐 Sending image directly to Xano API");

    const response = await fetch("https://xbut-eryu-hhsg.f2.xano.io/api:TAf2tJRT/SendPicModelRater", {
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

    // Extract the response from the "resp" field which contains a JSON string and text
    const respContent = data.resp[0];
    
    // Extract the JSON part from the response
    const jsonMatch = respContent.match(/```json\n([\s\S]*?)\n```/);
    let jsonData = {};
    
    if (jsonMatch && jsonMatch[1]) {
      try {
        jsonData = JSON.parse(jsonMatch[1]);
        console.log("📊 Parsed JSON data:", jsonData);
      } catch (e) {
        console.error("❌ Failed to parse JSON part:", e);
      }
    }
    
    // Extract the text part (comments) which comes after the JSON
    let comments = "";
    if (respContent) {
      const textMatch = respContent.replace(/```json\n[\s\S]*?\n```\n/, "").trim();
      comments = textMatch;
      console.log("💬 Extracted comments:", comments);
    }

    return {
      angelicness: jsonData.angelicness || 0,
      sexyness: jsonData.sexyness || 0,
      modelType: jsonData["model agency rate"] || "",
      uniqueFeatures: jsonData["look unique features"] ? [jsonData["look unique features"]] : [],
      dubaiDistrict: extractDubaiDistrict(comments) || "",
      comments: comments || "",
    };
  } catch (error) {
    console.error("🚨 getModelRating error:", error);
    throw error;
  }
};

// Helper function to extract Dubai district from the comments text
function extractDubaiDistrict(text: string): string {
  // Look for Dubai district names in the text - focusing on the last sentence which typically contains the district
  const dubaiDistrictMatch = text.match(/([A-Za-z\s]+)\s+would suit|([A-Za-z\s]+)\s+fits|([A-Za-z\s]+)\s+is perfect/i);
  
  if (dubaiDistrictMatch) {
    // Return the first captured group that isn't undefined
    return (dubaiDistrictMatch[1] || dubaiDistrictMatch[2] || dubaiDistrictMatch[3]).trim();
  }
  
  // If we can't extract it with regex, look for "JBR" or other common Dubai area names
  const commonAreas = ["Jumeirah Beach Residence", "JBR", "Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Business Bay"];
  for (const area of commonAreas) {
    if (text.includes(area)) {
      return area;
    }
  }
  
  return "";
}
