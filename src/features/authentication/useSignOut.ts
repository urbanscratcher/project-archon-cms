import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSignOut = () => {
    queryClient.removeQueries({ queryKey: ['user'] });
    localStorage.removeItem('access_token');
    navigate('/signin');
  };

  return onSignOut;
}

export default useSignOut;
