/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import * as jose from "jose";
import bcrypt from "bcryptjs";

const secret = process.env.JWT_SECRET || "";

const signUnHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    if (req.method === "POST") {
        const { email, password } = req.body;

        const user = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, 10),
            },
        });

        const { password: removedPassword, ...userWithoutPassword } = user;

        const token = await new jose.SignJWT({ ...userWithoutPassword })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            // .setExpirationTime(exp)
            // .setIssuedAt(iat)
            // .setNotBefore(iat)
            .sign(new TextEncoder().encode(secret));

        res.setHeader("Authorization", `Bearer ${token}`);

        return res.status(200).json(userWithoutPassword);
    }
};

export default signUnHandler;
