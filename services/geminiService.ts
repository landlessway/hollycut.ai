import { GoogleGenAI } from "@google/genai";

/**
 * Generates the Hollywood Set Visit photo(s).
 * Uses gemini-3-pro-image-preview.
 * Supports generating 1 or 2 images.
 */
export const generateSetPhoto = async (
  apiKey: string,
  prompt: string, 
  referenceImageBase64: string,
  aspectRatio: string,
  imageCount: number = 1
): Promise<string[]> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const mimeType = referenceImageBase64.startsWith('data:image/jpeg') ? 'image/jpeg' : 'image/png';
  const cleanBase64 = referenceImageBase64.replace(/^data:image\/\w+;base64,/, "");

  // Define a single generation task
  const generateTask = async () => {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType: mimeType,
              data: cleanBase64
            }
          }
        ]
      },
      config: {
        imageConfig: {
          imageSize: "4K",
          aspectRatio: aspectRatio 
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("Generation failed for one of the images.");
  };

  try {
    // Run tasks in parallel based on imageCount
    const tasks = Array.from({ length: imageCount }, () => generateTask());
    const results = await Promise.all(tasks);
    return results;

  } catch (error) {
    console.error("Generation Error:", error);
    throw error;
  }
};

/**
 * Edits an existing image using Gemini 2.5 Flash Image.
 */
export const editSetPhoto = async (
  apiKey: string,
  originalImageBase64: string,
  editInstruction: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }
  
  const ai = new GoogleGenAI({ apiKey });

  try {
    const cleanBase64 = originalImageBase64.replace(/^data:image\/\w+;base64,/, "");
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanBase64
            }
          },
          { text: editInstruction }
        ]
      }
    });

    // Extract image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("编辑失败，请重试。");

  } catch (error) {
    console.error("Editing Error:", error);
    throw error;
  }
};

/**
 * Generates a poster impression for the background based on movie name.
 * Uses gemini-2.5-flash-image for fast generation.
 */
export const getMoviePosterImpression = async (
  apiKey: string,
  movieName: string
): Promise<string | null> => {
  if (!apiKey || !movieName) return null;
  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A cinematic, iconic movie poster for the movie "${movieName}". High resolution, official art style.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Background Generation Error:", error);
    return null;
  }
};
