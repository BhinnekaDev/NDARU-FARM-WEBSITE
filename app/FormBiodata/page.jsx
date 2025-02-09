"use client"
import FormDaftar from "@/app/FormBiodata/components/FormBiodata";
import toast, { Toaster } from "react-hot-toast";


function FormBiodata() {
    return (
        <div className="position-relative top-0">
            <Toaster position="top-right" reverseOrder={false} />
            <FormDaftar />
        </div>

    );
}

export default FormBiodata;