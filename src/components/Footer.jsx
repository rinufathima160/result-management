import { Link } from 'react-router-dom';
import { schoolProfile, quickLinks } from '../data/schoolInfo';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-page">
        
        <p className="footer-bottom">
          &copy; {new Date().getFullYear()} {schoolProfile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
