import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useSignUp from '../features/authentication/useSignUp';
import { SignUpSchema } from '../models/Auth';
import Form from '../ui/Form';
import MainHead from '../ui/Head';
import Input from '../ui/input/Input';
import Spinner from '../ui/Spinner';
import TextLink from '../ui/TextLink';
import Button from '../ui/button/Button';

function SignUp() {
  const navigate = useNavigate();
  const { signUp, error, isPending } = useSignUp();
  const firstNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (error) {
      navigate('/error', { state: { message: error.message, status: error?.response?.status } });
    }
  }, [error]);

  useEffect(() => {
    firstNameRef.current!.focus();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });
  const submitHandler = async (data: any): Promise<void> => signUp(data);

  // to get ref for focusing
  const { ref, ...rest } = register('first_name');

  return (
    <>
      {!error && (
        <Form onSubmit={handleSubmit(submitHandler)}>
          <MainHead>
            <MainHead.Title>Sign up</MainHead.Title>
            <MainHead.Description>
              Create an account or
              <TextLink to="/signin">Sign in</TextLink>
            </MainHead.Description>
          </MainHead>
          <Form.RowHorizontal>
            <Form.RowVertical
              label={'First Name'}
              error={errors?.first_name?.message as string}
            >
              <Input
                {...rest}
                name="first_name"
                ref={(e) => {
                  ref(e);
                  firstNameRef.current = e;
                }}
                type="text"
                autoComplete="given-name"
                disabled={false}
              />
            </Form.RowVertical>
            <Form.RowVertical
              label={'Last Name'}
              error={errors?.last_name?.message as string}
            >
              <Input
                {...register('last_name')}
                type="text"
                autoComplete="family-name"
                disabled={false}
              />
            </Form.RowVertical>
          </Form.RowHorizontal>
          <Form.RowVertical
            label={'Email'}
            error={errors?.email?.message as string}
          >
            <Input
              {...register('email')}
              type="email"
              autoComplete="email"
              disabled={false}
            />
          </Form.RowVertical>
          <Form.RowVertical
            label={'Password'}
            error={errors?.password?.message as string}
          >
            <Input
              {...register('password')}
              type="password"
              autoComplete="current-password"
              disabled={false}
            />
          </Form.RowVertical>
          <Form.RowVertical
            label={'Confirm Password'}
            error={errors?.password_confirm?.message as string}
          >
            <Input
              {...register('password_confirm')}
              type="password"
              disabled={false}
            />
          </Form.RowVertical>
          <Form.RowVertical>
            <Button
              size={'md'}
              disabled={isPending}
              buttonType={'primary'}
              fullWidth={true}
            >
              {isPending ? <Spinner light /> : 'Sign up'}
            </Button>
          </Form.RowVertical>
        </Form>
      )}
    </>
  );
}

export default SignUp;
