import { useRef, type SyntheticEvent } from 'react';
import Error from '../../ui/Error';
import Button, { ButtonSize, ButtonType } from '../../ui/button/Button';
import Form from '../../ui/form/Form';
import { FormRowVertical } from '../../ui/form/FormRow';
import SignFormHeader from './SignFormHeader';
import UserEmailInput from './UserEmailInput';
import UserPasswordInput from './UserPasswordInput';
import useSignIn from './useSignIn';

function SignInForm() {
  console.log('Rendering...');

  const { signIn, isPending, error } = useSignIn();
  const emailInput = useRef<HTMLInputElement>(null);
  const pwInput = useRef<HTMLInputElement>(null);

  const submitHandler = async (e: SyntheticEvent): Promise<void> => {
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
            <UserEmailInput inputRef={emailInput} />
          </FormRowVertical>
          <FormRowVertical label={'Password'}>
            <UserPasswordInput inputRef={pwInput} />
          </FormRowVertical>
          <FormRowVertical>
            <Button
              size={ButtonSize.MEDIUM}
              disabled={isPending}
              type={ButtonType.PRIMARY}
            >
              {isPending ? <div>Loading...</div> : 'Sign in'}
            </Button>
          </FormRowVertical>
        </Form>
      )}
    </>
  );
}

export default SignInForm;
