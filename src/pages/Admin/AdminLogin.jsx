import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import SchoolSeal from '../../components/SchoolSeal';
import { login, isAuthenticated } from '../../utils/auth';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.username, form.password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <SchoolSeal size={48} />
          <div>
            <h1 className="admin-login-title">Examination Office</h1>
            <p className="admin-login-subtitle">Result Management Console</p>
          </div>
        </div>
        <hr className="ledger-rule full" />

        {error && (
          <div className="alert-error" role="alert">
            <i className="bi bi-exclamation-circle me-2" aria-hidden="true"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-end mb-3">
            <a href="#!" className="forgot-link">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-navy w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                Signing in...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        
        
      </div>
    </div>
  );
}
