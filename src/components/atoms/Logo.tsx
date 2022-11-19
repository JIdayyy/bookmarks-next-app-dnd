import { Flex, Text } from "@chakra-ui/react";
import SvgLogo from "../../../public/logo.svg";

const Logo = (): JSX.Element => {
    return (
        <Flex justifyContent="center" alignItems="center">
            <SvgLogo />
            <Text ml={5}>WILD SHORTCUTS</Text>
        </Flex>
    );
};

export default Logo;
