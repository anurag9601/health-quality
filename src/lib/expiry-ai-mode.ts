import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.EXPIRY_ALERT_GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-pro' });

export async function getImagesDataUsingAI(img1Buffer: Buffer<ArrayBufferLike> | null = null, img2Buffer: Buffer<ArrayBufferLike> | null = null, img1Mime: string = "", img2Mime: string = "") {
    let PROMPT = `You are an AI agent specialized in extracting product information from images, specifically the product name, expiry date, and manufacture date. Your task is to analyze the provided image and return the extracted data in a structured JSON object.

**Instructions:**

1.  **Data Extraction:**
    * Carefully analyze the image to locate and extract the product name, expiry date, and manufacture date.
    * Pay attention to variations in date formats (e.g., DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD, MMM DD, YYYY).
    * Be aware of phrases like "Best Before," "Use By," "Mfg.," "Exp.," etc.

2.  **Date Calculation:**
    * If only the manufacture date is present and a "Best Before" or "Use By" duration is provided (e.g., "Best Before 4 months"), calculate the expiry date.
    * If only the expiry date is present and a "Best Before" or "Use By" duration is provided, calculate the manufacture date.
    * if only the manufacture date or expiry date is available return only the available data.

3.  **JSON Output:**
    * Return the extracted or calculated data in a JSON object with the following structure:
        \`\`\`json
        {
            "product_name": "Product Name",
            "product_expiry_date": "YYYY-MM-DD",
            "product_manufacture_date": "YYYY-MM-DD"
        }
        \`\`\`
    * If a date cannot be reliably determined, use "null" for the corresponding field.
    * If a product name cannot be determined, use "null" for the corresponding field.

4.  **Error Handling:**
    * If the necessary information (product name, expiry date, or manufacture date) is completely absent or cannot be reliably extracted from the image, return a JSON object indicating the error:
        \`\`\`json
        { "error": "Data not available or could not be reliably extracted." }
        \`\`\`
    * Do not return any extra text, only the json object.
    * If the date calculation is impossible due to missing data, or ambiguous data, return the error JSON.

**Example Scenarios:**

* **Scenario 1: All data present:**
    * Input: Image containing "Product: XYZ," "Mfg: 2023-01-15," "Exp: 2024-01-15."
    * Output: \`{ "product_name": "XYZ", "product_expiry_date": "2024-01-15", "product_manufacture_date": "2023-01-15" }\`

* **Scenario 2: Manufacture date and "Best Before" duration:**
    * Input: Image containing "Product: ABC", "Mfg: 2023-11-01", "Best Before 4 months"
    * Output: \`{ "product_name": "ABC", "product_expiry_date": "2024-03-01", "product_manufacture_date": "2023-11-01" }\`

* **Scenario 3: data missing**
    * Input: image that does not contain any of the requested data.
    * Output: \`{ "error": "Data not available or could not be reliably extracted." }\`

* **Scenario 4: Only manufacture data present**
    * Input: Image containing "Product: test", "Mfg: 2023-03-01"
    * Output: \`{ "product_name": "test", "product_expiry_date": null, "product_manufacture_date": "2023-03-01" }\`

Return ONLY the JSON object. Keep the JSON as short as possible.`;

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