import { NavLink, Link } from 'react-router-dom';
import SchoolSeal from './SchoolSeal';
import { schoolProfile } from '../data/schoolInfo';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="top-strip">
  <div className="container d-flex align-items-center justify-content-between">
    <span>{schoolProfile.address}</span>

    <span className="d-none d-md-inline">
      <i className="bi bi-telephone me-1"></i>
      {schoolProfile.phone} &nbsp;|&nbsp; {schoolProfile.email}
    </span>
  </div>
</div>

      <nav className="navbar navbar-expand-lg main-nav">
        <div className="container-page">
          <Link className="navbar-brand brand-block" to="/">
            <SchoolSeal size={42} />
            <span className="brand-text">
              <span className="brand-name">{schoolProfile.name}</span>
              
            </span>
          </Link>
          
          
        </div>
      </nav>
    </header>
  );
}
