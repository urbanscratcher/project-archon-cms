import { ReactNode } from 'react';
import Form from '../../ui/Form';
import FormRowVertical from '../../ui/FormRowVertical';

function SignInForm(): ReactNode {
  return (
    <Form>
      <FormRowVertical label={'email'}>
        <div>input...</div>
      </FormRowVertical>

      <FormRowVertical label={'password'}>
        <div>input...</div>
      </FormRowVertical>
    </Form>
  );
}

export default SignInForm;
