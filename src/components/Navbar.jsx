import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <Link to="/">Got your money</Link>
        </li>
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
