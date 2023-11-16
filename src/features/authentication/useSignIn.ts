import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
export interface LoginState {
  login: any;
  isLoading: boolean;
}

function useSignIn(): LoginState {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // const { mutate: signin, isLoading } = useMutation({
  //   mutationFn: ({ email, password }: SignIn) => signinApi({ email, password }),
  //   onSuccess: () => {
  //     queryClient.setQueryData(['user'], user.user);
  //     navigate('/dashboard', { replace: true });
  //   },
  //   onError: (err) => {
  //     console.error(err);
  //   },
  // });

  return { login: 'any', isLoading: false };
}

export default useSignIn;
