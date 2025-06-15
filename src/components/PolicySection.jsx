import React from 'react';
import PropTypes from 'prop-types';

const PolicySection = ({ title, content }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {content.map((section, index) => (
          <div 
            key={index} 
            className="border-b border-gray-200 pb-6 last:border-b-0"
            id={section.title.toLowerCase().replace(/\s+/g, '-')}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-[#D62A91]">{index + 1}.</span>
              {section.title}
            </h3>
            <div className="text-gray-600 space-y-3">
              {section.content.split('\n').map((line, i) => (
                <p key={i} className="leading-relaxed">
                  {line.startsWith('•') ? (
                    <span className="flex items-start gap-2">
                      <span className="text-[#D62A91]">•</span>
                      <span>{line.substring(1).trim()}</span>
                    </span>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

PolicySection.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PolicySection; 