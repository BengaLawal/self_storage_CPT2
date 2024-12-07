import { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import checkAdminStatus from './api.jsx'; // Import your admin-checking function

export default function HandleAuthStateChange() {
    const { user } = useAuthenticator((context) => [context.user]); // Get the authenticated user
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAndNavigate() {
            if (user) {
                try {
                    const isAdmin = await checkAdminStatus(user.userId); // Check if the user is an admin

                    if (isAdmin) {
                        navigate('/dashboard', {
                            state: { user: { id: user.userId, username: user.username, signInDetails:user.signInDetails } }
                        });
                    } else {
                        navigate('/client', {
                            state: { user: { id: user.userId, username: user.username, signInDetails:user.signInDetails } }
                        });
                    }
                } catch (error) {
                    console.error('Error checking user role:', error);
                    navigate('/error'); // Navigate to an error page if needed
                }
            }
        }

        checkAndNavigate();
    }, [user, navigate]); // Dependencies ensure this runs when `user` or `navigate` changes

    return null; // This component is only for logic, no UI
}
