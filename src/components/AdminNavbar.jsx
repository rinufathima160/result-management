import { Link, useNavigate } from 'react-router-dom';
import SchoolSeal from './SchoolSeal';
import { getSession, logout } from '../utils/auth';
import './AdminNavbar.css';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const session = getSession();

  function handleLogout() {
    logout();
    navigate('/admin', { replace: true });
  }

  return (
    <header className="admin-header no-print">
      <div className="container-page d-flex align-items-center justify-content-between">
        <Link to="/admin/dashboard" className="admin-brand">
          <SchoolSeal size={32} />
          <span>
            Examination Office
            <small>Result Management Console</small>
          </span>
        </Link>
        <div className="admin-user">
          <span className="admin-user-name">
            <i className="bi bi-person-circle me-1" aria-hidden="true"></i>
            {session?.admin?.name || 'Administrator'}
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-1" aria-hidden="true"></i>
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
