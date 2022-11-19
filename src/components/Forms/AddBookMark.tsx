import {
    Button,
    Center,
    FormLabel,
    HStack,
    Input,
    VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createPortal } from "react-dom";
import { FieldValues, useForm } from "react-hook-form";
import axiosInstance from "src/utils/axiosInstance";

export default function AddBookMark(): JSX.Element {
    const [show, setShow] = React.useState(false);
    const { handleSubmit, register } = useForm();
    const client = useQueryClient();

    const { mutate, isLoading } = useMutation(
        (data: FieldValues) => axiosInstance.post(`/bookmarks`, data),
        {
            onSuccess: () => {
                client.invalidateQueries(["allBookMarks"]);
            },
        },
    );

    const onSubmit = async (data: FieldValues) => {
        mutate(data);
    };

    return createPortal(
        <>
            <Button
                position="fixed"
                bottom={10}
                right={10}
                onClick={() => setShow(true)}
                rounded="full"
            >
                +
            </Button>
            {show && (
                <Center
                    bg="blackAlpha.800"
                    w="100vw"
                    h="100vh"
                    top={0}
                    position="fixed"
                    left={0}
                >
                    <VStack
                        bg="white"
                        shadow="md"
                        rounded="md"
                        spacing={2}
                        p={5}
                    >
                        <FormLabel w="full">Title :</FormLabel>
                        <Input {...register("title")} />
                        <FormLabel w="full">URL :</FormLabel>
                        <Input {...register("url")} />
                        <FormLabel w="full">Image Url :</FormLabel>
                        <Input {...register("image_url")} />

                        <HStack>
                            <Button
                                colorScheme="red"
                                isLoading={isLoading}
                                onClick={() => setShow(false)}
                            >
                                CANCEL
                            </Button>
                            <Button
                                isLoading={isLoading}
                                onClick={handleSubmit(onSubmit)}
                            >
                                SUBMIT
                            </Button>
                        </HStack>
                    </VStack>
                </Center>
            )}
        </>,
        document.body,
    );
}
