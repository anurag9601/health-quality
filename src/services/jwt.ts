import cryptojs from "crypto-js";
import jwt from "jsonwebtoken";

const encrypt_key = process.env.NEXT_PUBLIC_JWT_ENCRYPTION_KEY as string;

const jwt_secret = process.env.NEXT_PUBLIC_JWT_SECRET as string;

export function encryptJWT(token: string) {
    return cryptojs.AES.encrypt(token, encrypt_key).toString();
}

export function decryptJWT(encryptedToken: string) {
    const bytes = cryptojs.AES.decrypt(encryptedToken, encrypt_key);
    return bytes.toString(cryptojs.enc.Utf8);
}

interface payloadDataType {
    id: number,
    email: string
}
export function createJWTToken(payload: payloadDataType) {
    const token = jwt.sign(payload, jwt_secret, { expiresIn: "7d" });
    return token;
}

export function verifyJWTToken(token: string) {
    const isVerified = jwt.verify(token, jwt_secret);
    return isVerified;
}