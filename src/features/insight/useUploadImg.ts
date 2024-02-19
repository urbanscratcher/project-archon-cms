import { useMutation } from '@tanstack/react-query';
import insightImgsApi from '../../services/apiInsightImgs';

type UploadTarget = 'thumbnail' | 'insight';

function useUploadImg(target: UploadTarget) {
  const token = localStorage.getItem('access_token') ?? '';

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: (formData: any) =>
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

  return { uploadImg: mutateAsync, isPending, error };
}

export default useUploadImg;
