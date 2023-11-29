import { useMutation } from '@tanstack/react-query';
import { type FormEvent, useRef } from 'react';
import topicApi from '../../services/apiTopic';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import Input from '../../ui/input/Input';

function CreateTopic({ token, queryClient }: any) {
  const ref = useRef<HTMLInputElement>(null);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (name: string) => topicApi.create({ name: name }, token),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['topics'] });
    },
    onError: (error) => {
      console.log('error...', error);
    },
  });

  const createHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ref.current?.value) {
      mutate(ref.current.value);
      ref.current.value = '';
    }
  };

  return (
    <>
      <form
        className="grid max-w-sm grid-cols-[1fr_auto] gap-1 "
        onSubmit={(e) => createHandler(e)}
      >
        <Input
          type="text"
          placeholder="Create new topic..."
          ref={ref}
        />
        <Button
          type="submit"
          buttonType="primary"
          size="sm"
        >
          {isPending ? <Spinner /> : 'Create'}
        </Button>
        {error && <p className="col-span-full">{error.message}</p>}
      </form>
    </>
  );
}

export default CreateTopic;
