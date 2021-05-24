import Head from 'next/head';
import { Container } from '@material-ui/core';
import NavigationLink from '../NavigationLink/NavigationLink';

const MainContainer = ({ children, keywords }) => {
  return (
    <>
      <Head>
        <meta keywords={`next.js, blog, DevelopsToday, ${keywords}`}></meta>
        <title>Home page</title>
      </Head>
      <nav>
        <NavigationLink href={'/'} text="All posts" />
        <NavigationLink href={'/posts/new'} text="Creating new post page" />
      </nav>
      <Container maxWidth="md">
        <section>{children}</section>
      </Container>
    </>
  );
};

export default MainContainer;
