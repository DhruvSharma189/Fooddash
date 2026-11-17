import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const LINKS = [['/', 'Home'], ['/explore', 'Explore'], ['/menu', 'Our menu'], ['/story', 'Our story']];

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(document.documentElement.dataset.theme);
  useEffect(() => setMenuOpen(false), [pathname]);

  const flip = () => {
    const t = theme === 'night' ? 'day' : 'night';
    document.documentElement.dataset.theme = t;
    localStorage.setItem('fooddash_theme', t);
    setTheme(t);
  };

  return (
    <header className="nav">
      <div className="container nav-row">
        <Link to="/" className="brand" aria-label="FoodDash home">
          <svg viewBox="0 0 64 64" width="30" height="30" aria-hidden="true"><path d="M6 50 26 18l10 14 6-8 16 26z" fill="currentColor" /></svg>
          <span>FoodDash</span>
        </Link>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main">
          {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>)}
          {user && <NavLink to="/orders">My orders</NavLink>}
          {isAdmin && <a href="/admin.html">Admin</a>}
        </nav>
        <div className="nav-tools">
          <button className="icon-btn" onClick={flip} aria-label={theme === 'night' ? 'Switch to day' : 'Switch to night'}>{theme === 'night' ? '☀' : '☾'}</button>
          {user
            ? <button className="link-btn" onClick={() => { logout(); navigate('/'); }}>Sign out</button>
            : <Link className="link-btn" to="/login">Sign in</Link>}
          <button className="cart-btn" onClick={() => cart.setOpen(true)} aria-label={`Open cart, ${cart.count} items`}>
            Cart <span className="cart-count">{cart.count}</span>
          </button>
          <button className="icon-btn menu-toggle" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle navigation" aria-expanded={menuOpen}>☰</button>
        </div>
      </div>
    </header>
  );
}
