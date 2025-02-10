"use client"
import { useEffect } from "react";
import Navigation from "@/components/Navbar";
import HeaderSetting from "@/components/HeaderSection"
import Setting from "@/app/ProfileSetting/components/ProfileSetting";
import Footer from "@/components/Footer";
import verifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";

function Produk() {
    const { isLoggedIn, loading, cekLoginPengguna } = verifikasiLogin();

    useEffect(() => {
        if (!loading) {
            cekLoginPengguna();
        }
    }, [loading]);

    if (loading) {
        return <p>Memeriksa status login...</p>;
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="position-relative top-0">
            <Navigation />
            <HeaderSetting />
            <Setting />
            <Footer />
        </div>
    );
}

export default Produk;