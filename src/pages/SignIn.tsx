import { useRef, useState, type FormEvent } from 'react';
import EmailInput from '../features/authentication/EmailInput';
import PasswordInput from '../features/authentication/PasswordInput';
import SignFormHeader from '../features/authentication/SignFormHeader';
import useSignIn from '../features/authentication/useSignIn';
import Error from '../ui/Error';
import Spinner from '../ui/Spinner';
import TextLink from '../ui/TextLink';
import Button from '../ui/button/Button';
import Form from '../ui/form/Form';
import { FormRowVertical } from '../ui/form/FormRow';

function SignIn() {
  const { signIn, isPending, error } = useSignIn();
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPwError, setIsPwError] = useState(false);
  const emailInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);

  const onSetIsPwError = (isError: boolean) => setIsPwError(isError);
  const onSetIsEmailError = (isError: boolean) => setIsEmailError(isError);

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // tt@gmail.com / test1234!
    const formData = {
      email: emailInput.current?.value,
      password: pwInput.current?.value,
    };

    signIn(formData);
  };

  return (
    <>
      {error ? (
        <Error>{error.message}</Error>
      ) : (
        <Form onSubmit={submitHandler}>
          <SignFormHeader
            title={'Sign in'}
            description={
              <>
                <p>Sign in to your account or </p>
                <TextLink to="/signup">Create an account</TextLink>
              </>
            }
          />
          <FormRowVertical label={'Email'}>
            <EmailInput
              inputRef={emailInput}
              onSetIsError={onSetIsEmailError}
            />
          </FormRowVertical>
          <FormRowVertical label={'Password'}>
            <PasswordInput
              inputRef={pwInput}
              onSetIsError={onSetIsPwError}
            />
          </FormRowVertical>
          <FormRowVertical>
            <Button
              size={'md'}
              disabled={isPending || isEmailError || isPwError}
              buttonType={'primary'}
            >
              {isPending ? <Spinner light /> : 'Sign in'}
            </Button>
          </FormRowVertical>
        </Form>
      )}
    </>
  );
}

export default SignIn;
