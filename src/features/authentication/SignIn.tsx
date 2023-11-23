import { ReactNode } from 'react';
import Logo from '../../ui/Logo';
import SignInForm from './SignInForm';

function SignIn(): ReactNode {
  return (
    <div
      className="
      grid min-h-screen grid-cols-[30rem]
    content-center justify-center gap-10 pb-[5%]"
    >
      <Logo />
      <SignInForm
        title={'Sign in'}
        description={'Sign in to your account'}
      />
    </div>
  );
}

export default SignIn;
