import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { path } from '../constants';
import Loader from '../components/Loader';
import Layout from './Layout';

const Dashboard = lazy(() => import('../pages/Dashboard'));

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={path.ROOT} element={<Dashboard />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
