import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import AppRoutes from './routes/AppRoutes';

function App() {
  const GOOGLE_API_KEY = import.meta.env.VITE_APP_API_KEY || '';
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
      <AppRoutes />
    </LoadScript>
  );
}

export default App;
