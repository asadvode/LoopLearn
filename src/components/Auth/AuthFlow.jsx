import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import GoogleLogin from './GoogleLogin'
import ProfileSetup from './ProfileSetup'
import './AuthFlow.css'

const AuthFlow = () => {
  const { user } = useAuth()
  const [showLogin, setShowLogin] = useState(false)
  const [showProfileSetup, setShowProfileSetup] = useState(false)

  const handleLoginSuccess = () => {
    setShowLogin(false)
    if (!user?.registered) {
      setShowProfileSetup(true)
    }
  }

  const handleProfileComplete = () => {
    setShowProfileSetup(false)
  }

  return (
    <>
      {showLogin && (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showProfileSetup && user && (
        <ProfileSetup
          user={user}
          onComplete={handleProfileComplete}
          onClose={() => setShowProfileSetup(false)}
        />
      )}

      {!user && !showLogin && (
        <div className="auth-prompt">
          <button
            className="btn-auth-prompt"
            onClick={() => setShowLogin(true)}
          >
            Get Started
          </button>
        </div>
      )}
    </>
  )
}

export default AuthFlow
