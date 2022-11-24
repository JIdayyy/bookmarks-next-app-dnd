import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "./src/utils/authentifaction";

export async function middleware(req: NextRequest): Promise<NextResponse> {
    console.log("middleware");
    const token = req.headers.get("authorization")?.split(" ")[1] || "";
    const user = await getUserFromToken(token);

    if (!user) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth/signin";
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/bookmarks/:path*", "/api/categories/:path*"],
};
