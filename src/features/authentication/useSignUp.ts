import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../../models/User';
import authApi from '../../services/apiAuth';
import { encrypt } from '../../utils/crypto';

export type SignUpState = {
  signUp: any;
  isPending: boolean;
  error: any;
};

function useSignUp(): SignUpState {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (signUp: SignUp) => {
      const encrypted = encrypt(signUp.password);
      const sign = { ...signUp, password: encrypted, password_confirm: encrypted };
      console.log(sign);
      return authApi.signup(sign);
    },
    onSuccess: (data) => {
      // queryClient.setQueryData(['user'], data);
      // 회원가입 완료 페이지 redirect..
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { signUp: mutate, isPending, error };
}

export default useSignUp;
