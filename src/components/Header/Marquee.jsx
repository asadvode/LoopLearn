import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import './Marquee.css'

const Marquee = ({ announcements }) => {
  const [displayText, setDisplayText] = useState('')
  const fullText = announcements.join(' • ')

  useEffect(() => {
    setDisplayText(fullText)
  }, [announcements])

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span className="marquee-text">{displayText}</span>
        <span className="marquee-text">{displayText}</span>
      </div>
    </div>
  )
}

export default Marquee
