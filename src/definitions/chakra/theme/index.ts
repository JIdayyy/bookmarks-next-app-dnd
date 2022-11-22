import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";

import colors from "./foundations/colors";

import fontSizes from "./foundations/fontSizes";

const overrides = {
    ...styles,
    colors,
    fontSizes,
};

const theme = extendTheme(overrides);

export default theme;
