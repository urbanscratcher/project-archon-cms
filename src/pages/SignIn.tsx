import { type PropsWithChildren } from 'react';
import SignInForm from '../features/authentication/SignInForm';
import Logo from '../ui/Logo';

export function SignContainer({ children }: PropsWithChildren) {
  return (
    <div
      className="
      grid
  min-h-screen grid-cols-[30rem] content-center justify-center gap-10  text-zinc-800"
    >
      {children}
    </div>
  );
}

function SignIn() {
  return (
    <SignContainer>
      <Logo />
      <SignInForm />
    </SignContainer>
  );
}

export default SignIn;
