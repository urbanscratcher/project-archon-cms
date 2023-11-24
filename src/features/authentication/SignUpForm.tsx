import { type ReactNode, type SyntheticEvent, useState } from 'react';
import authApi from '../../services/apiAuth';
import Button, { ButtonSize, ButtonType } from '../../ui/Button';
import Form from '../../ui/Form';
import { FormRowVertical, FormRowHorizontal } from '../../ui/FormRowVertical';
import Input from '../../ui/Input';
import useSignIn from './useSignIn';
import SignFormHeader from './SignFormHeader';

type SignUpFormProps = {
  title: string;
  description: string;
};

function SignUpForm({ title, description }: SignUpFormProps): ReactNode {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isPending } = useSignIn();

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
      <FormRowHorizontal>
        <FormRowVertical label={'First Name'}>
          <Input
            type="text"
            id="firstName"
            autoComplete="First Name"
            value={password}
            onChange={changePwHandler}
            disabled={false}
          />
        </FormRowVertical>
        <FormRowVertical label={'Last Name'}>
          <Input
            type="text"
            id="lastName"
            autoComplete="Last Name"
            value={password}
            onChange={changePwHandler}
            disabled={false}
          />
        </FormRowVertical>
      </FormRowHorizontal>
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
      <FormRowVertical label={'Confirm Password'}>
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
          disabled={isPending}
          type={ButtonType.PRIMARY}
        >
          {isPending ? <div>Loading...</div> : 'Sign up'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignUpForm;
