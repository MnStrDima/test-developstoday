import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import * as yup from 'yup';

import postsOperations from '../../libs/posts-operations';
import MainContainer from '../../components/MainContainer/MainContainer';

export async function getServerSideProps({ params }) {
  const { id } = params;
  const { data } = await axios.get(`/posts/${id}?_embed=comments`);
  return {
    props: {
      post: data,
    },
  };
}

const postValidationSchema = yup.object({
  title: yup.string().required("Enter post's title"),
  body: yup.string().required('Enter post'),
});
const commentValidationSchema = yup.object({
  comment: yup.string().required('Enter comment'),
});

const Post = ({ post }) => {
  const { title, body, comments } = post;
  const {
    asPath,
    query: { id },
  } = useRouter();

  const dispatch = useDispatch();
  const [enableEditing, setEnableEditing] = useState(false);
  const [enableCommenting, setEnableCommenting] = useState(false);

  useEffect(() => {
    dispatch(postsOperations.getPostById(id));
  }, []);

  const handleSubmit = async (postObj) => {
    await dispatch(postsOperations.updatePost(postObj));
    Router.push(asPath);
    setEnableEditing(false);
  };
  const handleCommentSubmit = async (commentObj) => {
    await dispatch(postsOperations.addComment(commentObj));
    Router.push(asPath);
    setEnableCommenting(false);
  };

  const handleDelete = async (id) => {
    await dispatch(postsOperations.deletePost(id));
    Router.push('/');
  };
  return (
    <MainContainer>
      <h3>Post {id}</h3>
      <section>
        <p>{title}</p>
        <article>{body}</article>
        {comments[0]?.body ? (
          <div>
            <span>Comments:</span>
            <ul>
              {comments.map(({ id, body }) => (
                <li key={id}>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>There aren't any comments for this post.</p>
        )}
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => setEnableEditing(!enableEditing)}
        >
          {enableEditing ? 'Cancel editing' : 'Edit this post'}
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          size="medium"
          onClick={() => setEnableCommenting(!enableCommenting)}
        >
          {enableCommenting ? 'Cancel' : 'Add comment'}
        </Button>
        <Button type="button" variant="contained" color="primary" size="medium" onClick={() => handleDelete(id)}>
          Delete this post
        </Button>
      </section>
      {enableEditing && (
        <div>
          <Formik
            initialValues={{ title, body }}
            validationSchema={postValidationSchema}
            onSubmit={({ title, body }, { resetForm, setSubmitting }) => {
              handleSubmit({ title, body, id });
              setSubmitting(false);
              resetForm();
            }}
          >
            <Form>
              <Field
                component={TextField}
                type="text"
                name="title"
                label="Post's title:"
                variant="outlined"
                margin="dense"
                fullWidth
              />

              <Field
                component={TextField}
                type="text"
                name="body"
                label="Post's body:"
                variant="outlined"
                margin="dense"
                fullWidth
              />

              <Button type="submit" variant="contained" color="primary" size="medium">
                Send post
              </Button>
            </Form>
          </Formik>
        </div>
      )}
      {enableCommenting && (
        <div>
          <Formik
            initialValues={{ comment: '' }}
            validationSchema={commentValidationSchema}
            onSubmit={({ comment }, { resetForm, setSubmitting }) => {
              handleCommentSubmit({ body: comment, postId: id });
              setSubmitting(false);
              resetForm();
            }}
          >
            <Form>
              <Field
                component={TextField}
                type="text"
                name="comment"
                label="Comment's body:"
                variant="outlined"
                margin="dense"
                fullWidth
              />

              <Button type="submit" variant="contained" color="primary" size="medium">
                Send comment
              </Button>
            </Form>
          </Formik>
        </div>
      )}
    </MainContainer>
  );
};

export default Post;
