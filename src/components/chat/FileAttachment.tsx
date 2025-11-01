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

  return (
    <div className="file-attachment">
      {isImage ? (
        <div className="file-attachment-image">
          <img src={file.url} alt={file.name} />
          <div className="file-attachment-overlay">
            <button className="btn btn-icon" onClick={handleDownload}>
              <FiDownload size={20} />
            </button>
            {showRemove && onRemove && (
              <button className="btn btn-icon" onClick={onRemove}>
                <FiX size={20} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="file-attachment-document">
          <div className="file-icon">{getFileIcon()}</div>
          <div className="file-info">
            <div className="file-name text-truncate">{file.name}</div>
            <div className="file-size">{formatFileSize(file.size)}</div>
          </div>
          <div className="file-actions">
            <button 
              className="btn btn-icon" 
              onClick={handleDownload}
              disabled={isLoading}
            >
              <FiDownload size={18} />
            </button>
            {showRemove && onRemove && (
              <button className="btn btn-icon" onClick={onRemove}>
                <FiX size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}