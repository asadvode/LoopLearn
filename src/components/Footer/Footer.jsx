import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Platform Rules</h3>
          <ul>
            <li>📚 Only authentic study materials allowed</li>
            <li>✅ All content must be peer-reviewed</li>
            <li>🔒 Respect intellectual property rights</li>
            <li>💬 Be respectful in all interactions</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Academic Guidelines</h3>
          <ul>
            <li>🎓 Follow your institution's academic integrity policy</li>
            <li>📖 Use these materials as supplementary resources</li>
            <li>✍️ Always cite your sources</li>
            <li>📝 Original work is encouraged</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/notes">Notes</a></li>
            <li><a href="/labs">Labs</a></li>
            <li><a href="/viva">Viva</a></li>
            <li><a href="/phonebook">Phonebook</a></li>
            <li><a href="/syllabus">Syllabus</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">Messenger</a>
            <a href="https://wa.me" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="mailto:support@looplearn.com">Email</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 LoopLearn. All rights reserved. | Empowering textile engineering education 🧵</p>
        <a href="#admin" className="admin-footer-link">👨‍💼 Admin</a>
      </div>
    </footer>
  )
}

export default Footer
