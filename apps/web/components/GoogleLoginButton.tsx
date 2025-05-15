'use client'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from "context/AuthContext";

interface GoogleCredentialResponse { 
    credential?: string;
    clientID?: string; 
    select_by?: string;
}

export default function GoogleLoginButton() { 
    const [error, setError] = useState<string | null>(null);
    const { setAuthState } = useAuth();
    const router = useRouter();

    const handleSuccess = async (credentialResponse: GoogleCredentialResponse) => { 
        try { 
            if (!credentialResponse || !credentialResponse.credential) { 
                throw new Error('No credential received');
            }

            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate');
            }

            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('profilePicture', data.user.picture);
            
            setAuthState ({
                isAuthenticated: true, 
                user: data.user, 
                token: data.token
            });
        } catch (error) { 
            setError('Authentication failed. Please try again.');
            console.error('Authentication error:', error);
        } 
    }

    const handleError = () => {
        setError('Google login failed. Please try again.');
    };

    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </GoogleOAuthProvider>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
