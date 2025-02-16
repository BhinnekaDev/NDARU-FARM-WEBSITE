"use client"; // Pastikan hook hanya berjalan di klien
import { useState, useEffect } from "react";

const useNavbar = () => {
    const [navbarBg, setNavbarBg] = useState("bg-transparent");
    const [openPengaturan, setOpenPengaturan] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleScroll = () => {
            setNavbarBg(window.scrollY > 50 ? "bg-secondary" : "bg-transparent");
        };

        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenPengaturan(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        // Panggil sekali untuk mengatur state awal
        handleScroll();
        handleResize();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { navbarBg, openPengaturan, setOpenPengaturan };
};

export default useNavbar;
