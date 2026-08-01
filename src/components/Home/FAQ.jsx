import React, { useState } from 'react'
import './FAQ.css'

const FAQ = () => {
  const [expandedId, setExpandedId] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'What is LoopLearn?',
      answer: 'LoopLearn is a comprehensive study platform designed specifically for textile engineering students. It provides access to notes, lab reports, viva questions, syllabi, and a phonebook directory.'
    },
    {
      id: 2,
      question: 'How do I download study materials?',
      answer: 'First, create an account using your Gmail. Then navigate to the Notes or Labs section, select your semester and course, and click the download button on any resource card.'
    },
    {
      id: 3,
      question: 'Can I upload my own notes?',
      answer: 'Yes! Once registered, you can submit notes through the "Submit Notes" button on any page. Your submission will be reviewed by our moderation team before being published.'
    },
    {
      id: 4,
      question: 'Is there an offline mode?',
      answer: 'Yes! LoopLearn works offline after you\'ve downloaded materials. Simply download the app to access your materials without internet connectivity.'
    },
    {
      id: 5,
      question: 'How can I contact faculty members?',
      answer: 'Visit the Phonebook section to find contact details for faculty, section officers, hall provosts, and administration sorted by department.'
    },
    {
      id: 6,
      question: 'What if I have issues or suggestions?',
      answer: 'Contact us via Messenger, WhatsApp, or email through the floating contact hub or footer links. We value your feedback!'
    }
  ]

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        
        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${expandedId === faq.id ? 'expanded' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              >
                <span>{faq.question}</span>
                <span className="toggle-icon">{expandedId === faq.id ? '−' : '+'}</span>
              </button>
              
              {expandedId === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
