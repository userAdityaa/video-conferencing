'use client'

import { AppColors, AppFont, AppFontSize } from "../theme/AppConstant"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingAnimation from "utils/LoadingAnimation"

export default function Home() { 
  const [transitionState, setTransitionState] = useState('idle')
  const router = useRouter()

  const handleJoinClick = () => { 
    setTransitionState('fading')
    
    setTimeout(() => {
      setTransitionState('loading')
      
      setTimeout(() => {
        router.push('/home')
      }, 2000) 
    }, 500) 
  }

  if (transitionState === 'loading') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#338aff] to-[#7aa3da]">
        <LoadingAnimation />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden h-[90vh] transition-opacity duration-500 ${
      transitionState === 'fading' ? 'opacity-0' : 'opacity-100'
    }`}>
      <main className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center">
          {/* Text Section */}
          <h1 className="w-[70%] text-center leading-tight text-white"  
          style={{
            fontFamily: AppFont.accent.main,
            fontSize: AppFontSize.primary.main
          }}> BlinkMeet – Instant Calls, Infinite Connections!
          </h1>

          <p className="font-normal text-white" 
          style={{
            fontSize: AppFontSize.primary.normal, 
          }}> The fastest meetings on the web – blink, connect, and collaborate! ⚡📞
          </p>
          
          {/* Button to Join */}
          <button 
            className="underline mt-[1rem]" 
            style={{
              fontFamily: AppFont.accent.main,
              fontSize: AppFontSize.primary.normal,
              color: AppColors.secondary.main,
            }}
            onClick={handleJoinClick}
            disabled={transitionState !== 'idle'}
          >
            Join
          </button>
        </div>

        {/* Image for display */}
        <Image 
          src='/Images/main.svg' 
          alt="mountain" 
          height={1500} 
          width={1500} 
          className="absolute -bottom-[19rem]"
        />
      </main>
    </div>
  )
}