import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { AccountSchema } from '../../models/Auth';
import { User } from '../../models/Users';
import Error from '../../pages/Error';
import Form from '../../ui/Form';
import MainHead from '../../ui/Head';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import useUpdateSetting from './useUpdateSetting';

function AccountSetting({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      past_password: '',
      new_password: '',
      new_password_confirm: '',
    },
    resolver: zodResolver(AccountSchema),
  });

  const { updateSetting, isPending, error } = useUpdateSetting();

  const submitHandler = async (data: any): Promise<void> => {
    updateSetting(data);
  };

  return (
    <>
      {!error ? (
        <Form
          onSubmit={handleSubmit(submitHandler)}
          className="lg:max-w-3xl"
          borderless
        >
          <MainHead>
            <MainHead.Title>Account</MainHead.Title>
            <MainHead.Description>
              Update your account settings. Reset your email and password in secure.
            </MainHead.Description>
          </MainHead>
          <hr />
          <Form.RowVertical className="flex-1 py-3 lg:max-w-2xl">
            <Form.RowVertical label={'Role'}>
              <p className="capitalize">{user.role}</p>
            </Form.RowVertical>
            <Form.RowVertical label={'Email'}>
              <p className="capitalize">{user.email}</p>
            </Form.RowVertical>
            <Form.RowVertical
              label={'Current Password'}
              error={errors?.past_password?.message as string}
            >
              <Input
                {...register('past_password')}
                type="password"
                disabled={isPending}
              />
            </Form.RowVertical>
            <Form.RowVertical
              label={'New Password'}
              error={errors?.new_password?.message as string}
            >
              <Input
                {...register('new_password')}
                type="password"
                disabled={isPending}
              />
            </Form.RowVertical>
            <Form.RowVertical
              label={'Confirm New Password'}
              error={errors?.new_password_confirm?.message as string}
            >
              <Input
                {...register('new_password_confirm')}
                type="password"
                disabled={isPending}
              />
            </Form.RowVertical>
            <Form.RowHorizontal
              className="text-sm"
              label={'Joined at'}
            >
              <p className="text-sm">{format(user.createdAt, 'yyyy-MM-dd')}</p>
            </Form.RowHorizontal>
            <Form.RowVertical className="items-end">
              <Button
                size="md"
                buttonType="primary"
                className="w-fit"
                disabled={isPending}
              >
                {isPending ? (
                  <Spinner
                    withText={false}
                    light
                  />
                ) : (
                  'Update'
                )}
              </Button>
            </Form.RowVertical>
          </Form.RowVertical>
        </Form>
      ) : (
        <Error />
      )}
    </>
  );
}

export default AccountSetting;
