import { AppColors, AppFont, AppFontSize } from "../theme/AppConstant"
import Image from "next/image"

export default function Home() { 
  return (
    <div className="relative overflow-hidden h-[90vh]">
      <main className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center">
          {/* Text Section */}
          <h1 className="w-[70%] text-center leading-tight"  
          style={{
            fontFamily: AppFont.accent.main,
            fontSize: AppFontSize.primary.main
          }}> BlinkMeet – Instant Calls, Infinite Connections!
          </h1>

          <p className = "font-normal" 
          style={{
            fontSize: AppFontSize.primary.normal, 
          }}> The fastest meetings on the web – blink, connect, and collaborate! ⚡📞
          </p>
          
          {/* Button to Join */}
          <p className="underline mt-[1rem]" style={{
            fontFamily: AppFont.accent.main,
            fontSize: AppFontSize.primary.normal,
            color: AppColors.secondary.main,
          }}>Join
          </p>

        </div>

        {/* Image for display */}
        <Image src='/Images/main.svg' alt="mountain" height={1500} width={1500} className="absolute -bottom-[19rem]">
        </Image>
      </main>
    </div>
  )
}