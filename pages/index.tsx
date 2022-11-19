import { Flex, Spinner } from "@chakra-ui/react";
import AppLayout from "@components/Layouts/AppLayout";
import { NextPageWithLayout } from "./_app";
import BookMarkByCategory from "@components/BookMark/BookMarkByCategory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "src/utils/axiosInstance";
import { BookMark, Category } from "@prisma/client";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import TrashIcon from "@components/atoms/TrashIcon";
import { useState } from "react";

const Home: NextPageWithLayout = () => {
    const [isDragging, setIdDragging] = useState(false);
    const { data, isLoading } = useQuery(["allCategories"], () =>
        axiosInstance.get<Category[]>("/categories"),
    );
    const { mutate: deleteBookmark } = useMutation(
        (data: { id: string; categoryId: string }) =>
            axiosInstance.delete(`/bookmarks/${data.id}`),
        {
            onMutate: async (data) => {
                await queryClient.cancelQueries({
                    queryKey: ["allBookMarks", "category", data.categoryId],
                });

                const previousBookMarks = queryClient.getQueryData([
                    "allBookMarks",
                    "category",
                    data.categoryId,
                ]);

                queryClient.setQueryData<BookMark[]>(
                    ["allBookMarks", "category", data.categoryId],
                    (old) => {
                        if (!old) return old;
                        return old.filter((item) => item.id !== data.id);
                    },
                );
                return { previousBookMarks };
            },
        },
    );

    const queryClient = useQueryClient();

    const { mutate } = useMutation(
        (data: {
            id: string;
            categoryId: string;
            previousCategoryId: string;
            newPosition: number;
            oldPosition: number;
        }) => axiosInstance.put("/bookmarks/position", data),
        {
            onMutate: async (data) => {
                await queryClient.cancelQueries({
                    queryKey: ["allBookMarks", "category", data.categoryId],
                });
                await queryClient.cancelQueries({
                    queryKey: [
                        "allBookMarks",
                        "category",
                        data.previousCategoryId,
                    ],
                });

                const newList = queryClient.getQueryData([
                    "allBookMarks",
                    "category",
                    data.categoryId,
                ]) as BookMark[];

                const previousList = queryClient.getQueryData([
                    "allBookMarks",
                    "category",
                    data.previousCategoryId,
                ]) as BookMark[];

                const item = previousList.find(
                    (item) => item.id === data.id,
                ) as BookMark;

                queryClient.setQueryData<BookMark[]>(
                    ["allBookMarks", "category", data.previousCategoryId],
                    (old) => {
                        if (!old) return old;
                        return old.filter((item) => item.id !== data.id);
                    },
                );

                queryClient.setQueryData<BookMark[]>(
                    ["allBookMarks", "category", data.categoryId],
                    (old) => {
                        if (!old) return [];

                        return [...old, item].map((bookmark) => {
                            if (bookmark.id === item.id) {
                                return {
                                    ...bookmark,
                                    position: data.newPosition,
                                };
                            }

                            if (data.newPosition < data.oldPosition) {
                                if (
                                    bookmark.position >= data.newPosition &&
                                    bookmark.position < data.oldPosition
                                ) {
                                    return {
                                        ...bookmark,
                                        position: bookmark.position + 1,
                                    };
                                }
                            } else if (data.newPosition > data.oldPosition) {
                                if (
                                    bookmark.position <= data.newPosition &&
                                    bookmark.position > data.oldPosition
                                ) {
                                    return {
                                        ...bookmark,
                                        position: bookmark.position - 1,
                                    };
                                }
                            }

                            return bookmark;
                        });
                    },
                );

                return { previousList, newList };
            },
        },
    );

    if (isLoading) return <Spinner />;

    const onDragEnd = (result: DropResult) => {
        setIdDragging(false);

        if (!result.destination) return;

        if (result.destination?.droppableId === "TRASH") {
            console.log("TRASH");
            return deleteBookmark({
                id: result.draggableId,
                categoryId: result.source.droppableId,
            });
        }

        mutate({
            id: result.draggableId,
            categoryId: result.destination.droppableId,
            previousCategoryId: result.source.droppableId,
            newPosition: result.destination.index,
            oldPosition: result.source.index,
        });
    };

    return (
        <Flex w="full" pt={150} flexDirection="column" h="full">
            <DragDropContext
                onDragStart={() => setIdDragging(true)}
                onDragEnd={onDragEnd}
            >
                {data?.data.map((category) => (
                    <BookMarkByCategory key={category.id} category={category} />
                ))}
                <Flex
                    my={40}
                    visibility={isDragging ? "visible" : "hidden"}
                    w="full"
                    justifyContent="flex-end"
                >
                    <Droppable direction="horizontal" droppableId="TRASH">
                        {(droppableProvided) => {
                            return (
                                <TrashIcon
                                    isDragging={isDragging}
                                    {...droppableProvided.droppableProps}
                                    ref={droppableProvided.innerRef}
                                />
                            );
                        }}
                    </Droppable>
                </Flex>
            </DragDropContext>
        </Flex>
    );
};

Home.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Home;
