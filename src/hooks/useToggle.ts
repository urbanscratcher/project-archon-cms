import { useState } from 'react';

function useToggle(initVal: boolean | any): [boolean, (v: any) => void] {
  const [value, setValue] = useState(initVal);
  const toggleValue = (v: any) => {
    setValue((curVal: any) => (typeof v === 'boolean' ? v : !curVal));
  };
  return [value, toggleValue];
}

export default useToggle;
