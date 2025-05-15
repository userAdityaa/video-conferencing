'use client'
import { useState, useEffect, useRef } from 'react';
import { useAuth } from 'context/AuthContext';
import { HashUrlGenerator } from 'utils/HashUrlGenerator';
import { useRouter } from 'next/navigation';

export default function Waiting() {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(true);
  const [copied, setCopied] = useState(false); 
  const [hashUrl, setHashUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();
  const {authState}  = useAuth();

  const popupRef = useRef<HTMLDivElement>(null); 

  const handleMeetJoin = () => { 
    if(hashUrl) { 
      router.push(`/meet/${hashUrl}`);
    }
  }

  useEffect(() => { 
    if(!authState.isAuthenticated) window.location.href = "/";
  }, [])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => { 
    const setHash = async() => { 
      try {
        const hash = await HashUrlGenerator(); 
        setHashUrl(hash.url);
      } catch (error) { 
        console.error(error); 
      }
    }

    setHash();
  }, [])

  const toggleVideo = async () => {
    if (!videoEnabled) {
      await enableVideo();
    } else {
      disableVideo();
    }
  };

  const toggleAudio = async () => {
    if (!audioEnabled) {
      await enableAudio();
    } else {
      disableAudio();
    }
  };

  const handleShareClick = () => { 
    if(hashUrl) { 
      setShowSharePopup(true);
    }
  }

  const copyToClipboard = () => { 
     const url = `${window.location.origin}/meet/${hashUrl}`;
     navigator.clipboard.writeText(url)
     .then(() => { 
      setCopied(true); 
      setTimeout(() => setCopied(false), 2000);
     })
     .catch((err) => { 
      console.error(err);
     })
  }

  const enableVideo = async () => {
    try {
      // Request video permission only
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      if (!streamRef.current) {
        streamRef.current = new MediaStream();
      }

      // Remove any existing video tracks
      streamRef.current.getVideoTracks().forEach(track => track.stop());
      
      // Add new video track
      stream.getVideoTracks().forEach(track => {
        streamRef.current?.addTrack(track);
      });

      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.muted = !audioEnabled; 
      }

      setVideoEnabled(true);
    } catch (err) {
      console.error('Error accessing video:', err);
      alert('Could not access camera');
    }
  };

  const enableAudio = async () => {
    try {
      // Request audio permission only
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      });

      if (!streamRef.current) {
        streamRef.current = new MediaStream();
      }

      streamRef.current.getAudioTracks().forEach(track => track.stop());
      
      // Add new audio track
      stream.getAudioTracks().forEach(track => {
        streamRef.current?.addTrack(track);
      });

      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.muted = false; 
      }

      setAudioEnabled(true);
    } catch (err) {
      console.error('Error accessing audio:', err);
      alert('Could not access microphone');
    }
  };

  const disableVideo = () => {
    if (streamRef.current) {
      const videoTracks = streamRef.current.getVideoTracks();
      videoTracks.forEach(track => track.stop());
      
      if (videoRef.current) {
        if (audioEnabled) {
          videoRef.current.srcObject = new MediaStream(streamRef.current.getAudioTracks());
        } else {
          videoRef.current.srcObject = null;
          streamRef.current = null;
        }
      }
    }
    setVideoEnabled(false);
  };

  const disableAudio = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => track.stop());
      
      if (videoRef.current) {
        // If video is still enabled, keep the stream but without audio
        if (videoEnabled) {
          videoRef.current.srcObject = new MediaStream(streamRef.current.getVideoTracks());
          videoRef.current.muted = true; // Mute since audio is off
        } else {
          videoRef.current.srcObject = null;
          streamRef.current = null;
        }
      }
    }
    setAudioEnabled(false);
  };

  return (
    <div className="h-[82vh] w-[100vw] flex flex-col items-center justify-center">
      <video 
        ref={videoRef}
        autoPlay 
        playsInline 
        muted={!audioEnabled}
        className={`h-[75vh] w-[82.5vw] rounded-lg object-cover ${
          videoEnabled ? 'bg-black' : 'bg-gray-800'
        }`}
      />
      
      <div className="flex space-x-4 bg-gray-100 rounded-full p-2 shadow-md mt-2 items-center justify-between">
        <button 
          onClick={toggleVideo}
          className={`p-2 rounded-full transition relative ${
            videoEnabled 
              ? 'hover:bg-gray-200 text-gray-700' 
              : 'text-red-500 hover:bg-red-100'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
            />
          </svg>
          {!videoEnabled && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
              <div className="h-1 bg-red-500 w-full rotate-45 transform origin-center"></div>
            </div>
          )}
        </button>
        
        <button 
          onClick={toggleAudio}
          className={`p-2 rounded-full transition relative ${
            audioEnabled 
              ? 'hover:bg-gray-200 text-gray-700' 
              : 'text-red-500 hover:bg-red-100'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
            />
          </svg>
          {!audioEnabled && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
              <div className="h-1 bg-red-500 w-full rotate-45 transform origin-center"></div>
            </div>
          )}
        </button>

         <button
          onClick={handleMeetJoin}
          disabled={!hashUrl}
          className={`p-2 px-4 rounded-full transition ${
            hashUrl 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          aria-label="Join meeting"
        >
          <span className="font-medium">Join</span>
        </button>

        <button
        onClick={handleShareClick}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-all"
        aria-label="Share meeting link"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </button>

      {showSharePopup && (
        <div
          ref={popupRef}
          className="fixed bottom-20 right-6 bg-white rounded-lg shadow-xl p-4 w-64 z-50"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-gray-800">Share meeting link</h3>
            <button
              onClick={() => setShowSharePopup(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close share popup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center bg-gray-100 rounded-md p-2 mb-3">
            <span className="text-sm text-gray-600 truncate">
              {`${window.location.origin}/meet/${hashUrl}`}
            </span>
          </div>
          
          <button
            onClick={copyToClipboard}
            className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
              copied ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      )}
      </div>
    </div>
  );
}