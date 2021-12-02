import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { gql, useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { useHistory, useLocation, Link } from 'react-router-dom';

import { StyledBox, ErrorMsg } from '../styles/Registration';
import { validationSchemaRegistration } from '../../form/validationSchema';
import Button from '../common/Button';
import Input from '../common/Input';

interface FormData {
  lastname: string;
  firstname: string;
  mail: string;
  password: string;
  role?: 'teacher' | 'student';
  classroom?: string;
}

const USER_REGISTER = gql`
  mutation Register($body: AuthRegisterInput!) {
    register(body: $body) {
      id
      token
    }
  }
`;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function RegistrationForm(): JSX.Element {
  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  const [registerMutation] = useMutation(USER_REGISTER);
  const [registerError, setRegisterError] = useState('');
  const [teacherForm, setTeacherForm] = useState(
    pathname === '/register-teacher'
  );

  const register = async (formData: FormData) => {
    const { firstname, lastname, mail, password, classroom } = formData;
    setRegisterError('');
    try {
      const { data } = await registerMutation({
        variables: {
          body: {
            lastname,
            firstname,
            mail,
            password,
            classroom,
            role: teacherForm ? 'teacher' : 'student',
          },
        },
      });
      Cookies.set('token', data.register.token);
      return history.push('/');
    } catch (error: any) {
      return setRegisterError(error.message);
    }
  };

  return (
    <StyledBox>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          mail: '',
          password: '',
          classroom: query.get('classroom') ?? '',
        }}
        validationSchema={validationSchemaRegistration}
        onSubmit={(data: FormData) => register(data)}
      >
        {({ errors, touched }) => (
          <Form>
            <Input
              name="lastname"
              type="text"
              errors={errors.lastname}
              touched={touched.lastname}
              placeholder="Nom"
            />
            <Input
              name="firstname"
              type="text"
              errors={errors.firstname}
              touched={touched.firstname}
              placeholder="Prénom"
            />
            <Input
              name="mail"
              type="email"
              errors={errors.mail}
              touched={touched.mail}
              placeholder="E-mail"
            />
            <Input
              name="password"
              type="password"
              errors={errors.password}
              touched={touched.password}
              placeholder="Mot de passe"
            />
            {teacherForm ? (
              <Input
                name="classroom"
                type="text"
                errors={errors.classroom}
                touched={touched.classroom}
                placeholder="Nom de la classe"
              />
            ) : (
              ''
            )}
            {registerError ? <ErrorMsg>{registerError}</ErrorMsg> : ''}
            <Button text="INSCRIRE" type="submit" buttonStyle="submit" />
          </Form>
        )}
      </Formik>
      <Link to="/">Revenir sur la page d&apos;accueil</Link>
    </StyledBox>
  );
}

export default RegistrationForm;
