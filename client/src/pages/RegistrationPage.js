import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'; 
import axios from 'axios';


function RegistrationPage() {
//   let navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(8).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/api/v1/user/auth", data).then(() => {
        console.log(data);
    });
  };

  return (
    <div className='createPostPage'>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
      >
        <Form className='formContainer'>
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field 
            autoComplete="off" 
            id="inputCreatePost" 
            name="username" 
            placeholder="(Ex: Jahid...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field 
            autoComplete="off" 
            type="password"
            id="inputCreatePost" 
            name="password" 
            placeholder="(Ex: username@example.com)"
          />

          <button type='submit'>Register</button>
        </Form>
      </Formik>    
    </div>
  )
}

export default RegistrationPage