import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useAuth } from "src/context/AuthContext";

interface IProps {
    width: number;
    height: number;
}

export default function Avatar({ width, height }: IProps): JSX.Element {
    const { user } = useAuth();

    return (
        <Box
            position="relative"
            overflow="hidden"
            rounded="full"
            width={width}
            height={height}
        >
            <Image layout="fill" alt="avatar" src={user.picture} />
        </Box>
    );
}
