import { useEffect } from 'react';
import { User } from '../../models/Users';
import Form from '../../ui/Form';
import MainHead from '../../ui/Head';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';
import { format } from 'date-fns';

function AccountSetting({ user }: { user: User }) {
  // const navigate = useNavigate();
  // const { signUp, error, isPending } = useSignUp();
  // const firstNameRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (error) {
  //     navigate('/error', { state: { message: error.message, status: error?.response?.status } });
  //   }
  // }, [error]);

  // useEffect(() => {
  //   firstNameRef.current!.focus();
  // }, []);

  // submit handling
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({ resolver: zodResolver(SignUpSchema) });
  // const submitHandler = async (data: any): Promise<void> => signUp(data);

  return (
    <Form
      onSubmit={() => console.log('submit')}
      borderless
    >
      <MainHead>
        <MainHead.Title>Account</MainHead.Title>
        <MainHead.Description>
          Update your account settings. Reset your email and password in secure.
        </MainHead.Description>
      </MainHead>
      <Form.RowVertical className="flex-1 py-3 lg:max-w-2xl">
        <Form.RowVertical
          label={'Role'}
          // error={errors?.first_name?.message as string}
        >
          <Input
            name="role"
            type="text"
            value={user.role}
            disabled={false}
          />
        </Form.RowVertical>
        <Form.RowVertical
          label={'Email'}
          // error={errors?.first_name?.message as string}
        >
          <Input
            name="email"
            type="text"
            value={user.email}
            disabled={false}
          />
        </Form.RowVertical>
        <Form.RowVertical
          label={'Password'}
          // error={errors?.first_name?.message as string}
        >
          <Input
            name="password"
            type="text"
            disabled={false}
          />
        </Form.RowVertical>
        <Form.RowHorizontal label={'Joined at'}>
          <p>{format(user.createdAt, 'yyyy-MM-dd')}</p>
        </Form.RowHorizontal>
        <Form.RowVertical>
          <Button
            type="submit"
            size="md"
            buttonType="primary"
          >
            Update
          </Button>
        </Form.RowVertical>
      </Form.RowVertical>
    </Form>
  );
}

export default AccountSetting;
