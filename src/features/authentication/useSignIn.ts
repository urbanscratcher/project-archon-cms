import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import authApi from '../../services/apiAuth';
import { encrypt } from '../../utils/crypto';
import { SignIn } from '../../models/User';

export type LoginState = {
  signIn: any;
  isPending: boolean;
  error: any;
};

function useSignIn(): LoginState {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ email, password }: SignIn) => {
      const encrypted = encrypt(password);
      return authApi.signin({ email, password: encrypted });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { signIn: mutate, isPending, error };
}

export default useSignIn;
