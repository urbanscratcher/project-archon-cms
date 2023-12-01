import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../../models/Auth';
import authApi from '../../services/apiAuth';
import { encrypt } from '../../utils/crypto';

export type SignUpState = {
  signUp: any;
  isPending: boolean;
  error: any;
};

function useSignUp(): SignUpState {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (signUp: SignUp) => {
      const encrypted = encrypt(signUp.password);
      const sign = { ...signUp, password: encrypted, password_confirm: encrypted };
      return authApi.signup(sign);
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access_token);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { signUp: mutate, isPending, error };
}

export default useSignUp;
