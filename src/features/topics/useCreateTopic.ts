import { useMutation, useQueryClient } from '@tanstack/react-query';
import topicApi from '../../services/apiTopic';

function useCreateTopic() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('access_token') ?? '';

  const { mutate, isPending, error } = useMutation({
    mutationFn: (name: string) => topicApi.create({ name: name }, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: (error) => {
      console.log('error...', error);
    },
  });

  return { mutate, isPending, error };
}

export default useCreateTopic;
