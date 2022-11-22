import { Box, Flex, Spinner } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuth } from "src/context/AuthContext";

interface IProps {
    children: ReactNode;
}

export default function AppLayout({ children }: IProps): JSX.Element {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/signin");
        }
    }, [user]);

    return (
        <Flex
            px={[4, 4, 4, 4, 0]}
            justifyContent="flex-start"
            alignItems="center"
            direction="column"
            minH="100vh"
            className="wallpaper"
        >
            <Navbar />
            <Box w="full" maxW="7xl">
                {user ? children : <Spinner />}
            </Box>
        </Flex>
    );
}
