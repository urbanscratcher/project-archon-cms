import { ChangeEvent, useState } from 'react';
import checkValidValue from '../../hooks/useZodValidation';
import { PasswordSchema } from '../../models/User';
import { useSigninStore } from '../../store';
import Input from '../../ui/input/Input';
import { InputProps } from './InputProps';

function PasswordInput({ inputRef }: InputProps) {
  const [password, setPassword] = useState('');
  const { setPasswordError } = useSigninStore();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);

    const error = checkValidValue({ password: e.target.value }, PasswordSchema);
    error ? setPasswordError(error) : setPasswordError('');
  };

  return (
    <>
      <div className="relative w-full">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={changeHandler}
          disabled={false}
          ref={inputRef}
        />
      </div>
    </>
  );
}

export default PasswordInput;
