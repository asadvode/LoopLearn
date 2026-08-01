import React, { useState } from 'react'
import { useCMS } from '../context/CMSContext'
import './VideoPlayer.css'

const VideoPlayer = () => {
  const { cmsData } = useCMS()
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const defaultVideoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  const videoUrl = cmsData.videoUrl || defaultVideoUrl

  return (
    <div className="video-player-section">
      <div className="video-container">
        {isPlaying ? (
          <iframe
            width="100%"
            height="400"
            src={videoUrl}
            title="LoopLearn Introduction"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-placeholder" onClick={handlePlay}>
            <div className="play-button">▶️</div>
            <p>Click to play introduction video</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
