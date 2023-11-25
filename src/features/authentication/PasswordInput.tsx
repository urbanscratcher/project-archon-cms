import { useState, type SyntheticEvent } from 'react';
import Input from '../../ui/Input';
import { InputProps } from './InputProps';

function PasswordInput({ inputRef }: InputProps) {
  console.log('Rendering...');

  const [password, setPassword] = useState('');

  const changePwHandler = (e: SyntheticEvent): void => {
    const currentTarget = e.target as HTMLInputElement;
    setPassword(currentTarget.value);
  };

  return (
    <Input
      type="password"
      id="password"
      autoComplete="current-password"
      value={password}
      onChange={changePwHandler}
      disabled={false}
      ref={inputRef}
    />
  );
}

export default PasswordInput;
