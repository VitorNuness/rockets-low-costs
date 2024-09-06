import RocketService from "@/services/RocketService";
import {
    Card,
    CardBody,
    Stack,
    Heading,
    Button,
    Image,
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function MissionCard(data: { mission: any; rockets: any }) {
    const router = useRouter();
    const rocket = data.rockets.find(
        (r: any) => r.rocket_id === data.mission.rocket.rocket_id
    );

    async function openRocketLaunch(rocket: any) {
        await RocketService.saveRocket(rocket).then(() => {
            router.push("/launch");
            router.reload();
        });
    }

    return (
        <Card variant={"outline"}>
            <CardBody>
                <Image
                    src={rocket.flickr_images[0]}
                    alt={rocket.rocket_name}
                    borderRadius="lg"
                    boxSize="xs"
                />
                <Stack mt="6" w={"xs"} spacing="2vh">
                    <Heading size="md">{rocket.rocket_name}</Heading>
                    <Text>{data.mission.mission_name}</Text>
                    <Text>{data.mission.launch_year}</Text>
                </Stack>
                <Button onClick={async () => await openRocketLaunch(rocket)}>
                    Lançar foguete
                </Button>
            </CardBody>
        </Card>
    );
}
