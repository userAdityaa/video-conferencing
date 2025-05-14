'use client'
import { useState, useEffect, useRef } from 'react';
import { useAuth } from 'context/AuthContext';

export default function Waiting() {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const {authState}  = useAuth();

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

  const enableVideo = async () => {
    try {
      // Request video permission only
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      });

      // Create new stream or add to existing one
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
        videoRef.current.muted = !audioEnabled; // Mute if audio is disabled
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

      // Create new stream or add to existing one
      if (!streamRef.current) {
        streamRef.current = new MediaStream();
      }

      // Remove any existing audio tracks
      streamRef.current.getAudioTracks().forEach(track => track.stop());
      
      // Add new audio track
      stream.getAudioTracks().forEach(track => {
        streamRef.current?.addTrack(track);
      });

      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.muted = false; // Unmute when audio is enabled
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
        // If audio is still enabled, keep the stream but without video
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
        className={`h-[70vh] w-[70vw] rounded-lg object-cover ${
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
      </div>
    </div>
  );
}