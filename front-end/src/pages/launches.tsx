import { useEffect, useState } from "react";
import Header from "@/components/layouts/header";
import Container from "@/components/layouts/container";
import { Center, Spinner } from "@chakra-ui/react";
import LaunchDataService from "@/services/LaunchDataService";
import LaunchesList from "@/components/launches_list";

export default function Home() {
    const [launches, setLaunches] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setLaunches(await LaunchDataService.fetchUserLaunches());
        }
        fetchData();
    }, []);

    return (
        <Container>
            <Header beforeUser={"Olá "} afterUser=", selecione o lançamento" />
            {launches?.length > 0 ? (
                <LaunchesList launches={launches} />
            ) : (
                <Center padding={"200"}>
                    <Spinner size={"xl"} />
                </Center>
            )}
        </Container>
    );
}
