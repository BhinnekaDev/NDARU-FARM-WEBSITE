"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useNavbarAktif = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [navbarAktif, setNavbarAktif] = useState(pathname || "/Beranda");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setNavbarAktif(window.location.pathname);
        }
    }, []);

    const handlenavbarAktif = (path) => {
        setNavbarAktif(path);
        router.push(path);
    };

    return { navbarAktif, handlenavbarAktif };
};

export default useNavbarAktif;
