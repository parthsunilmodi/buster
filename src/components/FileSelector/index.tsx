import React from 'react';
import uploadIcon from '../../assets/images/uploadIcon.png';
import * as filestack from 'filestack-js';
import { useDataContext } from '../../context/dataContext';
import './FileSelector.scss';

const FileSelector = () => {
  const { setStoreFile, handleSetErrors, errors } = useDataContext();

  const API_KEY = import.meta.env.VITE_APP_FILE_STACK_API_KEY;
  const client = filestack.init(API_KEY);

  const handleOpenPicker = () => {
    const originalOverflow = document.body.style.overflow;

    const options = {
      maxFiles: 1,
      uploadInBackground: false,
      onOpen: () => {
        delete errors.file;
        requestAnimationFrame(() => {
          document.body.style.overflow = originalOverflow || 'auto';
        });
      },
      onClose: () => {
        document.body.style.overflow = originalOverflow || 'auto';
      },
      onUploadDone: (res: any) => {
        const uploadedFile = res.filesUploaded[0];
        // const isSupported = ['application/pdf', 'image/jpeg', 'text/csv'].includes(uploadedFile.originalFile?.type);

        // if (!isSupported) {
        //   handleSetErrors({ ...errors, file: 'Unsupported file type. Please upload a PDF, JPG, or CSV file.' });
        //   setStoreFile(null);
        // } else {
        const updatedErrors = { ...errors };
        delete updatedErrors.file;
        handleSetErrors(updatedErrors);
        setStoreFile(uploadedFile);
        // }
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
        <p>Example file types: PDF, JPG, CSV</p>
      </div>
    </div>
  );
};

export default FileSelector;
