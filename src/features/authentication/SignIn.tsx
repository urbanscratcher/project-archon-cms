import { type PropsWithChildren } from 'react';
import Logo from '../../ui/Logo';
import SignInForm from './SignInForm';

export function SignContainer({ children }: PropsWithChildren) {
  return (
    <div
      className="
      grid
  min-h-screen grid-cols-[30rem] content-center justify-center gap-10"
    >
      {children}
    </div>
  );
}

function SignIn() {
  return (
    <SignContainer>
      <Logo />
      <SignInForm
        title={'Sign in'}
        description={'Sign in to your account'}
      />
    </SignContainer>
  );
}

export default SignIn;
