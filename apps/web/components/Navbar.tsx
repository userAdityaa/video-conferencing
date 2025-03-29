import { AppColors, AppFont, AppFontSize } from "../app/theme/AppConstant";

export default function Navbar() { 
    return (
        <header>
            <nav className="flex justify-between items-center px-8 md:px-32 py-4" 
                style={{
                    backgroundColor: AppColors.primary.main, 
                    fontFamily: AppFont.primary.main, 
                }}
            >
                {/* Logo/Brand */}
                <div className="text-xl font-bold tracking-wide opacity-90"
                    style={{
                        fontSize: AppFontSize.primary.header,
                        color: AppColors.primary.contrastText 
                    }}
                >
                    BlinkMeet
                </div>
                
                {/* Navigation Button */}
                <button 
                    className="px-4 py-2 underline transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    style={{ 
                        color: AppColors.secondary.main,
                        fontSize: AppFontSize.primary.normal,
                        letterSpacing: '0.5px'
                    }}
                    aria-label="Join BlinkMeet"
                >
                    Join
                </button>
            </nav>
        </header>
    )
}