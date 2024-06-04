import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Topic } from '../../models/Topic';
import userApi from '../../services/apiUser';
import useCreateAvatar from './useCreateAvatar';
import useRemoveAvatar from './useRemoveAvatar';

export type UpdateProfileState = {
  updateProfile: any;
  isPending: boolean;
  error: any;
};

function useUpdateProfile(): UpdateProfileState {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('access_token') ?? '';
  const { createAvatar } = useCreateAvatar();
  const { removeAvatar } = useRemoveAvatar();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: any) => {
      // upload/remove avatar img
      const formData = new FormData();
      if (data.avatar_file) {
        formData.append('img', data.avatar_file);
        data.avatar = (await createAvatar(formData)).url;
      }

      // if img should be removed
      if (data.shouldRemove) {
        await removeAvatar();
        data.avatar = '';
      }

      // careers parsing
      data.careers = JSON.stringify(data.careers);

      // topics parsing
      const topicsData = data.topics?.length > 0 ? data.topics.map((t: Topic) => t.idx) : [];
      data.topics = data.topics?.length > 0 ? JSON.stringify(topicsData) : undefined;

      // update
      await userApi.update(data.idx, data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { updateProfile: mutate, isPending, error };
}

export default useUpdateProfile;
