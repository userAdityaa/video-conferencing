'use client'
import dynamic from "next/dynamic"
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import loadingAnimation from '../public/animations/instant_meet_loader.json'

export default function LoadingAnimation() { 
    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <Lottie
                    animationData={loadingAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ 
                        width: 350, 
                        height: 350,
                        willChange: 'transform'
                    }}
                />
        </div>
    )
}