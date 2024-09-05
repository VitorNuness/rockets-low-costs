import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    ListItem,
    UnorderedList,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export function Error({
    title,
    description,
    isVisible = false,
}: {
    title: string;
    description: string[];
    isVisible: boolean;
}) {
    const errorsList: ReactNode = description?.map((value, index) => (
        <ListItem key={index}>{value}</ListItem>
    ));

    return isVisible ? (
        <Alert
            status="error"
            position={"absolute"}
            top={4}
            right={4}
            width={"auto"}
            flex={1}
            alignItems={"start"}
            rounded={"2%"}
            paddingX={8}
            boxShadow={"md"}
        >
            <Box>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    <UnorderedList>{errorsList}</UnorderedList>
                </AlertDescription>
            </Box>
            <AlertIcon />
        </Alert>
    ) : null;
}
