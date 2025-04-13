'use client'
import dynamic from "next/dynamic"
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import loadingAnimation from '../public/animations/loader.json'

export default function LoadingAnimation() { 
    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="animate-rocket-launch">
                <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ 
                        width: 350, 
                        height: 350,
                        willChange: 'transform' // Optimizes performance
                    }}
                />
            </div>
        </div>
    )
}