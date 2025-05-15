'use client'

import { AppColors, AppFont, AppFontSize } from "../theme/AppConstant"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingAnimation from "utils/LoadingAnimation"
import { useAuth } from "context/AuthContext"

const CONTENT = {
  title: "BlinkMeet – Instant Calls, Infinite Connections!",
  subtitle: "The fastest meetings on the web – blink, connect, and collaborate! ⚡📞",
  joinButton: "Join",
  loginPrompt: {
    title: "Login Required",
    message: "You need to login first to Join a meet.",
    cancel: "Cancel"
  }
}

function LoginPromptModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">{CONTENT.loginPrompt.title}</h2>
        <p className="mb-6">{CONTENT.loginPrompt.message}</p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 hover:text-gray-300 bg-red-600 rounded-lg text-white"
            aria-label="Close login prompt"
          >
            {CONTENT.loginPrompt.cancel}
          </button>
        </div>
      </div>
    </div>
  )
}

function HeroContent({ onJoinClick }: { onJoinClick: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="w-[70%] text-center leading-tight text-white"  
        style={{
          fontFamily: AppFont.accent.main,
          fontSize: AppFontSize.primary.main
        }}>
        {CONTENT.title}
      </h1>

      <p className="font-normal text-white" 
        style={{
          fontSize: AppFontSize.primary.normal, 
        }}>
        {CONTENT.subtitle}
      </p>
      
      <button 
        className="underline mt-[1rem]" 
        style={{
          fontFamily: AppFont.accent.main,
          fontSize: AppFontSize.primary.normal,
          color: AppColors.secondary.main,
        }}
        onClick={onJoinClick}
        aria-label="Join meeting"
      >
        {CONTENT.joinButton}
      </button>
    </div>
  )
}

export default function Home() { 
  const [transitionState, setTransitionState] = useState<'idle' | 'fading' | 'loading'>('idle')
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const router = useRouter()
  const { authState } = useAuth(); 

  const handleJoinClick = () => { 
    if(!authState.isAuthenticated) { 
      setShowLoginPrompt(true); 
      return;
    }

    startTransition();
  }

  const startTransition = () => {
    setTransitionState('fading')
    
    setTimeout(() => {
      setTransitionState('loading')
      
      setTimeout(() => {
        router.push('/waiting')
      }, 2000) 
    }, 500) 
  }

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false); 
  }

  if (transitionState === 'loading') {
    return <LoadingScreen />
  }

  return (
    <div className={`relative overflow-hidden h-[90vh] transition-opacity duration-500 ${
      transitionState === 'fading' ? 'opacity-0' : 'opacity-100'
    }`}>
      <main className="flex items-center justify-center h-[50vh]">
        <HeroContent onJoinClick={handleJoinClick} />
        
        <Image 
          src='/Images/main.svg' 
          alt="Decorative background" 
          height={1500} 
          width={1500} 
          className="absolute -bottom-[20rem]"
          priority
        />

        {showLoginPrompt && <LoginPromptModal onClose={closeLoginPrompt} />}
      </main>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#338aff] to-[#7aa3da]">
      <LoadingAnimation />
    </div>
  )
}