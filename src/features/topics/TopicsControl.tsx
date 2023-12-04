import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import useToggle from '../../hooks/useToggle';
import Error from '../../pages/Error';
import topicApi from '../../services/apiTopic';
import Input from '../../ui/input/Input';
import Button from '../../ui/button/Button';
import AlertDialog from '../../ui/dialog/AlertDialog';
import Dialog from '../../ui/dialog/Dialog';
import { Topic } from './topicsStore';

function TopicsControl({ topic }: { topic: Topic }) {
  const token = localStorage.getItem('access_token') ?? '';
  const queryClient = useQueryClient();
  const [showEdit, toggleEdit] = useToggle(false);
  const [showDelete, toggleDelete] = useToggle(false);

  const [newName, setNewName] = useState(topic.name);

  // edit -------------
  const {
    mutate,
    isPending,
    error: updateError,
  } = useMutation({
    mutationFn: ({ name }: { name: string }) => topicApi.updateName(topic.idx, { name }, token),
    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
    onError: (error) => {
      console.log('error...', error);
    },
  });

  const clickEditHandler = () => {
    toggleEdit(true);
  };

  const editHandler = () => {
    // console.log('edit mutate...?');
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
      console.log('error...', error);
    },
  });

  const clickDeleteHandler = () => {
    toggleDelete(true);
  };

  const deleteHandler = () => {
    deleteMutate({ idx: topic.idx });
  };

  return (
    <>
      {showEdit && (
        <AlertDialog
          title="Edit Topic Name"
          description="Make changes to topic name here. Click save when you're done"
          isLoading={isPending}
          continueLabel="Save"
          onContinue={editHandler}
          onCancel={() => toggleEdit(false)}
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
          onCancel={() => toggleDelete(false)}
        >
          {deleteError && <Error.Message errorState={deleteError} />}
        </AlertDialog>
      )}
      <TopicsControl.Container>
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
          <span className="icon-[lucide--trash-2]"></span>
        </Button>
      </TopicsControl.Container>
    </>
  );
}

export default TopicsControl;

TopicsControl.Container = function Container({ children }: PropsWithChildren) {
  return <div className="flex">{children}</div>;
};
