import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './ResourceCard.css'

const ResourceCard = ({ resource, type = 'note' }) => {
  const { user } = useAuth()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [userRating, setUserRating] = useState(0)

  const handleDownload = () => {
    if (!user) {
      alert('Please sign in to download resources')
      return
    }
    alert(`Downloading: ${resource.title}`)
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  return (
    <div className="resource-card card-tactile">
      {/* Header */}
      <div className="card-header">
        <h3 className="resource-title">{resource.title}</h3>
        <button
          className={`bookmark-btn ${bookmarked ? 'active' : ''}`}
          onClick={handleBookmark}
          title="Add to bookmarks"
        >
          🔖
        </button>
      </div>

      {/* Author */}
      <div className="resource-author">
        <span className="author-label">By:</span>
        <span className="author-name">@{resource.author}</span>
      </div>

      {/* Description */}
      <details className="resource-description-details">
        <summary className="description-summary">📝 Description</summary>
        <p className="resource-description">{resource.description}</p>
      </details>

      {/* Rating */}
      <div className="resource-rating">
        <div className="stars">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={`star ${star <= Math.round(resource.rating) ? 'filled' : ''}`}
            >
              ⭐
            </span>
          ))}
        </div>
        <span className="rating-text">({resource.reviews})</span>
      </div>

      {/* Stats */}
      <div className="resource-stats">
        <div className="stat">
          <span>👁️</span>
          <span>{resource.downloads}</span>
        </div>
        <div className="stat">
          <span>👍</span>
          <span>{resource.likes}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="card-actions">
        <button
          className="btn-download"
          onClick={handleDownload}
        >
          ⬇️ Download
        </button>
        <button
          className={`btn-like ${liked ? 'active' : ''}`}
          onClick={handleLike}
        >
          {liked ? '💖 Liked' : '🤍 Like'}
        </button>
      </div>
    </div>
  )
}

export default ResourceCard
