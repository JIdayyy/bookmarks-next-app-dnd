import { Flex, Link, Skeleton, Stack, Text, Wrap } from "@chakra-ui/react";
import { BookMark, Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Image from "next/image";
import AddNewBookmark from "../../components/Modals/NewBookmarkModal";

interface IProps {
    category: Category;
}

export default function BookMarkByCategory({ category }: IProps): JSX.Element {
    const { data, isLoading } = useQuery(
        ["allBookMarks", "category", category.id],
        async () =>
            (
                await axiosInstance.get<BookMark[]>(
                    `/bookmarks?category=${category.name}`,
                )
            ).data,
    );

    if (isLoading)
        return (
            <Flex>
                <Stack>
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                </Stack>
            </Flex>
        );

    return (
        <Flex display="inline-flex" mt={10} direction="column">
            <Flex w="full" justifyContent="space-between">
                <Text my={2}>{category.name}</Text>
                <AddNewBookmark categoryId={category.id} />
            </Flex>

            <Droppable direction="horizontal" droppableId={category.id}>
                {(droppableProvided, snapShot) => (
                    <Wrap
                        alignItems="flex-start"
                        display="inline-flex"
                        justifyContent="flex-start"
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                        w="full"
                        minH="60px"
                        border={
                            snapShot.isDraggingOver ? "3px dotted #153a71" : ""
                        }
                        bg={snapShot.isDraggingOver ? "#041022" : "transparent"}
                        rounded="md"
                        py={2}
                    >
                        {data
                            ?.sort((a, b) => a.position - b.position)
                            .map((bookMark, index) => (
                                <Draggable
                                    shouldRespectForcePress
                                    key={bookMark.id}
                                    index={index}
                                    draggableId={bookMark.id}
                                >
                                    {(provided) => (
                                        <Link
                                            href={bookMark.url}
                                            target={"_blank"}
                                        >
                                            <Flex
                                                userSelect="none"
                                                mx={2}
                                                ref={provided.innerRef}
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                className="white-grad"
                                                p={2}
                                                flexShrink={0}
                                                justifyContent="space-between"
                                                alignItems="center"
                                                shadow="md"
                                                border="1px solid #0E193C"
                                                rounded="md"
                                                w={200}
                                                h="60px"
                                            >
                                                <Text>{bookMark.title}</Text>

                                                <Image
                                                    alt="bookmark_logo"
                                                    objectFit="cover"
                                                    width={40}
                                                    height={40}
                                                    src={bookMark.image_url}
                                                />
                                            </Flex>
                                        </Link>
                                    )}
                                </Draggable>
                            ))}
                        {droppableProvided.placeholder}
                    </Wrap>
                )}
            </Droppable>
        </Flex>
    );
}
