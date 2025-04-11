import React  from 'react';
import uploadIcon from '../../assets/images/uploadIcon.png';
import { useDataContext } from '../../context/dataContext';
import './FileSelector.scss';

const FileSelector = () => {
   const { setStoreFile, handleSetErrors, errors } = useDataContext();
  const supportedFileTypes = ['application/pdf', 'image/jpeg', 'text/csv'];


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) {
      handleSetErrors({ ...errors, file: 'File upload not completed, please try again.' });
      return;
    }
    if (!supportedFileTypes.includes(file.type)) {
      handleSetErrors({ ...errors, file: 'Unsupported file type. Please upload a PDF, JPG, or CSV file.' });
      setStoreFile(null);
    } else {
      delete errors.file;
      setStoreFile(file);
    }
  };

  return (
    <div className="file-selector-container">
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
    </div>
  );
};

export default FileSelector;
