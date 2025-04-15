import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface GoogleCredentialResponse { 
    credential?: string;
    clientID?: string; 
    select_by?: string;
}

export default function GoogleLoginButton() { 
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSuccess = async (credentialResponse: GoogleCredentialResponse) => { 
        try { 
            if(!credentialResponse) { 
                throw new Error('No credential received');
            }

            const response = await axios.post('/api/auth/google', { 
                token: credentialResponse.credential
            })

            localStorage.setItem('authToken', response.data.token);

            router.push('/meet');
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