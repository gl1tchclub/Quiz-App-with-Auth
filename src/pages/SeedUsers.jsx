/**
 * @file SeedUsers.jsx
 * @module SeedUsers
 * @description Page component for seeding basic users from API endpoint
 * @author Elizabeth Minty
 */
import { useEffect, useState } from "react";
import { AlertComponent, ErrorAlert } from "../components/Alert";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SeedPage = () => {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const seedUsers = async () => {
            try {
                const response = await fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/seedBasicUsers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to seed users");
                }
                setMessage("Users seeded successfully!");
            } catch (error) {
                console.error("Seed users error:", error);
                setMessage("Failed to seed users");
            }
        };

        // Check if user is admin before seeding
        const isAdmin = JSON.parse(localStorage.getItem("userData"))?.role === "ADMIN_USER";
        if (isAdmin) {
            seedUsers();
        } else {
            setMessage("Unauthorized. Admin access required.");
        }
    }, []);

    return (
        <>
            {message === "Users seeded successfully!" ? (
                <AlertComponent
                    title="Success"
                    desc={message}
                    style="border-2 border-green-700 w-1/3 bg-transparent shadow-xl mt-10 text-green-800 [&>svg]:text-green-800 [&>svg]:size-7"
                />
            ) : (
                <ErrorAlert desc={message} />
            )}
        </>
    );
};

export default SeedPage;
