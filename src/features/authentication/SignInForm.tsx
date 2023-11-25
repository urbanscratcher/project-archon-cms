import { FormEvent, useRef, useState } from 'react';
import Error from '../../ui/Error';
import Loader from '../../ui/Loader';
import Button, { ButtonSize, ButtonType } from '../../ui/button/Button';
import Form from '../../ui/form/Form';
import { FormRowVertical } from '../../ui/form/FormRow';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import SignFormHeader from './SignFormHeader';
import useSignIn from './useSignIn';

function SignInForm() {
  console.log('Rendering...');

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
            description={'Sign in to your account'}
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
              size={ButtonSize.MEDIUM}
              disabled={isPending || isEmailError || isPwError}
              type={ButtonType.PRIMARY}
            >
              {isPending ? <Loader /> : 'Sign in'}
            </Button>
          </FormRowVertical>
        </Form>
      )}
    </>
  );
}

export default SignInForm;
