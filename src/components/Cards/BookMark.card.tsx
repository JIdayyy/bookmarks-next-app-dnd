import { Box, Flex, Text } from "@chakra-ui/react";
import { BookMark } from "@prisma/client";
import Image from "next/image";
import { Droppable, Draggable } from "react-beautiful-dnd";

type Props = {
    bookMark: BookMark;
    index: number;
};

export default function BookMarkCard({ bookMark, index }: Props): JSX.Element {
    return (
        <Draggable index={index} draggableId={bookMark.id}>
            {(provided) => (
                <a
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    href={bookMark.url}
                    target={"_blank"}
                >
                    <Flex
                        className="white-grad"
                        p={2}
                        justifyContent="space-between"
                        alignItems="center"
                        shadow="md"
                        border="1px solid #0E193C"
                        rounded="md"
                        w={200}
                    >
                        <Text fontSize={12}>{bookMark.title}</Text>
                        <Image
                            objectFit="cover"
                            width={40}
                            height={40}
                            src={bookMark.image_url}
                        />
                    </Flex>
                </a>
            )}
        </Draggable>
    );
}
