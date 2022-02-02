import TransactionForm from './TransactionForm';

import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>Transaction list</div>
      <div className={styles.sidebar}>
        <TransactionForm />
      </div>
    </div>
  );
}

export default Home;
