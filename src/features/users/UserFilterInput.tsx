import { useRef, useState, type KeyboardEvent } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useStateWithHistory from '../../hooks/useStateWithHistory';
import Input from '../../ui/Input';
import { useUserFilterStore } from './usersStore';

function UsersFilterInput() {
  const { setSearchFilter } = useUserFilterStore();

  const input = useRef<HTMLInputElement>(null);
  const [typed, setTyped] = useState('');
  const [historyValue, setHistoryValue, { pointer, back, forward, go }] = useStateWithHistory('');

  useDebounce(
    () => {
      if ((input.current!.value as string) !== '') {
        setSearchFilter(input.current!.value);
      }
    },
    500,
    [typed],
  );

  const historyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchFilter(typed);
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
    <div className="w-[50%] min-w-fit max-w-[40rem]">
      <Input
        placeholder="Search a name or email..."
        onChange={(e) => setTyped(e.currentTarget.value)}
        onClick={(e) => setTyped('')}
        onKeyDown={historyHandler}
        value={typed}
        ref={input}
      />
    </div>
  );
}

export default UsersFilterInput;