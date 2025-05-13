'use client'
import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { AppColors, AppFont, AppFontSize } from "../theme/AppConstant";
import GoogleLoginButton from "./GoogleLoginButton";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";

export default function Navbar() {
    const loading = useStore((state) => state.loading);
    const setLoading = useStore((state) => state.setLoading);    
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [picture, setPicture] = useState<string | null>("");

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setPicture(localStorage.getItem('profilePicture'));
        setIsSignedIn(!token);
    }, []);

    const handleLogOut = () => { 
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('profilePicture');
        setPicture(""); 
        router.refresh();
    }
    
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
                

                {picture === null || picture === "" ? 
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
                    : 
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="border-2 rounded-full">
                                <Image src={picture} alt="profile picture" height={35} width={35} className="rounded-full" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 bg-white text-black font-bold px-[0.4rem] rounded-sm">
                            <DropdownMenuLabel>
                                <div className="flex items-center justify-between" onClick={handleLogOut}>
                                    <p>Log Out</p>
                                    <LogOut size={20}/>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </nav>
        </header>
    );
}