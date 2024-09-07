import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Header(data: {
    beforeUser?: string | null;
    afterUser?: string | null;
}) {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        let user: any = sessionStorage?.getItem("user");
        if (!user) {
            router.push("/auth/login");
            return;
        }

        setUser(JSON.parse(user));
    }, []);

    return user ? (
        <Text position={"fixed"} fontSize={"3xl"}>
            {data.beforeUser} {user?.name}
            {data.afterUser}
        </Text>
    ) : null;
}
