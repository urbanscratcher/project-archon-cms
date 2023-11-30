import { create } from 'zustand';

type SignInState = {
  setPasswordError: (error: string) => void;
  passwordError?: string | null;
  setEmailError: (error: string) => void;
  emailError?: string | null;
};

export const useSignInStore = create<SignInState>()((set) => ({
  setPasswordError: (error?: string) => set({ passwordError: error }),
  passwordError: null,
  setEmailError: (error?: string) => set({ emailError: error }),
  emailError: null,
}));
