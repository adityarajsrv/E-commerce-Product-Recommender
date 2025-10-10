import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ 
  label, 
  acceptedFormats = '.csv,.json', 
  onFileSelect, 
  className = '' 
}) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      onFileSelect?.(file);
      
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block font-semibold mb-2 text-gray-700">
        {label}
      </label>
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : selectedFile 
              ? 'border-green-500 bg-green-50 border-solid' 
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats}
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center gap-2">
          {selectedFile ? (
            <div className="flex items-center gap-3 w-full justify-between">
              <div className="text-2xl">📄</div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-green-800">{selectedFile.name}</div>
                <div className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</div>
              </div>
              <button
                type="button"
                className="bg-transparent border-none text-xl cursor-pointer text-gray-600 p-1 rounded hover:bg-gray-100 hover:text-gray-800"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  onFileSelect?.(null);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                  }
                }}
              >
                ×
              </button>
            </div>
          ) : (
            <>
              <div className="text-3xl mb-2">📁</div>
              <div className="text-gray-600">
                <span className="text-blue-600 font-semibold underline">Choose File</span>
                <span className="text-gray-500"> or drag and drop</span>
              </div>
              <div className="text-sm text-gray-400">{acceptedFormats}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  acceptedFormats: PropTypes.string,
  onFileSelect: PropTypes.func,
  className: PropTypes.string,
};

export default FileInput;