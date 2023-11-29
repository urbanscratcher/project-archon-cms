import { useEffect, useRef, type FormEvent } from 'react';
import EmailInput from '../features/authentication/EmailInput';
import PasswordInput from '../features/authentication/PasswordInput';
import SignForm from '../features/authentication/SignFormHeader';
import useSignIn from '../features/authentication/useSignIn';
import { useSigninStore } from '../store';
import Spinner from '../ui/Spinner';
import TextLink from '../ui/TextLink';
import Button from '../ui/button/Button';
import Form from '../ui/form/Form';
import Error from './Error';

/**
 * @description Form w/o react hook form
 * @test tt@gmail.com / test1234!
 */
function SignIn() {
  console.log('Rendering...');

  const { signIn, isPending, error } = useSignIn();
  const { emailError, passwordError } = useSigninStore();

  const emailInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);

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
      {error ? (
        <Error error={error} />
      ) : (
        <Form onSubmit={submitHandler}>
          <SignForm>
            <SignForm.Title>Sign in</SignForm.Title>
            <SignForm.Description>
              Sign in to your account or
              <TextLink to="/signup">Create an account</TextLink>
            </SignForm.Description>
          </SignForm>
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
