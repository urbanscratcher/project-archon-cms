import { useState, type ChangeEvent } from 'react';
import { EmailSchema } from '../../models/User';
import Input from '../../ui/input/Input';
import { InputProps } from './InputProps';

function EmailInput({ inputRef, onSetIsError }: InputProps) {
  console.log('Rendering...');

  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);

    const result = EmailSchema.safeParse({ email: e.target.value });
    if (!result.success) {
      const formattedErr = result.error.format();
      const emailErr = formattedErr?.email?._errors[0];
      emailErr && setErr(emailErr);
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
          type="email"
          id="email"
          autoComplete="email"
          value={email}
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

export default EmailInput;
