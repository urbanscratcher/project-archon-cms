import { ReactNode } from 'react';
import Logo from '../../ui/Logo';
import Heading from '../../ui/Heading';
import SignInForm from './SignInForm';

function SignIn(): ReactNode {
  return (
    <main className="grid min-h-screen grid-cols-[48rem] content-center justify-center gap-14">
      <Logo />
      <Heading
        level={2}
        text={'Sign in to your account'}
      />
      <SignInForm />
    </main>
  );
}

export default SignIn;
