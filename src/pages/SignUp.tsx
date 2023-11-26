import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import SignFormHeader from '../features/authentication/SignFormHeader';
import useSignUp from '../features/authentication/useSignUp';
import { SignUpSchema } from '../models/User';
import Spinner from '../ui/Spinner';
import TextLink from '../ui/TextLink';
import Button from '../ui/button/Button';
import Form from '../ui/form/Form';
import { FormRowHorizontal, FormRowVertical } from '../ui/form/FormRow';
import Input from '../ui/input/Input';
import InputMsg from '../ui/input/InputMsg';

function SignUp() {
  const { error, isPending, signUp } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const submitHandler = async (data: any): Promise<void> => {
    signUp(data);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <SignFormHeader
        title={'Sign up'}
        description={
          <>
            <p>Create an account or </p>
            <TextLink to="/signin">Sign in</TextLink>
          </>
        }
      />
      <FormRowHorizontal>
        <FormRowVertical label={'First Name'}>
          <div className="relative">
            <Input
              {...register('first_name')}
              type="text"
              autoComplete="given-name"
              disabled={false}
            />
            <InputMsg msg={errors?.first_name?.message as string} />
          </div>
        </FormRowVertical>
        <FormRowVertical label={'Last Name'}>
          <div className="relative">
            <Input
              {...register('last_name')}
              type="text"
              autoComplete="family-name"
              disabled={false}
            />
            <InputMsg msg={errors?.last_name?.message as string} />
          </div>
        </FormRowVertical>
      </FormRowHorizontal>
      <FormRowVertical label={'Email'}>
        <div className="relative">
          <Input
            {...register('email')}
            type="email"
            autoComplete="email"
            disabled={false}
          />
          <InputMsg msg={errors?.email?.message as string} />
        </div>
      </FormRowVertical>
      <FormRowVertical label={'Password'}>
        <div className="relative">
          <Input
            {...register('password')}
            type="password"
            autoComplete="current-password"
            disabled={false}
          />
          <InputMsg msg={errors?.password?.message as string} />
        </div>
      </FormRowVertical>
      <FormRowVertical label={'Confirm Password'}>
        <div className="relative">
          <Input
            {...register('password_confirm')}
            type="password"
            disabled={false}
          />
          <InputMsg msg={errors?.password_confirm?.message as string} />
        </div>
      </FormRowVertical>
      <FormRowVertical>
        <Button
          size={'md'}
          disabled={isPending}
          buttonType={'primary'}
        >
          {isPending ? <Spinner light /> : 'Sign up'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignUp;
