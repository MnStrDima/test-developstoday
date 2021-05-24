import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import MainContainer from '../components/MainContainer/MainContainer';
import postsOperations from '../libs/posts-operations';
import { getPostsLength } from '../libs/posts-selectors';

export async function getStaticProps(context) {
  const { data } = await axios.get('/posts');
  return {
    props: {
      allPosts: data,
    },
  };
}

export default function Home({ allPosts }) {
  const dispatch = useDispatch();

  const totalPostsFromSelector = useSelector(getPostsLength);

  useEffect(() => {
    dispatch(postsOperations.getPosts());
  }, [dispatch]);

  const sortedPosts = allPosts.sort((a, b) => b.id - a.id);
  return (
    <MainContainer>
      <h1>All latest posts: {totalPostsFromSelector}</h1>
      <ul>
        {sortedPosts.map(({ id, title }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </MainContainer>
  );
}
