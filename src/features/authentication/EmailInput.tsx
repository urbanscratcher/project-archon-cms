import { useState, type ChangeEvent } from 'react';
import Input from '../../ui/Input';
import { InputProps } from './InputProps';

function EmailInput({ inputRef }: InputProps) {
  console.log('Rendering...');

  const [email, setEmail] = useState('');
  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
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

export default EmailInput;
