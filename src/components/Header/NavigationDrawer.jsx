import React from 'react'
import { Link } from 'react-router-dom'
import { useCMS } from '../context/CMSContext'
import './NavigationDrawer.css'

const NavigationDrawer = ({ isOpen, onClose }) => {
  const { cmsData } = useCMS()

  const handleNavClick = () => {
    onClose()
  }

  return (
    <>
      {isOpen && <div className="drawer-overlay" onClick={onClose} />}
      
      <div className={`navigation-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <nav className="drawer-nav">
          {cmsData.pages.map((page) => (
            <div key={page.id} className="nav-item">
              <Link
                to={page.path}
                className="nav-link"
                onClick={handleNavClick}
              >
                {page.name}
              </Link>
              {page.children && page.children.length > 0 && (
                <div className="nav-submenu">
                  {page.children.map((child) => (
                    <Link
                      key={child.id}
                      to={child.path}
                      className="nav-sublink"
                      onClick={handleNavClick}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="drawer-footer">
          <a href="#admin-login" className="admin-link">Admin Login</a>
        </div>
      </div>
    </>
  )
}

export default NavigationDrawer
