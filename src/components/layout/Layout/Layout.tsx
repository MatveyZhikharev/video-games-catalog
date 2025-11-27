import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Loader } from '@/components/common/Loader';
import styles from './Layout.module.scss';

export const Layout = () => {
  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className={styles.main}>
        <Suspense fallback={<Loader fullScreen text="Loading..." />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
