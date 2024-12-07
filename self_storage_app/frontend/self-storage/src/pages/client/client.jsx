// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import Nav from "@/components/nav/nav.jsx";
import {StorageUnits} from "@/components/storageUnits/storageUnits.jsx";

export default function ClientPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Safely extract user data from location state
    const { user } = location.state || {};
    // eslint-disable-next-line no-unused-vars
    const { id, username, signInDetails } = user || {};

    useEffect(() => {
        // If no user is found, redirect to home
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // If no user, return null to prevent rendering
    if (!user) {
        return null;
    }

    return (<>
        <div className="min-h-dvh w-dvw text-black bg-gray-100 absolute top-0 left-0">
            <Nav handleLogout={handleSignOut}/>
            <div className="w-4/5 mx-auto bg-transparent p-2 mt-2">
                <h4 className="text-xl font-medium mb-4 text-amber-400">Hello, <span className={"italic"}>{user.signInDetails.loginId.split("@")[0]}</span>, you are a client.</h4>

                <StorageUnits />
            </div>
        </div>
    </>
    );
}