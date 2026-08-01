import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const normalizeEmail = (email) => {
    const [username, domain] = email.split('@')
    const normalized = username.replace(/\./g, '').split('+')[0]
    return `${normalized}@${domain}`
  }

  const loginWithGoogle = async (googleUser) => {
    setLoading(true)
    setError(null)
    try {
      const email = googleUser.email
      const normalizedEmail = normalizeEmail(email)
      
      // Check if email already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const emailExists = existingUsers.some(u => u.normalizedEmail === normalizedEmail)
      
      if (emailExists && !user) {
        throw new Error('This email (or an alias) is already registered. Please use a different email.')
      }

      const userData = {
        id: Date.now(),
        email: email,
        normalizedEmail: normalizedEmail,
        displayName: googleUser.name,
        profilePicture: googleUser.picture,
        registered: false
      }

      setUser(userData)
      localStorage.setItem('currentUser', JSON.stringify(userData))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const completeProfile = (profileData) => {
    const nickname = profileData.nickname.toLowerCase()
    const batch = profileData.batch
    const dept = profileData.department.toLowerCase().substring(0, 4)
    
    const username = `${nickname}${batch}${dept}`
    
    const updatedUser = {
      ...user,
      nickname,
      batch,
      department: profileData.department,
      institutionName: profileData.institutionName,
      institutionNickname: profileData.institutionNickname,
      username,
      currentSemester: profileData.semester,
      registered: true
    }

    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    existingUsers.push(updatedUser)
    localStorage.setItem('users', JSON.stringify(existingUsers))
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    
    setUser(updatedUser)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, loginWithGoogle, completeProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
