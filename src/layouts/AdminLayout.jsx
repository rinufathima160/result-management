import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

export default function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 admin-shell">
      <AdminNavbar />
      <main className="flex-grow-1">
        <div className="container-page py-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
