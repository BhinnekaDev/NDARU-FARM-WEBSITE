import React, { useState } from "react";
import { FaMapMarkedAlt, FaClock, FaAddressBook } from "react-icons/fa";
import "@/app/globals.css";
import useTampilanPengguna from "@/hooks/Frontend/useTampilanPengguna";
import useKirimMasukan from "@/hooks/Backend/useMasukkanKomentar";
import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";
import useVerifikasiLogin from "@/hooks/Backend/useVerifikasiLogin";

function Kontak() {
    const { isLoggedIn } = useVerifikasiLogin();
    const { detailPengguna } = useTampilanPengguna();
    const { kirimMasukan, loading, pesan, setPesan } = useKirimMasukan();

    const handleMasukSaran = async (e) => {
        e.preventDefault();
        await kirimMasukan({
            Nama: detailPengguna?.Nama_Lengkap || "Anonim",
            Email: detailPengguna?.Email || "Tidak Ada Email",
            pesan,
        });
        setPesan("");
    };
    return (
        <div className="mx-10 lg:py-10 z-10 relative flex flex-col lg:flex-row lg:space-x-10 justify-center items-start">
            <div className="flex-1 space-y-10 border-2 border-secondary bg-white rounded-xl px-7 py-12">
                <div className="flex flex-col items-start space-y-3">
                    <Typography variant="h1" className="text-2xl font-bold flex items-center">
                        <FaMapMarkedAlt className="mr-2 text-secondary" /> Alamat Toko
                    </Typography>
                    <Typography variant="paragraph" className="text-base">Jl. Terusan SMP, Batujajar Bar., Kec. Batujajar, Kabupaten Bandung Barat, Jawa Barat 40561</Typography>
                </div>
                <div className="flex flex-col items-start space-y-3">
                    <Typography variant="h1" className="text-2xl font-bold flex items-center">
                        <FaClock className="mr-2 text-secondary" /> Waktu Buka Toko
                    </Typography>
                    <Typography variant="paragraph" className="text-base">Senin - Jumat : 08.00 - 17.00</Typography>
                    <Typography variant="paragraph" className="text-base">Sabtu - Minggu : 08.00 - 15.00</Typography>
                    <Typography variant="paragraph" className="text-base">Online : 24 Jam</Typography>
                </div>
                <div className="flex flex-col items-start space-y-3">
                    <Typography variant="h1" className="text-2xl font-bold flex items-center">
                        <FaAddressBook className="mr-2 text-secondary" /> Kontak Toko
                    </Typography>
                    <Typography variant="paragraph" className="text-base">0882-1599-3129</Typography>
                    <Typography variant="paragraph" className="text-base">chandrasatriana9@gmail.com</Typography>
                </div>
            </div>
            <div className="flex-1 space-y-10 justify-center border-2 border-secondary bg-white rounded-xl my-5 md:my-0 md:px-7 md:py-12">
                <Typography variant="h2" className="text-2xl font-bold text-center text-darkgray my-6">Kirim Masukan</Typography>
                <form className="space-y-4 py-5" onSubmit={handleMasukSaran}>
                    <Input
                        type="text"
                        label="Nama"
                        size="lg"
                        value={detailPengguna.Nama_Lengkap}
                        readOnly
                    />
                    <Input
                        type="email"
                        label="Email"
                        size="lg"
                        value={detailPengguna.Email}
                        readOnly
                    />
                    <Textarea
                        label="Pesan"
                        size="lg"
                        onChange={(e) => setPesan(e.target.value)}
                        required
                    />
                    <div className="text-center w-full">
                        <Button
                            color="green"
                            className="bg-secondary border-2 font-bold text-md py-2 px-32 hover:bg-transparent hover:border-2 hover:border-secondary hover:text-secondary"
                            ripple={true}
                            type="submit"
                            disabled={loading || !isLoggedIn}
                        >
                            {loading ? "Mengirim..." : "Kirim"}
                        </Button>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default Kontak;
