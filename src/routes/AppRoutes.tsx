
import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { path } from '../constants';
import Loader from '../components/Loader';
import Layout from './Layout';

const Dashboard = lazy(() => import('../pages/Dashboard'));

const AppRoutes: React.FC = () => {

  const LandingPage = () => {
    return <Navigate to={path.DASHBOARD} />;
  };

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={path.ROOT} element={<LandingPage />} />
          <Route path={path.DASHBOARD} element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;