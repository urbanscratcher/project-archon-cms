import { useMutation } from '@tanstack/react-query';
import Resizer from 'react-image-file-resizer';
import insightImgsApi from '../../services/apiInsightImgs';

type UploadTarget = 'thumbnail' | 'insight';

function furcateImgUrl(target: UploadTarget, token: string, formData: FormData) {
  if (target === 'insight') {
    return insightImgsApi.imgUpsert(token, formData);
  } else {
    return insightImgsApi.thumbnailUpsert(token, formData);
  }
}

export const imgResize = (file: File): Promise<File> =>
  new Promise((res) => {
    Resizer.imageFileResizer(
      file,
      2560,
      1440,
      'webp', // type
      90, // quality
      0, // rotation
      (resizedImage: any) => res(resizedImage),
      'file',
      1280,
      720,
    );
  });

function useUploadImg(target: UploadTarget) {
  const token = localStorage.getItem('access_token') ?? '';

  const { mutateAsync, data, isPending, error } = useMutation({
    mutationFn: async (formData: FormData) => {
      const file = formData.get('img') as File;
      const sizeMb = file.size / 1048576;
      let formDataToSave = formData;

      // resize image
      if (sizeMb > 0.5) {
        const resizedImg = await imgResize(file);
        formData.delete('img');
        formData.append('img', resizedImg);
        formDataToSave = formData;
      }
      return furcateImgUrl(target, token, formDataToSave);
    },
    onSuccess: (res: any) => {
      return res.url;
    },
    onError: (error) => {
      console.error('error...', error);
    },
  });

  return { uploadImg: mutateAsync, isPending, error, data };
}

export default useUploadImg;
