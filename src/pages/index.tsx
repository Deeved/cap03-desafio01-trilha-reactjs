import { GetStaticProps } from 'next';
import { ReactElement } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Prismic from '@prismicio/client';
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

export default function Home({ postsPagination }: HomeProps): ReactElement {
  return (
    <div className={styles.container}>
      <img src="/logo.svg" alt="logo" />

      {postsPagination.results.map(post => (
        <main>
          <div className={styles.title}>{post.data.title}</div>
          <div className={styles.subtitle}>{post.data.subtitle}</div>
          <div className={styles.details}>
            <div>
              <FiCalendar />
              <span>{post.first_publication_date}</span>
            </div>
            <div>
              <FiUser />
              {post.data.author}
            </div>
          </div>
        </main>
      ))}

      {postsPagination?.next_page != null ? (
        <a href="/">Carregar mais posts</a>
      ) : (
        ''
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 20,
    }
  );

  const posts = await postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const { next_page } = postsResponse;

  return {
    props: {
      postsPagination: {
        next_page,
        results: posts,
      },
    },
  };
};
