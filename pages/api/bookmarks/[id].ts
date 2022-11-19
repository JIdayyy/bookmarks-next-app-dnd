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

const singleBookMarksHandlers = async (
    req: NextApiRequest,
    res: NextApiResponse<BookMark | { message: string }>,
): Promise<void> => {
    if (req.method === "DELETE") {
        const { id } = req.query;
        console.log("ID", id);
        const bookmark = await prisma.bookMark.delete({
            where: {
                id: id as string,
            },
        });

        return res.status(200).json(bookmark);
    }

    return res.status(500).json({ message: "Method not allowed" });
};

export default singleBookMarksHandlers;
