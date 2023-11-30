import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, type FormEvent } from 'react';
import topicApi from '../../services/apiTopic';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import Dialog from '../../ui/dialog/Dialog';

function CreateTopic() {
  const input = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const token = localStorage.getItem('access_token') ?? '';

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
    if (input.current?.value) {
      mutate(input.current.value);
      input.current.value = '';
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
          ref={input}
        />
        <Button
          type="submit"
          buttonType="primary"
          size="sm"
          style={{ minWidth: '5.4rem' }}
        >
          {isPending ? (
            <Spinner
              light
              withText={false}
            />
          ) : (
            'Create'
          )}
        </Button>
        {error && (
          <Dialog
            title={'Error'}
            description={error.message}
            actionName="Confirm"
            onAction={() => {
              return;
            }}
          ></Dialog>
        )}
      </form>
    </>
  );
}

export default CreateTopic;
