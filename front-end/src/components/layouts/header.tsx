import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

export default function Header(data: { text: string | null }) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let user: any = sessionStorage?.getItem("user");
        setUser(JSON.parse(user));
    });

    return user ? (
        <Text position={"fixed"} fontSize={"3xl"}>
            Olá {user?.name}, {data.text}
        </Text>
    ) : null;
}
