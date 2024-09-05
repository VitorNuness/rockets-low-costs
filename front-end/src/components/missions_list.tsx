import { HStack } from "@chakra-ui/react";
import MissionCard from "./mission_card";

export default function MissionsList(data: { missions: any; rockets: any }) {
    return (
        <HStack
            marginTop={"12vh"}
            paddingRight={"5vh"}
            overflowX={"scroll"}
            position={"absolute"}
            spacing={4}
        >
            {data.missions.map((mission: any) => (
                <MissionCard
                    key={mission.id}
                    mission={mission}
                    rockets={data.rockets}
                />
            ))}
        </HStack>
    );
}
