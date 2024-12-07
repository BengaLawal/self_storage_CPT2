import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';

export default function ClientPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract user from location state
    const { user } = location.state || {};

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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
                <h3 className="text-xl mb-6">Hello, {user.username}</h3>

                <button
                    onClick={handleSignOut}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}