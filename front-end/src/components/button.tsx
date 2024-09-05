import { defineStyleConfig } from "@chakra-ui/react";

export const defaultButton = defineStyleConfig({
    variants: {
        solid: {
            width: "100%",
            size: "lg",
            paddingY: 7,
            marginTop: 4,
            bg: "#1D3558",
            color: "#FFFFFF",
            fontSize: "xl",
            fontWeight: 700,
            _hover: {
                bg: "#457B9D",
                _disabled: {
                    bg: "#929292",
                },
            },
            _active: {
                bg: "#457B9D",
            },
            _focus: {
                ring: false,
            },
            _disabled: {
                bg: "#929292",
                cursor: "not-allowed",
            },
        },
    },
});
