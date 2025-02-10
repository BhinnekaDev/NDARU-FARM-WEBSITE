import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useSubmitBiodata from "@/hooks/Backend/useFormBiodata";


function Stepper({ activeStep, steps }) {
    return (
        <div className="flex items-center mb-6">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center mx-auto mb-5">
                    <div
                        className={`rounded-full w-8 h-8 flex items-center justify-center text-black font-bold border border-white ${activeStep >= index
                            ? "bg-white"
                            : "bg-blue-gray-300"
                            }`}
                    >
                        {index + 1}
                    </div>
                    {index < steps.length - 1 && <div className="w-8 h-[2px] bg-gray-300 mx-2" />}
                </div>
            ))}
        </div>
    );
}

export default function FormBiodataPengguna() {
    const router = useRouter();
    const { submitBiodata, formData, handleInputChange } = useSubmitBiodata();
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const steps = ["Data Diri", "Data Penerima"];

    const handleNextStep = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePreviousStep = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        const penggunaID = localStorage.getItem("ID");
        if (!penggunaID) {
            toast.error("Pengguna ID tidak ditemukan. Silakan login terlebih dahulu.");
            return;
        }
        try {
            const success = await submitBiodata(penggunaID);
            if (success) {
                router.push("/Beranda");
            }
        } catch (error) {
            toast.error("Gagal menyimpan biodata. Silakan coba lagi.");
        }
    };


    return (
        <div className="max-w-xl mx-auto p-5 mt-2 bg-light-green-600 rounded-xl shadow-lg">
            <Stepper activeStep={activeStep} steps={steps} />
            {activeStep === 0 && (
                <div className="bg-white p-3 rounded-xl bg-opacity-20">
                    <h2 className="text-xl text-black font-bold mb-3">Data Diri</h2>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">NIK</label>
                        <input
                            type="text"
                            name="NIK"
                            value={formData.NIK}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Nama Lengkap</label>
                        <input
                            type="text"
                            name="Nama_Lengkap"
                            value={formData.Nama_Lengkap}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Jenis Kelamin</label>
                        <label className="mr-4">
                            <input
                                type="radio"
                                name="Jenis_Kelamin"
                                value="Laki-laki"
                                checked={formData.Jenis_Kelamin === "Laki-laki"}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Laki-laki
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="Jenis_Kelamin"
                                value="Perempuan"
                                checked={formData.Jenis_Kelamin === "Perempuan"}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            Perempuan
                        </label>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Tanggal Lahir</label>
                        <input
                            type="date"
                            name="Tanggal_Lahir"
                            value={formData.Tanggal_Lahir}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4 ">
                        <label className="block mb-1 text-black">No. Telepon</label>
                        <input
                            type="text"
                            name="No_Telepon"
                            value={formData.No_Telepon}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-black">Alamat Lengkap</label>
                        <textarea
                            type="text"
                            name="Alamat"
                            value={formData.Alamat}
                            onChange={handleInputChange}
                            className="w-full border h-32 p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                </div>
            )}

            {activeStep === 1 && (
                <div>
                    <h2 className="text-xl font-bold mb-4 text-white">Data Penerima</h2>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">Nama Lengkap Penerima</label>
                        <input
                            type="text"
                            name="Nama_Lengkap_Penerima"
                            value={formData.Nama_Lengkap_Penerima}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">Alamat Lengkap Penerima</label>
                        <textarea
                            type="text"
                            name="Alamat_Penerima"
                            value={formData.Alamat_Penerima}
                            onChange={handleInputChange}
                            className="w-full border h-32 p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-white">No. Telepon Penerima</label>
                        <input
                            type="text"
                            name="No_Telepon_Penerima"
                            value={formData.No_Telepon_Penerima}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded-lg bg-opacity-85 bg-white"
                            required
                        />
                    </div>
                </div>
            )}
            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded-lg bg-opacity-85 bg-white hover:bg-blue-gray-800 hover:bg-opacity-50 hover:text-white"
                    onClick={handlePreviousStep}
                    disabled={activeStep === 0 || isLoading}
                >
                    Sebelumnya
                </button>
                <button
                    type="button"
                    className="bg-yellow-600 text-black px-4 py-2 rounded-lg hover:bg-blue-gray-800 hover:bg-opacity-50 hover:text-white"
                    onClick={handleNextStep}
                    disabled={isLoading}
                >
                    {activeStep === steps.length - 1 ? "Simpan" : "Selanjutnya"}
                </button>
            </div>
        </div>
    );
}
