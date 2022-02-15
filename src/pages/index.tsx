import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): ReactElement {
  return (
    <div className={styles.container}>
      <img src="/logo.svg" alt="logo" />
      <main>
        <div className={styles.title}>Como utilizar Hooks</div>
        <div className={styles.subtitle}>
          Pensando em sicronização em vez de ciclos de vida.
        </div>
        <div className={styles.details}>
          <div>
            <FiCalendar />
            <span>15 Mar 2021</span>
          </div>
          <div>
            <FiUser />
            Joseph Oliveira
          </div>
        </div>
      </main>

      <main>
        <div className={styles.title}>Como utilizar Hooks</div>
        <div className={styles.subtitle}>
          Pensando em sicronização em vez de ciclos de vida.
        </div>
        <div className={styles.details}>
          <div>
            <FiCalendar />
            <span>15 Mar 2021</span>
          </div>
          <div>
            <FiUser />
            Joseph Oliveira
          </div>
        </div>
      </main>

      <main>
        <div className={styles.title}>Como utilizar Hooks</div>
        <div className={styles.subtitle}>
          Pensando em sicronização em vez de ciclos de vida.
        </div>
        <div className={styles.details}>
          <div>
            <FiCalendar />
            <span>15 Mar 2021</span>
          </div>
          <div>
            <FiUser />
            Joseph Oliveira
          </div>
        </div>
      </main>

      <a href="/">Carregar mais posts</a>
    </div>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
