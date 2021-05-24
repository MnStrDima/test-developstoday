import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import axios from 'axios';
import MainContainer from '../../components/MainContainer/MainContainer';

const validationSchema = yup.object({
  title: yup.string().required("Enter post's title"),
  body: yup.string().required("Enter post's body"),
});

const NewPost = () => {
  const handleSubmit = async (newPostObj) => {
    try {
      const { data } = await axios.post('/posts', newPostObj);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <MainContainer>
      <main>
        <h2>Create new post</h2>
        <Formik
          initialValues={{ title: '', body: '' }}
          validationSchema={validationSchema}
          onSubmit={({ title, body }, { resetForm, setSubmitting }) => {
            handleSubmit({ title, body });
            setSubmitting(false);
            resetForm();
          }}
        >
          {/* <Form className={styles.contactForm}> */}
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
              type="tel"
              name="body"
              label="Post's body:"
              variant="outlined"
              margin="dense"
              fullWidth
            />

            <Button type="submit" variant="contained" color="primary" size="medium">
              Add new post
            </Button>
          </Form>
        </Formik>
      </main>
    </MainContainer>
  );
};

export default NewPost;
