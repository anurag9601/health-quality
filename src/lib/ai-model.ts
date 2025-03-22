import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function fileToGeneratePart(imageBuffer: Buffer<ArrayBufferLike>, mimeType: string) {
    const imageData = imageBuffer.toString("base64");

    return {
        inlineData: {
            data: imageData,
            mimeType: mimeType,
        },
    }
}

export async function getImageURLAndGiveResponse(imageBuffer: Buffer<ArrayBufferLike>, mimeType: string) {

    try {
        const PROMPT = `
    You are an AI agent specialized in providing detailed food ingredient information. Given an image of a product’s ingredient list, return a structured JSON object with the following details:

    Product Details:

    product_name: The name of the product.
    expiry_date: The expiry date, if available.
    manufacture_date: The manufacturing date, if available.
    Ingredients Information:

    An array of objects where each object contains:
    name: The ingredient name.
    healthy: A classification as "Healthy", "Unhealthy", or "Neutral".
    description: A short explanation of the ingredient, including its health impact.
    not_good_for: A brief note on which individuals (e.g., diabetics, heart patients, gluten-sensitive individuals) should avoid or limit this ingredient.
    Overall Health Assessment:

    overall_health_assessment: A summary of the product’s healthiness based on its ingredients.
    healthy: A single boolean value (true or false) indicating whether the product is healthy overall. If it contains more unhealthy ingredients than healthy ones, set this to false; otherwise, set it to true.

    and if given image is not of any product or not clear simple return one json response like { error: "error as per you notice what is problem" }

    also very import don't respond either respond in 3 second or simple pass error for example { error: "Something went wrong" } don't put on wait more then 3 second do your best to response under 3 seconds


    JSON Format: The response should be this format only
    `

        const IMAGE_PART = await fileToGeneratePart(imageBuffer, mimeType);

        const result = await model.generateContent([PROMPT, IMAGE_PART]);

        return result.response.text();
    } catch (error) {
        console.log("Error in getImageURLAndGiveResponse function", error);
        return false;
    }
}