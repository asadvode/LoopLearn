import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './GoogleLogin.css'

const GoogleLogin = ({ onSuccess, onClose }) => {
  const { loginWithGoogle, error, loading } = useAuth()
  const [isSimulated, setIsSimulated] = useState(false)

  const handleGoogleLogin = async () => {
    // Simulated Google login for demo
    const mockGoogleUser = {
      email: 'student@gmail.com',
      name: 'Student User',
      picture: 'https://via.placeholder.com/100'
    }

    await loginWithGoogle(mockGoogleUser)
    if (onSuccess) onSuccess()
  }

  const handleDemoLogin = async () => {
    const demoEmails = [
      'test.user@gmail.com',
      'demo+123@gmail.com',
      'sample.student@gmail.com'
    ]

    const mockGoogleUser = {
      email: demoEmails[Math.floor(Math.random() * demoEmails.length)],
      name: 'Demo Student',
      picture: 'https://via.placeholder.com/100'
    }

    await loginWithGoogle(mockGoogleUser)
    if (onSuccess) onSuccess()
  }

  return (
    <div className="google-login-overlay">
      <div className="google-login-modal">
        <button className="close-modal-btn" onClick={onClose}>×</button>
        
        <div className="login-header">
          <h2>Welcome to LoopLearn</h2>
          <p>Sign in with your Gmail to get started</p>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <div className="login-form">
          <button
            className="btn-google"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? '⏳ Signing in...' : '🔐 Sign in with Gmail'}
          </button>

          <div className="divider">
            <span>or try demo</span>
          </div>

          <button
            className="btn-demo"
            onClick={handleDemoLogin}
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '🧪 Demo Login'}
          </button>
        </div>

        <div className="login-info">
          <p>📧 <strong>Gmail Only:</strong> We strictly use Gmail accounts for authentication.</p>
          <p>🔒 <strong>No Aliases:</strong> Email aliases (e.g., john.doe@gmail.com and johndoe@gmail.com) are treated as the same account.</p>
          <p>✅ <strong>Secure:</strong> Your data is encrypted and never shared with third parties.</p>
        </div>
      </div>
    </div>
  )
}

export default GoogleLogin
