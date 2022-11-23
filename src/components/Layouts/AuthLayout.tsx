import { Box, Center, Spinner } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuth } from "src/context/AuthContext";
import axiosInstance from "src/utils/axiosInstance";

interface IProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: IProps): JSX.Element {
    const { setUser } = useAuth();
    const router = useRouter();

    const { mutate, isLoading } = useMutation(
        (data) => axiosInstance.post("/auth/me", data),
        {
            onSuccess: (data) => {
                if (data.data) {
                    setUser(data.data);
                    router.push("/");
                }
            },
        },
    );

    useEffect(() => {
        mutate();
    }, []);

    if (isLoading)
        return (
            <Center w="100vw" h="100vh">
                <Spinner />
            </Center>
        );

    return <Box className="wallpaper">{children}</Box>;
}
