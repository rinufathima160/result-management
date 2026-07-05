import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';

import Home from '../pages/Home/Home';
import ResultSearch from '../pages/Results/ResultSearch';
import AdminLogin from '../pages/Admin/AdminLogin';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminManage from '../pages/Admin/AdminManage';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public school website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/results/:examId" element={<ResultSearch />} />
      </Route>

      {/* Admin login sits outside the admin shell (no logged-in header) */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Office / admin console */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage/:examId" element={<AdminManage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
