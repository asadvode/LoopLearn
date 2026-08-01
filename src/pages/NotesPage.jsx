import React, { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCMS } from '../../context/CMSContext'
import ResourceCard from '../Resources/ResourceCard'
import './NotesPage.css'

const NotesPage = () => {
  const { user } = useAuth()
  const { cmsData } = useCMS()
  const [selectedDept, setSelectedDept] = useState('Textile Engineering')
  const [selectedSemester, setSelectedSemester] = useState('1')
  const [selectedCourse, setSelectedCourse] = useState('')

  const departments = [
    'Textile Engineering',
    'Fashion Design',
    'Textile Technology',
    'Fashion Technology'
  ]

  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString())

  const mockCourses = {
    '1': [
      { code: 'TX-101', name: 'Basics of Textiles' },
      { code: 'TX-102', name: 'Fiber Science' }
    ],
    '2': [
      { code: 'TX-201', name: 'Yarn Manufacturing' },
      { code: 'TX-202', name: 'Fabric Formation' }
    ],
    '3': [
      { code: 'TX-301', name: 'Dyeing Technology' },
      { code: 'TX-302', name: 'Printing Processes' }
    ],
    '4': [
      { code: 'TX-401', name: 'Finishing Technology' },
      { code: 'TX-402', name: 'Quality Control' }
    ]
  }

  const mockNotes = [
    {
      id: 1,
      title: 'Introduction to Fiber Science',
      author: 'john22tex',
      description: 'Comprehensive notes covering fiber properties, classification, and characteristics',
      likes: 234,
      downloads: 1200,
      rating: 4.5,
      reviews: 89,
      course: 'TX-101',
      semester: '1',
      dept: 'Textile Engineering'
    },
    {
      id: 2,
      title: 'Yarn Manufacturing Process',
      author: 'sarah18tex',
      description: 'Detailed notes on spinning, twisting, and yarn properties with diagrams',
      likes: 456,
      downloads: 2100,
      rating: 4.8,
      reviews: 156,
      course: 'TX-201',
      semester: '2',
      dept: 'Textile Engineering'
    },
    {
      id: 3,
      title: 'Fabric Formation Fundamentals',
      author: 'mike20tex',
      description: 'Essential concepts of weaving and knitting techniques',
      likes: 189,
      downloads: 890,
      rating: 4.3,
      reviews: 67,
      course: 'TX-202',
      semester: '2',
      dept: 'Textile Engineering'
    },
    {
      id: 4,
      title: 'Dyeing Technology Advanced',
      author: 'emma19tex',
      description: 'Advanced techniques in natural and synthetic dye application',
      likes: 312,
      downloads: 1450,
      rating: 4.6,
      reviews: 102,
      course: 'TX-301',
      semester: '3',
      dept: 'Textile Engineering'
    },
    {
      id: 5,
      title: 'Fiber Properties Study Guide',
      author: 'alex21tex',
      description: 'Complete reference guide for fiber identification and testing',
      likes: 267,
      downloads: 1600,
      rating: 4.7,
      reviews: 134,
      course: 'TX-102',
      semester: '1',
      dept: 'Textile Engineering'
    },
    {
      id: 6,
      title: 'Quality Control Checklist',
      author: 'nina23tex',
      description: 'Practical quality control procedures and testing standards',
      likes: 198,
      downloads: 920,
      rating: 4.4,
      reviews: 78,
      course: 'TX-402',
      semester: '4',
      dept: 'Textile Engineering'
    }
  ]

  const courses = mockCourses[selectedSemester] || []

  const filteredNotes = useMemo(() => {
    return mockNotes.filter(note => {
      const deptMatch = note.dept === selectedDept
      const semesterMatch = note.semester === selectedSemester
      const courseMatch = !selectedCourse || note.course === selectedCourse
      return deptMatch && semesterMatch && courseMatch
    })
  }, [selectedDept, selectedSemester, selectedCourse])

  return (
    <div className="notes-page">
      <div className="page-header">
        <h1>📚 Study Notes</h1>
        <p>Download comprehensive study materials for all courses</p>
      </div>

      <div className="filter-panel">
        <div className="filter-section">
          <label>Department</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="filter-select"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <label>Semester</label>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="filter-select"
          >
            {semesters.map(sem => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <label>Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="filter-select"
          >
            <option value="">All Courses</option>
            {courses.map(course => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!user && (
        <div className="auth-notice">
          ⚠️ Please sign in to download notes
        </div>
      )}

      <div className="resources-grid">
        {filteredNotes.length > 0 ? (
          filteredNotes.map(note => (
            <ResourceCard key={note.id} resource={note} type="note" />
          ))
        ) : (
          <div className="no-results">
            <p>No notes found for the selected filters</p>
            <small>Try adjusting your filters</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotesPage
