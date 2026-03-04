'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

declare global {
  interface Window {
    YT: typeof YT
    onYouTubeIframeAPIReady: (() => void) | undefined
  }
}

interface UseYouTubePlayerReturn {
  isReady: boolean
  isPlaying: boolean
  play: () => void
  pause: () => void
  setVolume: (vol: number) => void
  switchVideo: (videoId: string) => void
}

export function useYouTubePlayer(
  containerId: string,
  initialVideoId: string
): UseYouTubePlayerReturn {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const playerRef = useRef<YT.Player | null>(null)
  const containerIdRef = useRef(containerId)
  const initialVideoIdRef = useRef(initialVideoId)

  useEffect(() => {
    // Load YouTube iframe API script if not already loaded
    if (!document.getElementById('yt-iframe-api')) {
      const script = document.createElement('script')
      script.id = 'yt-iframe-api'
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }

    function createPlayer() {
      if (playerRef.current) return

      playerRef.current = new window.YT.Player(containerIdRef.current, {
        videoId: initialVideoIdRef.current,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          loop: 1,
          playlist: initialVideoIdRef.current,
        },
        events: {
          onReady: () => setIsReady(true),
          onStateChange: (event: YT.OnStateChangeEvent) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      createPlayer()
    } else {
      window.onYouTubeIframeAPIReady = createPlayer
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [])

  const play = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      playerRef.current.playVideo()
    }
  }, [])

  const pause = useCallback(() => {
    if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
      playerRef.current.pauseVideo()
    }
  }, [])

  const setVolume = useCallback((vol: number) => {
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      playerRef.current.setVolume(vol)
    }
  }, [])

  const switchVideo = useCallback((videoId: string) => {
    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      playerRef.current.loadVideoById({
        videoId,
        suggestedQuality: 'small',
      })
    }
  }, [])

  return { isReady, isPlaying, play, pause, setVolume, switchVideo }
}
