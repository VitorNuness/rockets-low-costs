import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/layouts/header";
import MissionsList from "@/components/missions_list";
import Container from "@/components/layouts/container";
import { Center, Spinner } from "@chakra-ui/react";
import RocketService from "@/services/RocketService";

export default function Home() {
    const router = useRouter();
    const [missions, setMissions] = useState([]);
    const [rockets, setRockets] = useState([]);

    useEffect(() => {
        const user = sessionStorage?.getItem("user");
        if (!user) {
            router.push("auth/login");
            return;
        }

        async function fetchData() {
            setRockets(await RocketService.fetchRockets());
            setMissions(await RocketService.fetchMissions());
        }

        fetchData();
    }, []);

    return (
        <Container>
            <Header text="selecione o lançamento" />
            {missions.length > 0 ? (
                <MissionsList missions={missions} rockets={rockets} />
            ) : (
                <Center padding={"200"}>
                    <Spinner size={"xl"} />
                </Center>
            )}
        </Container>
    );
}
