import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, firestore } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

const useVerifyLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pengguna, setPengguna] = useState(null);
    const [error, setError] = useState(null);
    const pengarah = useRouter();

    useEffect(() => {
        const checkUserInFirestore = async (ID) => {
            try {
                const userRef = doc(firestore, "pengguna", ID);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    setPengguna(userSnap.data());
                    setIsLoggedIn(true);
                } else {
                    setPengguna(null);
                    setIsLoggedIn(false);
                }
            } catch (err) {
                setError(err);
                toast.error("Terjadi kesalahan saat memverifikasi pengguna.");
            } finally {
                setLoading(false);
            }
        };

        const storedID = localStorage.getItem("ID");
        if (storedID) {
            checkUserInFirestore(storedID);
        } else {
            setLoading(false);
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                localStorage.setItem("ID", currentUser.uid);
                checkUserInFirestore(currentUser.uid);
            } else {
                localStorage.removeItem("ID");
                setPengguna(null);
                setIsLoggedIn(false);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const cekLoginPengguna = () => {
        if (!isLoggedIn) {
            setTimeout(() => pengarah.push("/Login"), 0);
            toast.error("Anda belum masuk. Silakan login terlebih dahulu.");
            return;
        }
    };

    return {
        isLoggedIn,
        loading,
        pengguna,
        error,
        cekLoginPengguna,
    };
};

export default useVerifyLogin;
