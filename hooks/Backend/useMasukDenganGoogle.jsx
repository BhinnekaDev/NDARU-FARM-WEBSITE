import { auth, firestore } from "@/lib/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";

const useMasukDenganGoogle = () => {
    const pengarah = useRouter();
    const [sedangMemuatMasukDenganGoogle, setSedangMemuatMasukDenganGoogle] = useState(false);

    const masukDenganGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({
            prompt: "select_account",
        });

        try {
            setSedangMemuatMasukDenganGoogle(true);
            const hasil = await signInWithPopup(auth, googleProvider);
            const penggunaSaatIni = hasil.user;

            if (typeof window !== "undefined") {
                localStorage.setItem("ID", penggunaSaatIni.uid);
            }

            toast.success("Selamat datang di Ndaru Farm!");

            const id = penggunaSaatIni.uid;
            const docRefpenggunaSaatIni = doc(firestore, "pengguna", id);
            const docSnap = await getDoc(docRefpenggunaSaatIni);

            pengarah.push(docSnap.exists() ? "/Beranda" : "/FormBiodata");
        } catch (error) {
            console.error("Login dengan Google gagal:", error);
            toast.error(`Gagal masuk dengan Google: ${error.message}`);
        } finally {
            setSedangMemuatMasukDenganGoogle(false);
        }
    };

    return {
        masukDenganGoogle,
        sedangMemuatMasukDenganGoogle,
    };
};

export default useMasukDenganGoogle;
