import React, { useState } from 'react';
import { HelpCircle, Mail, MessageCircle, Phone, ChevronDown, ChevronUp, FileText, ExternalLink } from 'lucide-react';

const FAQs = [
  {
    question: 'How do I earn badges?',
    answer: 'Badges are earned by completing specific energy-saving goals and challenges. Each badge has different criteria, such as reducing energy consumption by a certain percentage or maintaining efficiency over time.'
  },
  {
    question: 'What do the different zones mean?',
    answer: 'Zones represent different areas of the office floor plan. Each zone is color-coded based on its current energy efficiency status, helping you identify areas that are performing well or need attention.'
  },
  {
    question: 'How is my energy score calculated?',
    answer: 'Your energy score is calculated based on various factors including your zone\'s energy consumption, participation in energy-saving initiatives, and completion of sustainability challenges.'
  },
  {
    question: 'How can I improve my performance?',
    answer: 'You can improve your performance by: following energy-saving tips, participating in sustainability challenges, completing training modules, and implementing recommended efficiency measures.'
  },
  {
    question: 'What do the achievement levels mean?',
    answer: 'Achievement levels (Bronze, Silver, Gold, Platinum) represent your progress in the sustainability program. Each level has specific requirements and unlocks new features and recognition.'
  }
];

const HelpContact: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="w-6 h-6 text-emerald-600" />
        <h1 className="text-2xl font-bold text-gray-800">Help & Support</h1>
      </div>

      <div className="space-y-6">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="#documentation"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <FileText className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-medium text-gray-800">Documentation</h3>
              <p className="text-sm text-gray-500">View user guides</p>
            </div>
          </a>
          <a
            href="#support"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-medium text-gray-800">Support Chat</h3>
              <p className="text-sm text-gray-500">Chat with our team</p>
            </div>
          </a>
          <a
            href="#training"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <ExternalLink className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="font-medium text-gray-800">Training Portal</h3>
              <p className="text-sm text-gray-500">Access training materials</p>
            </div>
          </a>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between gap-2 text-left"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-medium text-gray-800">Email Support</h3>
                <p className="text-sm text-gray-600">support@ecofuelers.com</p>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-medium text-gray-800">Phone Support</h3>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                <p className="text-xs text-gray-500">Mon-Fri, 9:00 AM - 5:00 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpContact; 