import React, { useState, useMemo } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useCMS } from '../../context/CMSContext'
import ResourceCard from '../Resources/ResourceCard'
import './LabsPage.css'

const LabsPage = () => {
  const { user } = useAuth()
  const { cmsData } = useCMS()
  const [selectedDept, setSelectedDept] = useState('Textile Engineering')
  const [selectedSemester, setSelectedSemester] = useState('2')
  const [selectedCourse, setSelectedCourse] = useState('')

  const departments = [
    'Textile Engineering',
    'Fashion Design',
    'Textile Technology',
    'Fashion Technology'
  ]

  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString())

  const mockCourses = {
    '2': [
      { code: 'TX-L201', name: 'Yarn Lab' },
      { code: 'TX-L202', name: 'Fabric Testing' }
    ],
    '3': [
      { code: 'TX-L301', name: 'Dyeing Lab' },
      { code: 'TX-L302', name: 'Color Science' }
    ],
    '4': [
      { code: 'TX-L401', name: 'Finishing Lab' },
      { code: 'TX-L402', name: 'Process Control' }
    ]
  }

  const mockLabReports = [
    {
      id: 1,
      title: 'Yarn Strength Testing Report',
      author: 'john22tex',
      description: 'Complete lab report on yarn tensile strength and elongation measurements',
      likes: 145,
      downloads: 670,
      rating: 4.6,
      reviews: 52,
      course: 'TX-L201',
      semester: '2',
      dept: 'Textile Engineering',
      date: '2026-07-15'
    },
    {
      id: 2,
      title: 'Fabric Count Analysis',
      author: 'sara18tex',
      description: 'Experimental data and analysis of fabric thread count using magnification techniques',
      likes: 203,
      downloads: 890,
      rating: 4.7,
      reviews: 71,
      course: 'TX-L202',
      semester: '2',
      dept: 'Textile Engineering',
      date: '2026-07-10'
    },
    {
      id: 3,
      title: 'Reactive Dye Application',
      author: 'emma19tex',
      description: 'Lab procedures and results for reactive dye exhaustion and fixation',
      likes: 278,
      downloads: 1120,
      rating: 4.8,
      reviews: 94,
      course: 'TX-L301',
      semester: '3',
      dept: 'Textile Engineering',
      date: '2026-07-05'
    },
    {
      id: 4,
      title: 'Color Fastness Testing',
      author: 'mike20tex',
      description: 'Comprehensive testing of dyed fabric resistance to light, wash, and rub',
      likes: 156,
      downloads: 720,
      rating: 4.5,
      reviews: 59,
      course: 'TX-L302',
      semester: '3',
      dept: 'Textile Engineering',
      date: '2026-06-28'
    }
  ]

  const courses = mockCourses[selectedSemester] || []

  const filteredLabs = useMemo(() => {
    return mockLabReports.filter(lab => {
      const deptMatch = lab.dept === selectedDept
      const semesterMatch = lab.semester === selectedSemester
      const courseMatch = !selectedCourse || lab.course === selectedCourse
      return deptMatch && semesterMatch && courseMatch
    })
  }, [selectedDept, selectedSemester, selectedCourse])

  return (
    <div className="labs-page">
      <div className="page-header">
        <h1>🧪 Lab Reports</h1>
        <p>Access detailed lab experiment reports and findings</p>
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
          ⚠️ Please sign in to download lab reports
        </div>
      )}

      <div className="resources-grid">
        {filteredLabs.length > 0 ? (
          filteredLabs.map(lab => (
            <ResourceCard key={lab.id} resource={lab} type="lab" />
          ))
        ) : (
          <div className="no-results">
            <p>No lab reports found for the selected filters</p>
            <small>Try adjusting your filters</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default LabsPage
