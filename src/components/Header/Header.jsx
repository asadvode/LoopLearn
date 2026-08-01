import React, { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { useCMS } from '../context/CMSContext'
import Marquee from './Marquee'
import NavigationDrawer from './NavigationDrawer'
import './Header.css'

const Header = () => {
  const { isDark, toggleTheme } = useTheme()
  const { user } = useAuth()
  const { cmsData } = useCMS()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      <Marquee announcements={cmsData.announcements} />
      
      <header className="header">
        <div className="header-top">
          {/* Logo & Branding */}
          <div className="logo-section">
            <div className="logo">
              <span className="logo-icon">🎓</span>
            </div>
            <h1 className="brand-title">{cmsData.platformName}</h1>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search by course code (TX-101) or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* Right Actions */}
          <div className="header-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {!user ? (
              <button className="btn-tactile get-started-btn">Get Started</button>
            ) : (
              <div className="user-profile">
                <img
                  src={user.profilePicture || 'https://via.placeholder.com/40'}
                  alt="Profile"
                  className="profile-pic"
                />
                <span className="username">{user.username || user.displayName}</span>
              </div>
            )}

            <button
              className="drawer-toggle"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              title="Open menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Download App Callout */}
        <div className="download-app-callout">
          <button className="download-app-btn">
            ⬇️ Download App
          </button>
          <span className="callout-text">Study offline, sync automatically</span>
        </div>
      </header>

      {/* Navigation Drawer */}
      <NavigationDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}

export default Header
