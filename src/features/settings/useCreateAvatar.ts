import { useMutation } from '@tanstack/react-query';
import avatarApi from '../../services/apiAvatar';

function useCreateAvatar() {
  const token = localStorage.getItem('access_token') ?? '';

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (formData: any) => avatarApi.upsert(token, formData),
    onSuccess: (res: any) => {
      return res.url;
    },
    onError: (error) => {
      console.error('error...', error);
    },
  });

  return { createAvatar: mutateAsync, isPending, error };
}

export default useCreateAvatar;
