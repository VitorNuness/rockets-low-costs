import { useEffect, useState } from "react";
import Header from "@/components/layouts/header";
import MissionsList from "@/components/missions_list";
import Container from "@/components/layouts/container";
import { Center, Spinner } from "@chakra-ui/react";
import RocketService from "@/services/RocketService";
import MissionDataService from "@/services/MissionDataService";

export default function Home() {
    const [missions, setMissions] = useState([]);
    const [rockets, setRockets] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setRockets(await RocketService.fetchRockets());
            setMissions(await MissionDataService.fetchUserLaunchMissions());
        }

        fetchData();
    }, []);

    return (
        <Container>
            <Header beforeUser={"Olá "} afterUser=", selecione o lançamento" />
            {missions?.length > 0 ? (
                <MissionsList missions={missions} rockets={rockets} />
            ) : (
                <Center padding={"200"}>
                    <Spinner size={"xl"} />
                </Center>
            )}
        </Container>
    );
}
