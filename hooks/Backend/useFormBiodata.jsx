import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { firestore } from "@/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";
import { formatNoIdentitas } from "@/utils/utilsNoIdentitas";
import { formatNama } from "@/utils/utilsNama";
import { formatNoTelepon } from "@/utils/utilsNoTelepon";
import { formatAlamat } from "@/utils/utilsAlamat";

const useSubmitBiodata = () => {
    const pengarah = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        NIK: "",
        Nama_Lengkap: "",
        No_Telepon: "",
        Jenis_Kelamin: null,
        Tanggal_Lahir: null,
        Alamat: "",
        Nama_Lengkap_Penerima: "",
        Alamat_Penerima: "",
        No_Telepon_Penerima: "",
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;

        let formattedValue = value;
        if (name === "NIK") {
            formattedValue = formatNoIdentitas(value);
        } else if (["Nama_Lengkap", "Nama_Lengkap_Penerima"].includes(name)) {
            formattedValue = formatNama(value);
        } else if (["No_Telepon", "No_Telepon_Penerima"].includes(name)) {
            formattedValue = formatNoTelepon(value);
        } else if (name === "Alamat" || name === "Alamat_Penerima") {
            formattedValue = formatAlamat(value);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    }, []);

    const isFormDataValid = () => {
        for (const key in formData) {
            if (!formData[key].trim()) {
                toast.error(`Harap isi ${key.replace(/_/g, " ")}`);
                return false;
            } else if (!formData.Jenis_Kelamin) {
                toast.error("Pilih Jenis Kelamin");
                return false;
            } else if (!formData.Tanggal_Lahir) {
                toast.error("Pilih Tanggal Lahir");
                return false;
            }
        }

        return true;
    };

    const submitBiodata = async (penggunaID) => {
        if (!isFormDataValid()) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                throw new Error("User is not authenticated");
            }

            const email = user.email;
            const userRef = doc(firestore, "pengguna", penggunaID);

            await setDoc(userRef, {
                ...formData,
                Kelengkapan_Data_Profile: true,
                Pembuatan_Akun: new Date(),
                Email: email,
            });

            toast.success("Data Anda Berhasil Disimpan.");
            pengarah.push("/Beranda");
        } catch (err) {
            setError(err);
            toast.error("Gagal menyimpan biodata. Silakan coba lagi.");
            console.error("Error saving biodata:", err);
        } finally {
            setIsLoading(false);
        }
    };


    return {
        submitBiodata,
        isLoading,
        error,
        formData,
        handleInputChange,
    };
};

export default useSubmitBiodata;
