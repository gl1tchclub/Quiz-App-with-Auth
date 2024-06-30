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
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [showButton, setShowButton] = useState(false);

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
                setShowButton(true);
            } catch (error) {
                console.error("Seed users error:", error);
                setMessage("Failed to seed users");
            }
        };

        // Check if user is admin before seeding
        const isAdmin = JSON.parse(localStorage.getItem("userData"))?.role === "ADMIN_USER";
        if (!isAdmin) {
            setMessage("Unauthorized. Admin access required. Returning to user page...");
            // Navigate back to user page after 2 seconds if not admin
            setTimeout(() => {
                navigate("/user");
            }, 2000);
            return;
        }

        seedUsers();
    }, []);

    const handleNavigateBack = () => {
        setTimeout(() => {
            navigate("/user");
        }, 2000);
    };

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

            {/* Render button after seeding is done */}
            {showButton && (
                <div className="flex justify-center mt-4">
                    <Button className="bg-pink-500 hover:bg-pink-200 hover:text-pink-600" onClick={handleNavigateBack(2000)}>
                        Go to User Page
                    </Button>
                </div>
            )}
        </>
    );
};

export default SeedPage;
