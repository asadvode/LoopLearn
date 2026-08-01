import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './ProfileSetup.css'

const ProfileSetup = ({ user, onComplete, onClose }) => {
  const { completeProfile, error } = useAuth()
  const [formData, setFormData] = useState({
    nickname: '',
    batch: '',
    department: 'Textile Engineering',
    institutionName: '',
    institutionNickname: '',
    semester: '1'
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const departments = [
    'Textile Engineering',
    'Fashion Design',
    'Textile Technology',
    'Fashion Technology'
  ]

  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString())

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Nickname is required'
    } else if (formData.nickname.includes(' ')) {
      newErrors.nickname = 'Nickname must be a single word'
    }

    if (!formData.batch) {
      newErrors.batch = 'Batch number is required'
    } else if (isNaN(formData.batch)) {
      newErrors.batch = 'Batch must be numeric'
    }

    if (!formData.institutionName.trim()) {
      newErrors.institutionName = 'Institution name is required'
    }

    if (!formData.institutionNickname.trim()) {
      newErrors.institutionNickname = 'Institution nickname is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value.toLowerCase()
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      completeProfile(formData)
      if (onComplete) onComplete()
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  const generatedUsername = `${formData.nickname}${formData.batch}${formData.department.toLowerCase().substring(0, 4)}`

  return (
    <div className="profile-setup-overlay">
      <div className="profile-setup-modal">
        <button className="close-modal-btn" onClick={onClose}>×</button>

        <div className="setup-header">
          <h2>Complete Your Profile</h2>
          <p>Help us personalize your learning experience</p>
        </div>

        {errors.submit && (
          <div className="error-message">⚠️ {errors.submit}</div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Gmail Address</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="form-input disabled"
            />
            <small>Cannot be changed</small>
          </div>

          <div className="form-group">
            <label>Nickname <span className="required">*</span></label>
            <input
              type="text"
              name="nickname"
              placeholder="e.g., john"
              value={formData.nickname}
              onChange={handleChange}
              className={`form-input ${errors.nickname ? 'error' : ''}`}
            />
            {errors.nickname && <span className="field-error">{errors.nickname}</span>}
            <small>Single word, lowercase only</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Batch No <span className="required">*</span></label>
              <input
                type="text"
                name="batch"
                placeholder="e.g., 22"
                value={formData.batch}
                onChange={handleChange}
                className={`form-input ${errors.batch ? 'error' : ''}`}
              />
              {errors.batch && <span className="field-error">{errors.batch}</span>}
            </div>

            <div className="form-group">
              <label>Semester <span className="required">*</span></label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="form-input"
              >
                {semesters.map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Department <span className="required">*</span></label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-input"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Institution Name <span className="required">*</span></label>
            <input
              type="text"
              name="institutionName"
              placeholder="e.g., National Institute of Textile Engineering"
              value={formData.institutionName}
              onChange={(e) => setFormData(prev => ({ ...prev, institutionName: e.target.value }))}
              className={`form-input ${errors.institutionName ? 'error' : ''}`}
            />
            {errors.institutionName && <span className="field-error">{errors.institutionName}</span>}
          </div>

          <div className="form-group">
            <label>Institution Nickname <span className="required">*</span></label>
            <input
              type="text"
              name="institutionNickname"
              placeholder="e.g., NITE"
              value={formData.institutionNickname}
              onChange={(e) => setFormData(prev => ({ ...prev, institutionNickname: e.target.value }))}
              className={`form-input ${errors.institutionNickname ? 'error' : ''}`}
            />
            {errors.institutionNickname && <span className="field-error">{errors.institutionNickname}</span>}
          </div>

          <div className="username-preview">
            <strong>Your Username:</strong>
            <code>{generatedUsername || 'preview'}</code>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={loading}
          >
            {loading ? '⏳ Setting up...' : '✅ Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfileSetup
