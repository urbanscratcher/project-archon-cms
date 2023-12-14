import { useRef, useState, type KeyboardEvent } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useStateWithHistory from '../../hooks/useStateWithHistory';
import Input from './Input';

type InputActionProps = {
  placeholder: string;
  setAction: (value: string) => void;
};

function InputAction({ placeholder, setAction }: InputActionProps) {
  const input = useRef<HTMLInputElement>(null);
  const [typed, setTyped] = useState('');
  const [historyValue, setHistoryValue, { pointer, back, forward, go }] = useStateWithHistory('');

  useDebounce(
    () => {
      if ((input.current!.value as string) !== '') {
        setAction(input.current!.value);
      }
    },
    500,
    [typed],
  );

  const historyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setAction(typed);
      setHistoryValue(typed);
      setTyped('');
    }

    if (e.key === 'ArrowUp') {
      back();
      go(pointer - 1);
      setTyped(historyValue);
    }

    if (e.key === 'ArrowDown') {
      forward();
      go(pointer + 1);
      setTyped(historyValue);
    }
  };

  return (
    <div className="w-[20rem] min-w-fit">
      <Input
        placeholder={placeholder}
        onChange={(e) => setTyped(e.currentTarget.value)}
        onClick={() => setTyped('')}
        onKeyDown={historyHandler}
        value={typed}
        ref={input}
      />
    </div>
  );
}

export default InputAction;
