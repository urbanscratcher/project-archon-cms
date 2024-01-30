import { useEffect, useRef, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import EmailInput from '../features/authentication/EmailInput';
import PasswordInput from '../features/authentication/PasswordInput';
import { useSignInStore } from '../features/authentication/signInStore';
import useSignIn from '../features/authentication/useSignIn';
import Form from '../ui/Form';
import MainHead from '../ui/Head';
import Spinner from '../ui/Spinner';
import TextLink from '../ui/TextLink';
import Button from '../ui/button/Button';

/**
 * @description Form w/o react hook form
 * @test tt@gmail.com / test1234!
 */
function SignIn() {
  console.log('Rendering...');

  const navigate = useNavigate();
  const { signIn, isPending, error } = useSignIn();
  const { emailError, passwordError } = useSignInStore();
  const emailInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      navigate('/error', { state: { message: error.message, status: error?.response?.status } });
    }
  }, [error]);

  useEffect(() => {
    emailInput.current!.focus();
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    signIn({
      email: emailInput.current!.value,
      password: pwInput.current!.value,
    });
  };

  return (
    <>
      {!error && (
        <Form onSubmit={submitHandler}>
          <MainHead>
            <MainHead.Title>Sign in</MainHead.Title>
            <MainHead.Description>
              Sign in to your account or
              <TextLink to="/signup">Create an account</TextLink>
            </MainHead.Description>
          </MainHead>
          <Form.RowVertical
            label={'Email'}
            error={emailError ? emailError : ''}
          >
            <EmailInput inputRef={emailInput} />
          </Form.RowVertical>
          <Form.RowVertical
            label={'Password'}
            error={passwordError ? passwordError : ''}
          >
            <PasswordInput inputRef={pwInput} />
          </Form.RowVertical>
          <Form.RowVertical>
            <Button
              size="md"
              buttonType="primary"
              fullWidth={true}
              disabled={isPending || !!emailError || !!passwordError}
            >
              {isPending ? <Spinner light /> : 'Sign in'}
            </Button>
          </Form.RowVertical>
        </Form>
      )}
    </>
  );
}

export default SignIn;
