import React from 'react';
import uploadIcon from '../../assets/images/uploadIcon.png';
import * as filestack from 'filestack-js';
import { useDataContext } from '../../context/dataContext';
import './FileSelector.scss';

const FileSelector = () => {
  const { setStoreFile, handleSetErrors, errors } = useDataContext();

  const API_KEY = import.meta.env.VITE_APP_FILE_STACK_API_KEY;
  const handleOpenPicker = () => {
    const client = filestack.init(API_KEY);

    const options = {
      maxFiles: 20,
      uploadInBackground: false,
      onOpen: () => {
        delete errors.file;
      },
      onUploadDone: (res: any) => {
        const unsupportedFiles = res.filesUploaded.filter(
          (file: any) => !['application/pdf', 'image/jpeg', 'text/csv'].includes(file.originalFile?.type)
        );

        if (unsupportedFiles.length > 0) {
          handleSetErrors({ ...errors, file: 'Unsupported file type. Please upload a PDF, JPG, or CSV file.' });
        } else {
          const updatedErrors = { ...errors };
          delete updatedErrors.file;
          handleSetErrors(updatedErrors);
          setStoreFile(res.filesUploaded);
        }
      },
    };

    client.picker(options).open();
  };

  return (
    <div className="file-selector-container">
      <div className="file-drop-zone">
        <img onClick={handleOpenPicker} src={uploadIcon} alt="Upload Icon" className="upload-icon" />
        <label htmlFor="file-upload">
          <div className="_attach" onClick={handleOpenPicker}>
            Attach a file or
          </div>{' '}
          drag one here.
        </label>
        <p>Supported types: PDF, JPG, CSV</p>
      </div>
    </div>
  );
};

export default FileSelector;
