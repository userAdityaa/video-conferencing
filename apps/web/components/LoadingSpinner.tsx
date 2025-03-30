'use client'
import dynamic from "next/dynamic"
const Lottie = dynamic(() => import('lottie-react'), {ssr: false})
import loadingAnimation from '../public/animations/loader.json'

export default function LoadingAnimation() { 
    return (
        <Lottie
            animationData={loadingAnimation}
            loop = {true}
            autoplay = {true}
            style={{ width: 350, height: 350 }}
        />
    )
}