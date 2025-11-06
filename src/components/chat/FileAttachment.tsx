'use client';

import { useState } from 'react';
import { FiFile, FiDownload, FiX, FiImage, FiFileText, FiMusic, FiVideo } from 'react-icons/fi';

interface FileAttachmentProps {
  file: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  };
  onRemove?: () => void;
  showRemove?: boolean;
}

export default function FileAttachment({ file, onRemove, showRemove = false }: FileAttachmentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = () => {
    const fileType = file.type.split('/')[0];
    
    switch (fileType) {
      case 'image':
        return <FiImage size={24} />;
      case 'video':
        return <FiVideo size={24} />;
      case 'audio':
        return <FiMusic size={24} />;
      case 'text':
      case 'application':
        return <FiFileText size={24} />;
      default:
        return <FiFile size={24} />;
    }
  };

  const handleDownload = () => {
    setIsLoading(true);
    // Simulate download delay
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsLoading(false);
    }, 500);
  };

  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';

  return (
    <div className="file-attachment">
      {isImage ? (
        <div className="relative rounded-lg overflow-hidden group">
          <img src={file.url} alt={file.name} className="w-full h-auto" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
            <button 
              className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 transition-all"
              onClick={handleDownload}
            >
              <FiDownload size={20} />
            </button>
            {showRemove && onRemove && (
              <button 
                className="opacity-0 group-hover:opacity-100 bg-white text-red-500 rounded-full p-2 hover:bg-red-50 transition-all ml-2"
                onClick={onRemove}
              >
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="inline-flex items-start gap-3 max-w-sm">
          {/* File icon/thumbnail - no border, just background */}
          <div className="flex-shrink-0">
            {isPDF ? (
              <div className="w-[72px] h-[72px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                <FiFileText size={36} className="text-red-500" />
              </div>
            ) : (
              <div className="w-[72px] h-[72px] bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-blue-500">
                  {getFileIcon()}
                </div>
              </div>
            )}
          </div>
          
          {/* File info with OPEN WITH button */}
          <div className="flex-1 min-w-0 pt-1">
            <div className="text-[15px] font-normal text-gray-900 mb-1 truncate leading-tight">
              {file.name}
            </div>
            <div className="text-[13px] text-gray-500 leading-tight mb-1.5">
              {formatFileSize(file.size)}
            </div>
            <button 
              className="text-[13px] text-blue-500 hover:text-blue-600 font-medium uppercase tracking-wide"
              onClick={handleDownload}
            >
              OPEN WITH
            </button>
          </div>
          
          {/* Remove button if needed */}
          {showRemove && onRemove && (
            <button 
              className="flex-shrink-0 w-6 h-6 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors"
              onClick={onRemove}
            >
              <FiX size={14} className="text-red-500" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}