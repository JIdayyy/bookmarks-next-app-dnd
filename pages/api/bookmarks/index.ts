import { getUserFromToken } from "./../../../src/utils/authentifaction";
import { BookMark } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "50mb",
        },
    },
};

const bookMarksHandlers = async (
    req: NextApiRequest,
    res: NextApiResponse<BookMark | BookMark[] | { message: string }>,
): Promise<void> => {
    if (req.method === "GET") {
        const { category } = req.query;

        const user = await getUserFromToken(
            req.headers.authorization?.split(" ")[1] || "",
        );

        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const bookmarks = await prisma.bookMark.findMany({
            where: {
                user_id: user.id as string,
                category: {
                    name: {
                        equals: category as string,
                    },
                },
            },
        });

        return res.status(200).json(bookmarks);
    }

    if (req.method === "PUT") {
        const { id, categoryId } = req.body;
        const bookmark = await prisma.bookMark.update({
            where: {
                id: id as string,
            },
            data: {
                category: {
                    connect: {
                        id: categoryId as string,
                    },
                },
            },
        });
        return res.status(200).json(bookmark);
    }

    if (req.method === "POST") {
        const { title, url, image_url, categoryId } = req.body;

        const user = await getUserFromToken(
            req.headers.authorization?.split(" ")[1] || "",
        );

        if (!user) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const bookMarksCount = await prisma.bookMark.count({
            where: {
                category: {
                    id: categoryId as string,
                },
            },
        });
        const newBookmark = await prisma.bookMark.create({
            data: {
                title: title as string,
                url: url as string,
                image_url: image_url as string,
                position: bookMarksCount + 1,
                category: {
                    connect: {
                        id: categoryId as string,
                    },
                },
                user: {
                    connect: {
                        id: user.id as string,
                    },
                },
            },
        });

        return res.status(200).json(newBookmark);
    }

    if (req.method === "DELETE") {
        const { id } = req.body;
        const bookmark = await prisma.bookMark.delete({
            where: {
                id: id as string,
            },
        });

        return res.status(200).json(bookmark);
    }

    return res.status(500).json({ message: "Method not allowed" });
};

export default bookMarksHandlers;
