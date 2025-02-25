import cryptojs from "crypto-js";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";


const encrypt_key = process.env.NEXT_PUBLIC_JWT_ENCRYPTION_KEY as string;
const jwt_secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;

if (!encrypt_key || !jwt_secret) {
    throw new Error("Missing environment variables: NEXT_PUBLIC_JWT_ENCRYPTION_KEY or NEXT_PUBLIC_JWT_SECRET");
}

export function encryptJWT(token: string) {
    const encrypted = cryptojs.AES.encrypt(token, encrypt_key).toString();
    return encrypted;
}

export function decryptJWT(encryptedToken: string) {
    try {
        const bytes = cryptojs.AES.decrypt(encryptedToken, encrypt_key);
        const decrypted = bytes.toString(cryptojs.enc.Utf8);

        if (!decrypted) {
            console.error("Decryption failed. Possibly incorrect key or corrupt token.");
            return false;
        }
        return decrypted;
    } catch (err) {
        return false;
    }
}

interface payloadDataType {
    id: number,
    email: string,
    continueWith: string
}

export function createJWTToken(payload: payloadDataType) {
    const token = jwt.sign(payload, jwt_secret, { expiresIn: "7d" });
    return token;
}

export async function verifyJWTInEdge(token: string) {
    try {
        const secret = new TextEncoder().encode(jwt_secret);
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return null;
    }
}
