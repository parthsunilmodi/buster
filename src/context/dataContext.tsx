// a context to provide data to the app. It will have the formData and the set functions

import React from 'react';
import { createContext, useContext, useState } from 'react';
import type { ErrorType, FormDataType, TripCard } from './types';
import { initialFormData } from './data';

const DataContext = createContext<{
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  selectedCard: TripCard | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<TripCard | null>>;
  errors: ErrorType;
  setErrors: React.Dispatch<React.SetStateAction<ErrorType>>;
  handleSetFormData: (data: Partial<FormDataType>) => void;
  handleSetSelectedCard: (card: TripCard | null) => void;
  handleSetErrors: (error: Partial<ErrorType>) => void;
  storeFile: { filename: string, url: string } | null;
  setStoreFile: React.Dispatch<React.SetStateAction<{ filename: string, url: string } | null>>;
  setInitialData: () => void;
  timeDuration: number[] | undefined;
  setTimeDuration: React.Dispatch<React.SetStateAction<number[] | undefined>>;
}>({
  formData: initialFormData,
  setFormData: () => {},
  selectedCard: null,
  setSelectedCard: () => {},
  errors: {},
  setErrors: () => {},
  handleSetFormData: () => {},
  handleSetSelectedCard: () => {},
  handleSetErrors: () => {},
  storeFile: null,
  setStoreFile: () => {},
  setInitialData: () => {},
  timeDuration: undefined,
  setTimeDuration: () => {},
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [selectedCard, setSelectedCard] = useState<TripCard | null>(null);
  const [errors, setErrors] = useState<ErrorType>({});
  const [storeFile, setStoreFile] = useState<{ filename: string, url: string } | null>(null);
  const [timeDuration, setTimeDuration] = useState<number[] | undefined>();

  // function to set the form data
  const handleSetFormData = (data: Partial<FormDataType>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    Object.keys(data).forEach((key) => {
      if (errors[key as keyof ErrorType]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    });
  };

  // function to set the selected card
  const handleSetSelectedCard = (card: TripCard | null) => {
    setSelectedCard(card);
  };

  // function to set the errors
  const handleSetErrors = (error: Partial<ErrorType>) => {
    setErrors(() => ({ ...errors, ...error }));
  };

  const setInitialData = () => {
    setFormData(initialFormData);
  };

  return (
    <DataContext.Provider
      value={{
        formData,
        setFormData,
        selectedCard,
        setSelectedCard,
        errors,
        setErrors,
        handleSetFormData,
        handleSetSelectedCard,
        handleSetErrors,
        storeFile,
        setStoreFile,
        setInitialData,
        timeDuration,
        setTimeDuration,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
