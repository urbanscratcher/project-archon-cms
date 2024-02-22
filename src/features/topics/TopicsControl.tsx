import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useToggle from '../../hooks/useToggle';
import { Topic } from '../../models/Topic';
import Error, { makeErrorMsg } from '../../pages/Error';
import topicApi from '../../services/apiTopic';
import Button from '../../ui/button/Button';
import AlertDialog from '../../ui/dialog/AlertDialog';
import Input from '../../ui/input/Input';
import Dialog from '../../ui/dialog/Dialog';

function TopicsControl({ topic }: { topic: Topic }) {
  const token = localStorage.getItem('access_token') ?? '';
  const queryClient = useQueryClient();
  const [showEdit, setShowEdit] = useToggle(false);
  const [showDelete, setShowDelete] = useToggle(false);
  const [showError, setShowError] = useState(false);
  const [newName, setNewName] = useState(topic.name);

  // edit -------------
  const {
    mutate,
    isPending,
    error: updateError,
  } = useMutation({
    mutationFn: ({ name }: { name: string }) => topicApi.updateName(topic.idx, { name }, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: (error) => {
      console.log('error...', error);
    },
  });

  const clickEditHandler = () => {
    setShowEdit(true);
  };

  const editHandler = () => {
    mutate({ name: newName });
  };

  // delete ---------------
  const {
    mutate: deleteMutate,
    isPending: isDeletePending,
    error: deleteError,
  } = useMutation({
    mutationFn: ({ idx }: { idx: number }) => topicApi.delete(idx, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const clickDeleteHandler = () => {
    setShowDelete(true);
  };

  const deleteHandler = () => {
    deleteMutate({ idx: topic.idx });
  };

  useEffect(() => {
    if (deleteError) {
      setShowDelete(false);
      setShowError(true);
    }
  }, [deleteError]);

  return (
    <>
      {showEdit && (
        <AlertDialog
          title="Edit Topic Name"
          description="Make changes to topic name here. Click save when you're done"
          isLoading={isPending}
          continueLabel="Save"
          onContinue={editHandler}
          onCancel={() => setShowEdit(false)}
        >
          <Input
            disabled={isPending}
            placeholder={topic.name}
            onChange={(e) => setNewName(e.target.value)}
          />
          {updateError && <Error.Message errorState={updateError} />}{' '}
        </AlertDialog>
      )}
      {showDelete && (
        <AlertDialog
          title="Are you sure?"
          description="Your action to delete can't be restored again"
          isLoading={isDeletePending}
          continueLabel="Delete"
          onContinue={deleteHandler}
          onCancel={() => setShowDelete(false)}
        ></AlertDialog>
      )}
      {showError && (
        <Dialog
          title={makeErrorMsg(403).title}
          description={makeErrorMsg(403).description}
          actionName="Confirm"
          onAction={() => {
            setShowError(false);
          }}
        ></Dialog>
      )}
      <div
        role="group"
        className="flex"
      >
        <Button
          buttonType="borderless"
          size="icon"
          onClick={clickEditHandler}
        >
          <span className="icon-[lucide--edit]"></span>
        </Button>
        <Button
          buttonType="borderless"
          size="icon"
          onClick={clickDeleteHandler}
        >
          <span className="icon-[lucide--x]"></span>
        </Button>
      </div>
    </>
  );
}

export default TopicsControl;
