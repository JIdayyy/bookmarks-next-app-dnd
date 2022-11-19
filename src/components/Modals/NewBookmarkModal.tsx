import {
    Button,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
import axiosInstance from "src/utils/axiosInstance";

interface IProps {
    categoryId: string;
}

export default function AddNewBookmark({ categoryId }: IProps): JSX.Element {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleSubmit, register } = useForm();
    const client = useQueryClient();

    const { mutate, isLoading } = useMutation(
        (data: FieldValues) => axiosInstance.post(`/bookmarks`, data),
        {
            onSuccess: () => {
                client.invalidateQueries([
                    "allBookMarks",
                    "category",
                    categoryId,
                ]);
            },
        },
    );

    const onSubmit = async (data: FieldValues) => {
        mutate({
            ...data,
            categoryId,
        });
    };

    return (
        <>
            <Button size="sm" bg="#0285FF" color="white" onClick={onOpen}>
                Add new +
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent border="2px solid #343E5C" bg="#0A122C">
                    <ModalHeader>
                        <Text>Add a new bookmark</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack rounded="md" spacing={2} p={5}>
                            <FormLabel w="full">Title :</FormLabel>
                            <Input variant="solid" {...register("title")} />
                            <FormLabel w="full">URL :</FormLabel>
                            <Input variant="solid" {...register("url")} />
                            <FormLabel w="full">Image Url :</FormLabel>
                            <Input variant="solid" {...register("image_url")} />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            bg="#0285FF"
                            color="white"
                            colorScheme="blue"
                            isLoading={isLoading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            SUBMIT
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
