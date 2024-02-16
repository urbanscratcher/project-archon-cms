import { useMutation, useQueryClient } from '@tanstack/react-query';
import userApi from '../../services/apiUser';
import { User } from '../../models/Users';
import { encrypt } from '../../utils/crypto';
import { Account } from '../../models/Auth';

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('access_token') ?? '';

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: Account) => {
      const user: User = queryClient.getQueryData(['user']);
      const encryptedData = {
        past_password: encrypt(data.past_password as string),
        new_password: encrypt(data.new_password as string),
        new_password_confirm: encrypt(data.new_password_confirm as string),
      };

      console.log(encryptedData);
      return userApi.update(user.idx, encryptedData, token);
    },
    onSuccess: () => {
      console.log('successfully updated');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { updateSetting: mutate, isPending, error };
}

export default useUpdateSetting;
