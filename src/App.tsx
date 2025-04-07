import AppRoutes from './routes/AppRoutes';
import { LoadScript } from "@react-google-maps/api";
import React from 'react';

function App() {
  const GOOGLE_API_KEY = "AIzaSyBB3KnFMbhL2KOMGMHk41cUtvs_9E5FPro";
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={['places']}>
      <AppRoutes />
    </LoadScript>
  );
}

export default App;
