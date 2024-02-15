import { useMutation } from '@tanstack/react-query';
import avatarApi from '../../services/apiAvatar';

function useRemoveAvatar() {
  const token = localStorage.getItem('access_token') ?? '';

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: () => avatarApi.remove(token),
    onSuccess: () => {
      console.log('removed successfully');
    },
    onError: (error) => {
      console.error('error...', error);
    },
  });

  return { removeAvatar: mutateAsync, isPending, error };
}

export default useRemoveAvatar;
