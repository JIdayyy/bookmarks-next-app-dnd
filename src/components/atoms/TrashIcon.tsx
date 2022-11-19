import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { CustomDomComponent, motion } from "framer-motion";
import { forwardRef } from "react";
import { FaTrashAlt } from "react-icons/fa";

const MotionFlex: CustomDomComponent<FlexProps> = motion(Flex);

const TrashIcon = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
    const { isDragging } = props;
    return (
        <MotionFlex
            ref={ref}
            whileHover={{ scale: 1.5 }}
            border="3px dotted #153a71"
            className="white-grad"
            rounded="full"
            p={5}
        >
            <Icon color="white" as={FaTrashAlt} size={10} />
        </MotionFlex>
    );
});

export default TrashIcon;
