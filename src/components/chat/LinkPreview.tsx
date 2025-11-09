'use client';

import { FiExternalLink } from 'react-icons/fi';

interface LinkPreviewProps {
  preview: {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
  };
}

export default function LinkPreview({ preview }: LinkPreviewProps) {
  const handleClick = () => {
    window.open(preview.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="rounded-xl overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors mb-2 border border-gray-200"
      onClick={handleClick}
    >
      {/* Image preview */}
      {preview.image && (
        <div className="relative w-full h-48 bg-gray-200">
          <img 
            src={preview.image} 
            alt={preview.title || 'Link preview'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="p-3">
        {/* Site name */}
        {preview.siteName && (
          <div className="text-xs text-blue-600 font-medium mb-1">
            {preview.siteName}
          </div>
        )}
        
        {/* Title */}
        {preview.title && (
          <div className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {preview.title}
          </div>
        )}
        
        {/* Description */}
        {preview.description && (
          <div className="text-xs text-gray-600 line-clamp-2 mb-2">
            {preview.description}
          </div>
        )}
        
        {/* URL */}
        <div className="flex items-center text-xs text-blue-500 hover:text-blue-700">
          <span className="truncate">{preview.url}</span>
          <FiExternalLink size={12} className="ml-1 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
