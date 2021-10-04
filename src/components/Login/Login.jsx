import { fb } from 'service';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { FormField } from 'components';
import { useHistory } from 'react-router-dom';
import { defaultValues, validationSchema } from './formikConfig';


export const Login = () => {
    const history = useHistory();
    const [serverError, setServerError] = useState('');

    const login = ({email, password}, {setSubmitting}) => {
        fb.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
            if (!res.user){
                setServerError("We're having trouble logging in. Please try again.",
                );
            }
        })
        .catch(err => {
            if (err.code === 'auth/wrong-password'){
                setServerError('Invalid Creds');
            } else if (err.code === 'auth/user-not-found'){
                setServerError('No account for this email');
            } else {
                setServerError('Something else broke');
            }
        })
        .finally(() => setSubmitting(false));
    };


    return (
        <div className="auth-form">
            <h1>Login</h1>

            <Formik
                onSubmit={login}
                validateOnMount={true}
                initialValues={defaultValues}
                validationSchema={validationSchema}
                >

                {(isValid, isSubmitting) => (
                    <Form>
                        <FormField name='email' label='Email' type='email' />
                        <FormField name='password' label='Password' type='password'/>


                        <div className='auth-link-container'>
                            Don't have an account?{' '}
                            <span className='auth-link' onClick={() => history.push('signup')}>
                                Sign up!
                            </span>
                        </div>

                        <button disabled={!isValid || isSubmitting} type='submit'>
                             Login
                        </button>

                    </Form>
                )}
            </Formik>

            {!!serverError && <div className='error'>{serverError}</div>}

        </div>
    );
};