import { useState } from "react";
import { firestore, storage } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";
import { doc, updateDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const useKirimBuktiTransaksi = () => {
    const [memuatKirim, setMemuatKirim] = useState(false);
    const [errorKirim, setErrorKirim] = useState(null);

    const kirimBuktiTransaksi = async (ID_Transaksi, ID_Pemesanan, fileBukti) => {
        setMemuatKirim(true);
        setErrorKirim(null);

        try {
            // Validasi format file
            const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
            if (!allowedFormats.includes(fileBukti.type)) {
                toast.error("Format file tidak didukung. Harap unggah file dalam format JPEG, JPG, PNG, atau PDF.");
                return;
            }

            const transaksiRef = doc(firestore, "transaksi", ID_Transaksi);
            const transaksiSnap = await getDoc(transaksiRef);

            if (!transaksiSnap.exists()) {
                toast.error(`Transaksi dengan ID ${ID_Transaksi} tidak ditemukan.`);
                return;
            }

            const fileExt = fileBukti.name.split(".").pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const storageRef = ref(storage, `Bukti_Transaksi/${ID_Transaksi}/${fileName}`);
            await uploadBytes(storageRef, fileBukti);
            const fileUrl = await getDownloadURL(storageRef);

            await updateDoc(transaksiRef, {
                Bukti_Transaksi: fileUrl,
                Status_Pembayaran: "Lunas",
                Tanggal_Pembayaran: new Date().toISOString(),
            });

            const pengirimanRef = collection(firestore, "pengiriman");
            const newPengiriman = {
                Status_Pengiriman: "Sedang Dikirim",
                Tanggal_Pengiriman: new Date().toISOString(),
            };

            const newPengirimanDocRef = await addDoc(pengirimanRef, newPengiriman);
            const pengirimanId = newPengirimanDocRef.id;

            const pemesananRef = doc(firestore, "pemesanan", ID_Pemesanan);
            await updateDoc(pemesananRef, {
                ID_Pengiriman: pengirimanId,
            });

            toast.success("Bukti transaksi berhasil dikirim dan status pembayaran diperbarui.");
            window.location.reload();
        } catch (error) {
            console.error("Gagal mengirim bukti transaksi:", error);
            setErrorKirim(error.message);
            toast.error(error.message);
        } finally {
            setMemuatKirim(false);
        }
    };

    return {
        memuatKirim,
        errorKirim,
        kirimBuktiTransaksi,
    };
};

export default useKirimBuktiTransaksi;
