import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export type UpdateProfileState = {
  updateProfile: any;
  isPending: boolean;
  error: any;
};

function useUpdateProfile(): UpdateProfileState {
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (profile) => {
      console.log('mutating...', profile);

      // update via api
      return new Promise((resolve, reject) => {
        console.log('promise');
        resolve('resolved');
        // reject('reject');
      });
    },
    onSuccess: (data) => {
      console.log('success', data);
      navigate('/settings/profile', { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { updateProfile: mutate, isPending, error };
}

export default useUpdateProfile;
