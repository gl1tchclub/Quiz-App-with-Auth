/**
 * @file CheckAdmin.jsx
 * @module CheckAdmin
 * @description Page component for validating user authorization before navigating to authorized page
 * @author Elizabeth Minty
 */
import { useEffect } from "react";
import { ErrorAlert, AlertComponent } from "../components/Alert";
import { useNavigate } from "react-router-dom";

const CheckAdminPage = () => {
    const isAdmin = localStorage.getItem("userData")?.role === "ADMIN_USER"; // Check if user is admin
    const navigate = useNavigate();

    useEffect(() => {
        if (isAdmin) {
            setTimeout(() => {
                navigate("/seedBasicUsers");
            }, 1500);
        }
    }, [isAdmin, navigate]);

    return (
        <>
            {isAdmin ? (
                <AlertComponent
                    title="Authorization Confirmed"
                    desc="Navigating to seed users page..."
                    style="border-2 border-green-700 w-1/3 bg-transparent shadow-xl mt-10 text-green-800 [&>svg]:text-green-800 [&>svg]:size-7"
                />
            ) : (
                <ErrorAlert desc="Admin Access Only" />
            )}
        </>
    )
}

export default CheckAdminPage;