'use client'

import { useStore } from "../store/store";
import { AppColors, AppFont, AppFontSize } from "../theme/AppConstant";
import GoogleLoginButton from "./GoogleLoginButton";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);
    const router = useRouter();
    
    return (
        <header>
            <nav 
                className="flex justify-between items-center px-8 md:px-32 py-4 bg-transparent"
            >
                <a 
                    href="/" 
                    className="text-xl font-bold tracking-wide opacity-90"
                    style={{
                        fontFamily: AppFont.accent.main, 
                        fontSize: AppFontSize.primary.header,
                        color: AppColors.primary.contrastText,
                        letterSpacing: '1px'
                    }}
                >
                    BlinkMeet
                </a>
                
                <button 
                    className="px-4 py-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-1"
                    style={{ 
                        fontFamily: AppFont.accent.main,
                        color: AppColors.secondary.main,
                        fontSize: AppFontSize.primary.normal,
                        letterSpacing: '0.5px'
                    }}
                    role="button"
                    aria-label="Login"
                >
                    <span className="underline">
                        <GoogleLoginButton/>
                    </span>
                </button>
            </nav>
        </header>
    );
}