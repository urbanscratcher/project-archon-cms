import { FormEvent, useRef } from 'react';
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
  const emailInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    // tests@gmail.com / test
    e.preventDefault();
    signIn({ email: emailInput.current?.value, password: pwInput.current?.value });
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
            <EmailInput inputRef={emailInput} />
          </FormRowVertical>
          <FormRowVertical label={'Password'}>
            <PasswordInput inputRef={pwInput} />
          </FormRowVertical>
          <FormRowVertical>
            <Button
              size={ButtonSize.MEDIUM}
              disabled={isPending}
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
