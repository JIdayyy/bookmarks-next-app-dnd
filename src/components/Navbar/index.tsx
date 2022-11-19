import { Flex, HStack, Text } from "@chakra-ui/react";
import Logo from "@components/atoms/Logo";
import Avatar from "@components/Avatar";
import Link from "next/link";
import navLinks from "src/config/navLinks";

export default function Navbar(): JSX.Element {
    return (
        <Flex w="full" position="sticky" top={0} justifyContent="center">
            <Flex justifyContent="space-between" p={2} flexGrow={1} maxW="7xl">
                <Logo />
                <HStack spacing={10}>
                    {navLinks.map((link) => (
                        <Link key={link.title} href={link.path}>
                            <Text
                                cursor="pointer"
                                fontWeight={600}
                                _hover={{ textDecoration: "underline" }}
                            >
                                {link.title}
                            </Text>
                        </Link>
                    ))}
                    <Avatar width={50} height={50} />
                </HStack>
            </Flex>
        </Flex>
    );
}
