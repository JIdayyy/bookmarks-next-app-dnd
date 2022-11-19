import { ComponentStyleConfig } from "@chakra-ui/react";

const Input: ComponentStyleConfig = {
    variants: {
        solid: (props) => ({
            color: props.colorMode === "dark" ? "white" : "white",
            fontWeight: "bold",
            bg: props.colorMode === "dark" ? "gray.700" : "gray.200",
        }),
        default: (props) => ({
            color: props.colorMode === "dark" ? "white" : "white",
            fontWeight: "bold",
            _hover: {
                bg: "gray.200",
            },
            _placeholder: {
                color: props.colorMode === "dark" ? "white" : "white",
            },
        }),
    },
};

export default Input;
