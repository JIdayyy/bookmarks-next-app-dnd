import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    Stack,
    Text,
} from "@chakra-ui/react";
import HorizontalLogo from "@components/atoms/HLogo";
import AuthLayout from "@components/Layouts/AuthLayout";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "src/context/AuthContext";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ImKey } from "react-icons/im";
import axiosInstance from "src/utils/axiosInstance";
import { NextPageWithLayout } from "pages/_app";

interface SignInCredentials {
    email: string;
    password: string;
}

const SignIn: NextPageWithLayout = () => {
    const { handleSubmit, register } = useForm<SignInCredentials>();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { setUser } = useAuth();

    const { mutate, isLoading } = useMutation(
        (data: SignInCredentials) => axiosInstance.post(`/auth/signin`, data),
        {
            onSuccess: (data) => {
                localStorage.setItem("token", data.headers["authorization"]);
                setUser(data.data);
                console.log(data);

                router.push("/");
            },
        },
    );

    const onSubmit = (data: SignInCredentials) => {
        mutate(data);
    };

    return (
        <Center w="100vw" minH={"100vh"}>
            <Stack w="full" spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <HorizontalLogo />
                </Stack>
                <Box
                    rounded={"lg"}
                    bgColor="rgb(236,223,236, 5%)"
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack w="full" spacing={4}>
                        <Text fontSize={24} w="full" textAlign="center">
                            Sign In
                        </Text>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>

                            <InputGroup>
                                <InputLeftElement
                                    children={
                                        <Icon
                                            as={AiOutlineMail}
                                            color="white"
                                        />
                                    }
                                />
                                <Input
                                    _autofill={{
                                        border: "1px solid #11203F",
                                        textFillColor: "#c6c6c6",
                                        boxShadow: "transparent",
                                        transition:
                                            "background-color 5000s ease-in-out 0s",
                                    }}
                                    variant="solid"
                                    {...register("email")}
                                    type="email"
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    children={<Icon as={ImKey} color="white" />}
                                />
                                <InputRightElement
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    children={
                                        <Icon
                                            color="white"
                                            as={
                                                showPassword
                                                    ? AiFillEyeInvisible
                                                    : AiFillEye
                                            }
                                        />
                                    }
                                />
                                <Input
                                    _autofill={{
                                        border: "1px solid #11203F",
                                        textFillColor: "#c6c6c6",
                                        fontWeight: "bold",
                                        boxShadow: "transparent",
                                        transition:
                                            "background-color 5000s ease-in-out 0s",
                                    }}
                                    variant="solid"
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                />
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Link color={"blue.400"}>Forgot password?</Link>
                            </Stack>
                            <Button
                                onClick={handleSubmit(onSubmit)}
                                bg={"blue.400"}
                                isLoading={isLoading}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Sign in
                            </Button>
                        </Stack>
                        <Flex w="full" justifyContent="center">
                            <Text>No account yet ? </Text>
                            <Link href="/auth/signup">
                                <Text ml={2} color="blue.400">
                                    SignUp here
                                </Text>
                            </Link>
                        </Flex>
                    </Stack>
                </Box>
            </Stack>
        </Center>
    );
};

SignIn.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default SignIn;
