import { create } from 'zustand';

type SigninState = {
  setPasswordError: (error: string) => void;
  passwordError?: string | null;
  setEmailError: (error: string) => void;
  emailError?: string | null;
};

export const useSigninStore = create<SigninState>()((set) => ({
  setPasswordError: (error?: string) => set({ passwordError: error }),
  passwordError: null,
  setEmailError: (error?: string) => set({ emailError: error }),
  emailError: null,
}));
