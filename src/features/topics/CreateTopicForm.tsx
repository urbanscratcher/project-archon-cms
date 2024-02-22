import { useRef, type FormEvent, useState, useEffect } from 'react';
import Input from '../../ui/input/Input';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/button/Button';
import Dialog from '../../ui/dialog/Dialog';
import useCreateTopic from './useCreateTopic';
import { makeErrorMsg } from '../../pages/Error';
import { AxiosError } from 'axios';

function CreateTopicForm() {
  const input = useRef<HTMLInputElement>(null);
  const { mutate, isPending, error } = useCreateTopic();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(true);
  }, [error]);

  useEffect(() => {
    if (input) {
      input.current!.focus();
    }
  }, [input]);

  const createHandler = (e: FormEvent<HTMLFormElement>) => {
    // to prevent refreshing the page
    e.preventDefault();

    if (input.current?.value) {
      mutate(input.current.value);
      input.current.value = '';
    }
  };

  return (
    <>
      <form
        className="grid max-w-sm grid-cols-[1fr_auto] gap-2 "
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
          disabled={isPending}
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
        {error && showError && error instanceof AxiosError && (
          <Dialog
            title={makeErrorMsg(error.response!.status).title}
            description={makeErrorMsg(error.response!.status).description}
            actionName="Confirm"
            onAction={() => {
              setShowError(false);
              return;
            }}
          ></Dialog>
        )}
      </form>
    </>
  );
}

export default CreateTopicForm;
