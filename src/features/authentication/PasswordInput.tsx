import { useState, type SyntheticEvent } from 'react';
import { PasswordSchema } from '../../models/User';
import Input from '../../ui/input/Input';
import { InputProps } from './InputProps';

function PasswordInput({ inputRef, onSetIsError }: InputProps) {
  console.log('Rendering...');

  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const changeHandler = (e: SyntheticEvent): void => {
    const currentTarget = e.target as HTMLInputElement;
    setPassword(currentTarget.value);

    const result = PasswordSchema.safeParse({ password: currentTarget.value });
    if (!result.success) {
      const formattedErr = result.error.format();
      const passwordErr = formattedErr?.password?._errors[0];
      passwordErr && setErr(passwordErr);
      onSetIsError(true);
    } else {
      setErr('');
      onSetIsError(false);
    }
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
        <div
          className={`absolute right-1 top-1/2 translate-y-[-50%] bg-white px-3 text-sm leading-6 text-zinc-400 transition-all ${
            err ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {err}
        </div>
      </div>
    </>
  );
}

export default PasswordInput;
