"use client"
import TemplateLogin from "@/app/Login/components/Login";
import { Toaster } from 'react-hot-toast';


function Login() {
    return (
        <div className="position-relative top-0">
            <Toaster position="top-right" reverseOrder={false} />
            <TemplateLogin />
        </div>

    );
}

export default Login;