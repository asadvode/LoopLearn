import React, { useEffect, useState, useRef } from 'react'
import './ShowcaseCards.css'

const ShowcaseCards = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef(null)

  const cards = [
    {
      id: 1,
      icon: '📚',
      title: 'Comprehensive Notes',
      description: 'Access study notes for all textile engineering courses'
    },
    {
      id: 2,
      icon: '🧪',
      title: 'Lab Reports',
      description: 'Detailed lab experiment reports and findings'
    },
    {
      id: 3,
      icon: '💡',
      title: 'Viva Questions',
      description: 'Interactive flashcards for viva preparation'
    },
    {
      id: 4,
      icon: '📅',
      title: 'Syllabus Tracker',
      description: 'Track your course progress with topic checklists'
    }
  ]

  const handleScroll = (e) => {
    setScrollPosition(e.currentTarget.scrollLeft)
  }

  return (
    <section className="showcase-section">
      <div className="showcase-container">
        <h2 className="showcase-title">Why Choose LoopLearn?</h2>
        
        <div
          className="showcase-cards"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {cards.map((card) => (
            <div key={card.id} className="showcase-card card-tactile">
              <div className="card-icon">{card.icon}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShowcaseCards
