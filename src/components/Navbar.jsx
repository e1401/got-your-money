import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useLogout } from '../hooks/useLogout';

function Navbar() {
  const { logout } = useLogout();
  console.log();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">Got your money</Link>
        </li>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
        <li>
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
