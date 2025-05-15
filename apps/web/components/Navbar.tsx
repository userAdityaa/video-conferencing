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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "context/AuthContext";

export default function Navbar() {  
    const [picture, setPicture] = useState<string | null>("");
    const router = useRouter();
    const { setAuthState, authState } = useAuth(); 

    useEffect(() => { 
        if(authState.isAuthenticated) { 
            setPicture(authState.user?.picture!);
        }
    }, [authState.isAuthenticated])

    const handleLogOut = () => { 
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('profilePicture');
        setPicture(""); 
        setAuthState ({
            isAuthenticated: false, 
            user: null, 
            token: null
        });
        router.push('/');
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
                            <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <Image 
                                    src={picture} 
                                    alt="profile picture" 
                                    height={40} 
                                    width={40} 
                                    className="rounded-full border-2 border-gray-200 hover:border-blue-400 transition-colors"
                                />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                            className="w-56 bg-white shadow-lg rounded-md p-1 border border-gray-100"
                            align="end"
                        >
                            <DropdownMenuItem 
                                className="flex items-center gap-2 px-4 py-2 text-sm rounded-sm text-gray-400 cursor-not-allowed"
                                disabled
                            >
                                <User className="h-4 w-4" />
                                <span>Profile</span>
                                <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded">Soon</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="flex items-center gap-2 px-4 py-2 text-sm rounded-sm text-gray-400 cursor-not-allowed"
                                disabled
                            >
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                                <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded">Soon</span>
                            </DropdownMenuItem>
                            <div className="border-t border-gray-200 my-1"></div>
                            <DropdownMenuItem 
                                className="flex items-center gap-2 px-4 py-2 text-sm rounded-sm hover:bg-red-50 text-red-600 cursor-pointer"
                                onClick={handleLogOut}
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Log Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
            </nav>
        </header>
    );
}