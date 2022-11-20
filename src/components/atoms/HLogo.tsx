import { Flex, Text } from "@chakra-ui/react";
import Logo from "../../../public/logo.svg";

const HorizontalLogo = (): JSX.Element => {
    return (
        <Flex justifyContent="center" alignItems="center">
            <Logo />
            <Text ml={5}>
                Welcome to <br /> WILD SHORTCUTS
            </Text>
        </Flex>
    );
};

export default HorizontalLogo;
