import { User as AuthUser } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "../actions/getAuth";


const useAuth = () => {
    const pathname = usePathname();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isFetched, setFetched] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { user } = await getAuth();
            setUser(user);
            setFetched(true);
        };
        fetchUser();
    }, [pathname]);

    return { user, isFetched }
}
export { useAuth }