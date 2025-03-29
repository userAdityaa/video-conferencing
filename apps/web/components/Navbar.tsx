import { AppColors, AppFontSize } from "../theme/AppConstant";

export default function Navbar() { 
    return (
        <header>
            <nav 
                className="flex justify-between items-center px-8 md:px-32 py-4 bg-transparent font-[AppFont.primary.main]"
            >
                {/* Logo/Brand */}
                <a 
                    href="/" 
                    className="text-xl font-bold tracking-wide opacity-90"
                    style={{
                        fontSize: AppFontSize.primary.header,
                        color: AppColors.primary.contrastText,
                        letterSpacing: '1px'
                    }}
                >
                    BlinkMeet
                </a>
                
                {/* Navigation Button */}
                <button 
                    className="px-4 py-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-1"
                    style={{ 
                        color: AppColors.secondary.main,
                        fontSize: AppFontSize.primary.normal,
                        letterSpacing: '0.5px'
                    }}
                    role="button"
                    aria-label="Join BlinkMeet"
                >
                    <span className="underline">Join</span>
                </button>
            </nav>
        </header>
    );
}
