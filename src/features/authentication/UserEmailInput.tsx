import { SyntheticEvent, useState } from 'react';
import Input from '../../ui/Input';
import { type UserInputProps } from './UserPasswordInput';

function UserEmailInput({ inputRef }: UserInputProps) {
  console.log('Rendering...');

  const [email, setEmail] = useState('');

  const changeEmailHandler = (e: SyntheticEvent): void => {
    const currentTarget = e.target as HTMLInputElement;
    setEmail(currentTarget.value);
  };

  return (
    <Input
      type="email"
      id="email"
      autoComplete="username"
      value={email}
      onChange={changeEmailHandler}
      disabled={false}
      ref={inputRef}
    />
  );
}

export default UserEmailInput;
