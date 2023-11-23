import { type ReactNode, type SyntheticEvent, useState } from 'react';
import authApi from '../../services/apiAuth';
import Button, { ButtonSize, ButtonType } from '../../ui/Button';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import useSignIn from './useSignIn';
import SignFormHeader from './SignFormHeader';

type SignInFormProps = {
  title: string;
  description: string;
};

function SignInForm({ title, description }: SignInFormProps): ReactNode {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useSignIn();

  const changeEmailHandler = (e: SyntheticEvent): void => {
    const currentTarget = e.target as HTMLInputElement;
    setEmail(currentTarget.value);
  };

  const changePwHandler = (e: SyntheticEvent): void => {
    const currentTarget = e.target as HTMLInputElement;
    setPassword(currentTarget.value);
  };

  const submitHandler = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const a = await authApi.signin({ email: 'test@gmail.com', password: 'mszII3tPXBw4/iJ9UA9Ghg==' });
    console.log(a);
  };

  return (
    <Form onSubmit={submitHandler}>
      <SignFormHeader
        title={title}
        description={description}
      />
      <FormRowVertical label={'Email'}>
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={changeEmailHandler}
          disabled={false}
        />
      </FormRowVertical>
      <FormRowVertical label={'Password'}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={changePwHandler}
          disabled={false}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button
          size={ButtonSize.MEDIUM}
          disabled={isLoading}
          type={ButtonType.PRIMARY}
        >
          {isLoading ? <div>Loading...</div> : 'Sign in'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignInForm;
