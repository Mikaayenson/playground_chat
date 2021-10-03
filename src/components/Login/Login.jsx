import { Formik, Form } from 'formik';
import { FormField } from 'components';
import { useHistory } from 'react-router-dom';
import { defaultValues, validationSchema } from './formikConfig';


export const Login = () => {
    const history = useHistory();

    const login = ({email, password}, {setSubmitting}) => console.log('Loggin In: ', email, password);


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
                                Log in!
                            </span>
                        </div>

                        <button disabled={!isValid || isSubmitting} type='submit'>
                             Login
                        </button>

                    </Form>
                )}
            </Formik>

        </div>
    );
};