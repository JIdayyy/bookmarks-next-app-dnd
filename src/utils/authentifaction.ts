import * as jose from "jose";

const secret = process.env.JWT_SECRET || "";

export const getUserFromToken = async (
    token: string,
): Promise<jose.JWTPayload | null> => {
    try {
        const { payload } = await jose.jwtVerify(
            token,
            new TextEncoder().encode(secret),
        );

        return payload;
    } catch (error) {
        console.error(error);
        return null;
    }
};
