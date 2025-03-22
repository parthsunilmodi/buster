import React, { useState } from "react";
import './FileSelector.scss';
import uploadIcon from '../../assets/uploadIcon.png'

const FileSelector: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const supportedFileTypes = ['application/pdf', 'image/jpeg', 'text/csv'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      if (!supportedFileTypes.includes(file.type)) {
        setError('Unsupported file type. Please upload a PDF, JPG, or CSV file.');
        setSelectedFile(null);
      } else {
        setError('');
        setSelectedFile(file);
      }
    }
  };

  return (
    <div className="file-selector-container">
      <h2>If you have one, upload a trip file or itinerary:</h2>
      <div
        className="file-drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileChange({ target: { files: e.dataTransfer.files } } as any);
        }}
      >
        <input
          type="file"
          accept=".pdf, .jpg, .csv"
          onChange={handleFileChange}
          id="file-upload"
        />
        <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
        <label htmlFor="file-upload"><span>Attach a file or</span> drag one here.</label>
        <p>Supported types: PDF, JPG, CSV</p>
      </div>
      {error && <p className="error-message">{error}</p>}
      {selectedFile && <p className="selected-file">File selected: {selectedFile.name}</p>}
    </div>
  );
};

export default FileSelector;
