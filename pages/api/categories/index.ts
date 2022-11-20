import { getUserFromToken } from "./../../../src/utils/authentifaction";
import { Category } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "50mb",
        },
    },
};

const categoriesHandlers = async (
    req: NextApiRequest,
    res: NextApiResponse<Category | Category[] | { message: string }>,
): Promise<void> => {
    if (req.method === "GET") {
        const token = req.headers.authorization?.split(" ")[1] || "";
        const user = await getUserFromToken(token);

        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const category = await prisma.category.findMany({
            where: {
                user_id: user.id as string,
            },
        });

        return res.status(200).json(category);
    }

    // if (req.method === "POST") {
    //     const { title, url, image_url, categoryId } = req.body;
    //     const user = await getUserFromToken(
    //         req.headers.authorization?.split(" ")[1] || "",
    //     );
    //     const newCategory = await prisma.category.create({
    //         data: {
    //             title: title as string,
    //             url: url as string,
    //             image_url: image_url as string,
    //             category: {
    //                 connect: {
    //                     id: categoryId as string,
    //                 },
    //             },
    //             user: {
    //                 connect: {
    //                     id: user.id as string,
    //                 },
    //             },
    //         },
    //     });

    //     return res.status(200).json(newCategory);
    // }

    return res.status(500).json({ message: "Method not allowed" });
};

export default categoriesHandlers;
