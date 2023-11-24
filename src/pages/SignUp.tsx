import Logo from '../ui/Logo';
import { SignContainer } from './SignIn';
import SignUpForm from '../features/authentication/SignUpForm';

function SignUp() {
  return (
    <SignContainer>
      <Logo />
      <SignUpForm
        title={'Sign up'}
        description={'Sign up to get started'}
      />
    </SignContainer>
  );
}

export default SignUp;
