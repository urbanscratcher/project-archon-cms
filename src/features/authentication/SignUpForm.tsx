import { zodResolver } from '@hookform/resolvers/zod';
import { type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpSchema } from '../../models/User';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import Form from '../../ui/form/Form';
import { FormRowHorizontal, FormRowVertical } from '../../ui/form/FormRow';
import Input from '../../ui/input/Input';
import InputMsg from '../../ui/input/InputMsg';
import SignFormHeader from './SignFormHeader';
import useSignUp from './useSignUp';

type SignUpFormProps = {
  title: string;
  description: string;
};

function SignUpForm({ title, description }: SignUpFormProps): ReactNode {
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
        title={title}
        description={description}
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
          type={'primary'}
        >
          {isPending ? <Spinner light /> : 'Sign up'}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default SignUpForm;
