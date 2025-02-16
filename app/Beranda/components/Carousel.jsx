"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Carousel, IconButton, Typography } from "@/app/MTailwind";
import { TbArrowBigLeftLines, TbArrowBigRightLines } from "react-icons/tb";

function CarouselSection() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Memuat gambar hanya di klien untuk menghindari hydration error
        import("@/assets/img/Slider/1.jpg").then((img1) => {
            import("@/assets/img/Slider/2.webp").then((img2) => {
                import("@/assets/img/Slider/3.jpg").then((img3) => {
                    setImages([img1.default, img2.default, img3.default]);
                });
            });
        });
    }, []);

    if (images.length === 0) {
        return <div className="h-screen w-full bg-gray-200 animate-pulse"></div>;
    }

    return (
        <Carousel transition={{ duration: 2 }} className="rounded-none z-10 relative top-0 ">
            {images.map((src, index) => (
                <div key={index} className="relative">
                    <Image
                        src={src}
                        alt={`Slider ${index + 1}`}
                        className="h-screen w-full object-cover brightness-50"
                        priority
                    />
                    <div className="absolute top-1/2 right-0 transform -translate-y-1/2 me-2 lg:me-36 p-4 text-white text-xl font-bold">
                        <div className="uppercase text-center lg:text-end tracking-widest px-10 lg:px-0">
                            <Typography variant="h3" className="text-base lg:text-xl text-primary uppercase">
                                {index === 0 && "Penjualan besar sedang berlangsung"}
                                {index === 1 && "Kita hadir dengan inovasi dan update terbaru"}
                                {index === 2 && "Kami hadir kembali untuk memenuhi kebutuhan kalian semua"}
                            </Typography>
                            <Typography variant="h1" className="text-3xl lg:text-9xl text-white uppercase">
                                {index === 0 && "Dapatkan Diskon"} {index === 1 && "E-Mart Ndaru Farm"} {index === 2 && "Ndaru Farm Hadir Kembali"}
                            </Typography>
                        </div>
                    </div>
                </div>
            ))}
        </Carousel>
    );
}

export default CarouselSection;
