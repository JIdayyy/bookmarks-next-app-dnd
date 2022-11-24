import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";

const secret = process.env.JWT_SECRET || "";

const authMeHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    if (req.method === "POST") {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const { payload } = await jose.jwtVerify(
            token,
            new TextEncoder().encode(secret),
        );

        return res.status(200).json(payload);
    }

    return res.status(405).json({ message: "Method not allowed" });
};

export default authMeHandler;
