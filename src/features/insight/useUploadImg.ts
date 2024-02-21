import { useMutation, useQueryClient } from '@tanstack/react-query';
import insightImgsApi from '../../services/apiInsightImgs';

type UploadTarget = 'thumbnail' | 'insight';

function useUploadImg(target: UploadTarget) {
  const queryClient = useQueryClient();

  const token = localStorage.getItem('access_token') ?? '';

  const { mutate, data, isPending, error } = useMutation({
    mutationFn: (formData: FormData) =>
      target === 'insight'
        ? insightImgsApi.imgUpsert(token, formData)
        : insightImgsApi.thumbnailUpsert(token, formData),
    onSuccess: (res: any) => {
      return res.url;
    },
    onError: (error) => {
      console.error('error...', error);
    },
  });

  return { uploadImg: mutate, isPending, error, data };
}

export default useUploadImg;
