import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

const bookMarkpositionHandler = async (
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> => {
    if (req.method === "PUT") {
        const { id, newPosition, oldPosition, categoryId } = req.body;

        await prisma.bookMark.update({
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

        const allBookmarks = await prisma.bookMark.findMany({
            where: {
                category: {
                    id: categoryId,
                },
            },
        });

        const updatedBookmarks = allBookmarks.map((bookmark) => {
            if (bookmark.id === id) {
                return {
                    ...bookmark,
                    position: newPosition,
                };
            }

            if (newPosition < oldPosition) {
                if (
                    bookmark.position >= newPosition &&
                    bookmark.position < oldPosition
                ) {
                    return {
                        ...bookmark,
                        position: bookmark.position + 1,
                    };
                }
            } else if (newPosition > oldPosition) {
                if (
                    bookmark.position <= newPosition &&
                    bookmark.position > oldPosition
                ) {
                    return {
                        ...bookmark,
                        position: bookmark.position - 1,
                    };
                }
            }

            return bookmark;
        });

        await prisma.$transaction(
            updatedBookmarks.map((bookmark) => {
                return prisma.bookMark.update({
                    where: {
                        id: bookmark.id,
                    },
                    data: {
                        position: bookmark.position,
                    },
                });
            }),
        );

        res.status(200).json({ message: "Bookmarks updated" });
    }
};

export default bookMarkpositionHandler;
