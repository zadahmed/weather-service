import React from 'react';

export const Card = ({ 
  children, 
  className = '', 
  title,
  titleIcon,
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {title && (
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            {titleIcon && <span className="mr-2">{titleIcon}</span>}
            {title}
          </h2>
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};