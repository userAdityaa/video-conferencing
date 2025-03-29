import { AppColors, AppFont, AppFontSize } from "../theme/AppConstant";

export default function Navbar() { 
    return (
        <header>
            <nav 
                className="flex justify-between items-center px-8 md:px-32 py-4 bg-transparent"
            >
                {/* Logo/Brand - Using Black Han Sans */}
                <a 
                    href="/" 
                    className="text-xl font-bold tracking-wide opacity-90"
                    style={{
                        fontFamily: AppFont.accent.main, // Black Han Sans
                        fontSize: AppFontSize.primary.header,
                        color: AppColors.primary.contrastText,
                        letterSpacing: '1px'
                    }}
                >
                    BlinkMeet
                </a>
                
                {/* Navigation Button - Using Black Han Sans */}
                <button 
                    className="px-4 py-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-1"
                    style={{ 
                        fontFamily: AppFont.accent.main, // Black Han Sans
                        color: AppColors.secondary.main,
                        fontSize: AppFontSize.primary.normal,
                        letterSpacing: '0.5px'
                    }}
                    role="button"
                    aria-label="Login"
                >
                    <span className="underline">Login</span>
                </button>
            </nav>
        </header>
    );
}