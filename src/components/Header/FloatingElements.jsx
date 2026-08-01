import React, { useState, useEffect } from 'react'
import './FloatingElements.css'

const FloatingElements = () => {
  const [showUpArrow, setShowUpArrow] = useState(false)
  const [show3DHub, setShow3DHub] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowUpArrow(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  return (
    <>
      {/* Floating Anchor Point */}
      <button
        className="floating-anchor"
        onClick={showUpArrow ? scrollToTop : scrollToBottom}
        title={showUpArrow ? 'Scroll to top' : 'Scroll to bottom'}
      >
        {showUpArrow ? '⬆️' : '⬇️'}
      </button>

      {/* 3D Messaging Hub */}
      <div
        className="messaging-hub"
        onMouseEnter={() => setShow3DHub(true)}
        onMouseLeave={() => setShow3DHub(false)}
      >
        <div className="hub-toggle">💬</div>
        
        {show3DHub && (
          <div className="hub-contacts">
            <a href="https://messenger.com" target="_blank" rel="noopener noreferrer" className="contact-icon messenger">
              💌
            </a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer" className="contact-icon whatsapp">
              💚
            </a>
            <a href="mailto:support@looplearn.com" className="contact-icon gmail">
              📧
            </a>
          </div>
        )}
      </div>
    </>
  )
}

export default FloatingElements
