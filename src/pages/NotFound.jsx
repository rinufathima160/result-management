import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: '70vh' }}>
      <span className="eyebrow">Error 404</span>
      <h1 className="section-heading">Page Not Found</h1>
      <hr className="ledger-rule center" />
      <p className="text-muted mb-3">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-navy">Return to Home</Link>
    </div>
  );
}
