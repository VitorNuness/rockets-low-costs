import { HStack } from "@chakra-ui/react";
import LaunchCard from "./launch_card";

export default function LaunchesList(data: { launches: any }) {
    return (
        <HStack
            marginTop={"12vh"}
            paddingRight={"5vh"}
            overflowX={"scroll"}
            position={"absolute"}
            spacing={4}
        >
            {data.launches.map((launch: any) => (
                <LaunchCard launch={launch} />
            ))}
        </HStack>
    );
}
