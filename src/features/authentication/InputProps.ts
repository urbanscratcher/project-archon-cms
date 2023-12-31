import { Ref } from 'react';

export type InputProps = {
  inputRef: Ref<HTMLInputElement> | undefined;
  onSetIsError?: (isError: boolean) => void;
};
