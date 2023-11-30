import { useState, type ChangeEvent } from 'react';
import checkValidValue from '../../hooks/useZodValidation';
import { EmailSchema } from '../../models/User';
import Input from '../../ui/Input';
import { InputProps } from './InputProps';
import { useSignInStore } from './signInStore';

function EmailInput({ inputRef }: InputProps) {
  const [email, setEmail] = useState('');
  const { setEmailError } = useSignInStore();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    const error = checkValidValue({ email: e.target.value }, EmailSchema);
    error ? setEmailError(error) : setEmailError('');
  };

  return (
    <>
      <div className="relative w-full">
        <Input
          type="email"
          id="email"
          autoComplete="email"
          value={email}
          onChange={changeHandler}
          disabled={false}
          ref={inputRef}
        />
      </div>
    </>
  );
}

export default EmailInput;
