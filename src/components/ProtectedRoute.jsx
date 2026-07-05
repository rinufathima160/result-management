import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

// Guards /admin/dashboard and everything under /admin/manage.
// Once real JWT auth exists, isAuthenticated() simply starts checking
// token expiry instead of sessionStorage presence.
export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
}
