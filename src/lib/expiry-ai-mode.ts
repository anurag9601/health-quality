import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.EXPIRY_ALERT_GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

export async function getImagesDataUsingAI(img1Buffer: Buffer<ArrayBufferLike> | null = null, img2Buffer: Buffer<ArrayBufferLike> | null = null, img1Mime: string = "", img2Mime: string = "") {
    let PROMPT = `You are an AI agent specialized in providing product name and expiry and manufacture date of it. Given an image of a product in which these informations are available your just have to retrieve the data from it and return a structured JSON object with the following details.

    RETURN ONLY JSON OBJECT CONTAINING product_name product_expiry_date product_manufacture_date DO NOT RETURN AND EXTRA TEXT ACCEPT JSON OBJECT CONTAINING RESPECTIVE VALUES

    IF THE IMAGE IS OF TWO DIFFERENT PRODUCTS SIMPLY SEND THE JSON RESPONSE OF FIRST PRODUCT ONLY

    IF THE RESPECTIVE DATA IS NOT PRESENT IN THE IMAGE SIMPLY RETURN THE ERROR: ERROR FORMAT 
    { error: "ERROR AS YOU NOTICE WHAT IS THE PROBLEM"}
    `
    if (img1Buffer && img2Buffer) {
        const img1Data = img1Buffer.toString("base64")
        const img2Data = img2Buffer.toString("base64")
        const result = await model.generateContent([
            {
                inlineData: {
                    data: img1Data,
                    mimeType: img1Mime
                }
            },
            {
                inlineData: {
                    data: img2Data,
                    mimeType: img2Mime
                }
            },
            PROMPT
        ]);

        return result.response.text();
    }
    if (img1Buffer) {
        const img1Data = img1Buffer.toString("base64")
        const result = await model.generateContent([
            {
                inlineData: {
                    data: img1Data,
                    mimeType: img1Mime
                }
            },
            PROMPT
        ]);

        return result.response.text();
    }
    if (img2Buffer) {
        const img2Data = img2Buffer.toString("base64")
        const result = await model.generateContent([
            {
                inlineData: {
                    data: img2Data,
                    mimeType: img2Mime
                }
            },
            PROMPT
        ]);

        return result.response.text();
    }
}