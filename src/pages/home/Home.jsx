import TransactionForm from './TransactionForm';
import { useAuthContext } from '../../hooks/useAuthContext';

import styles from './Home.module.css';

function Home() {
  const { user } = useAuthContext();
  return (
    <div className={styles.container}>
      <div className={styles.content}>Transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}

export default Home;
