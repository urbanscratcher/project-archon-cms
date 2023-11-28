import { useRef, useState, type FormEvent } from 'react';
import EmailInput from '../features/authentication/EmailInput';
import PasswordInput from '../features/authentication/PasswordInput';
import SignFormHeader from '../features/authentication/SignFormHeader';
import useSignIn from '../features/authentication/useSignIn';
import { useRefresh } from '../hooks/useRefresh';
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
  const refresh = useRefresh();

  const onSetIsPwError = (isError: boolean) => setIsPwError(isError);
  const onSetIsEmailError = (isError: boolean) => setIsEmailError(isError);

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // tt@gmail.com / test1234!
    const formData = {
      email: emailInput.current?.value,
      password: pwInput.current?.value,
    };

    // try signin
    await signIn(formData);
  };

  return (
    <>
      {error ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex flex-col gap-2">
            <h3>Error</h3>
            <p className="text-red-500">{error.message}</p>
          </div>
          <div className="flex items-center text-xl">
            <p>Please retry</p>
            <Button
              buttonType="borderless"
              size="icon"
              onClick={() => refresh()}
            >
              <span className="icon-[lucide--rotate-ccw]"></span>
            </Button>
          </div>
        </div>
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
