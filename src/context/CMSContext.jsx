import React, { createContext, useState, useContext } from 'react'

const CMSContext = createContext()

const initialCMSData = {
  platformName: 'LoopLearn',
  announcements: [
    'Welcome to LoopLearn - Your textile engineering study companion! 🎓',
    'New notes uploaded for TX-101 - Yarn Manufacturing 📚',
    'Lab reports for Semester 4 are now available 🧪'
  ],
  pages: [
    { id: 1, name: 'Notes', path: '/notes', visible: true, children: [] },
    { id: 2, name: 'Labs', path: '/labs', visible: true, children: [] },
    { id: 3, name: 'Viva', path: '/viva', visible: true, children: [] },
    { id: 4, name: 'Phonebook', path: '/phonebook', visible: true, children: [] },
    { id: 5, name: 'Syllabus', path: '/syllabus', visible: true, children: [] }
  ],
  videoUrl: null,
  bannedUsers: [],
  googleFormLink: ''
}

export const CMSProvider = ({ children }) => {
  const [cmsData, setCmsData] = useState(() => {
    const stored = localStorage.getItem('cmsData')
    return stored ? JSON.parse(stored) : initialCMSData
  })

  const verifyAdminPassword = (passwords) => {
    const correctPasswords = [
      'MangoMaster@908!3#p$',
      'SuPersh0P@vbd#7&M!',
      'Hello@Minhaz'
    ]
    return passwords.length === 3 && passwords.every((pwd, idx) => pwd === correctPasswords[idx])
  }

  const updateCMSData = (updates) => {
    const newData = { ...cmsData, ...updates }
    setCmsData(newData)
    localStorage.setItem('cmsData', JSON.stringify(newData))
  }

  const addPage = (page) => {
    const newPages = [...cmsData.pages, { ...page, id: Date.now() }]
    updateCMSData({ pages: newPages })
  }

  const removePage = (pageId) => {
    const newPages = cmsData.pages.filter(p => p.id !== pageId)
    updateCMSData({ pages: newPages })
  }

  const updatePage = (pageId, updates) => {
    const newPages = cmsData.pages.map(p => 
      p.id === pageId ? { ...p, ...updates } : p
    )
    updateCMSData({ pages: newPages })
  }

  const banUser = (username) => {
    const newBanned = [...cmsData.bannedUsers, username]
    updateCMSData({ bannedUsers: newBanned })
  }

  const unbanUser = (username) => {
    const newBanned = cmsData.bannedUsers.filter(u => u !== username)
    updateCMSData({ bannedUsers: newBanned })
  }

  return (
    <CMSContext.Provider value={{
      cmsData,
      updateCMSData,
      verifyAdminPassword,
      addPage,
      removePage,
      updatePage,
      banUser,
      unbanUser
    }}>
      {children}
    </CMSContext.Provider>
  )
}

export const useCMS = () => {
  const context = useContext(CMSContext)
  if (!context) {
    throw new Error('useCMS must be used within CMSProvider')
  }
  return context
}
