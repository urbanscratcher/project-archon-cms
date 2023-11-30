import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, useState } from 'react';
import useToggle from '../../hooks/useToggle';
import Error from '../../pages/Error';
import topicApi from '../../services/apiTopic';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
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
      queryClient.refetchQueries({ queryKey: ['topics'] });
    },
    onError: (error) => {
      console.log('error...', error);
    },
  });

  const clickEditHandler = () => {
    toggleEdit(true);
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
      queryClient.refetchQueries({ queryKey: ['topics'] });
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
        <Dialog
          title="Edit Topic Name"
          description="Make changes to topic name here. Click save when you're done"
          actionName="Save changes"
          onAction={editHandler}
        >
          {isPending && <Spinner />}
          {updateError && <Error />}
          {!isPending && !updateError && (
            <Input
              placeholder={topic.name}
              onChange={(e) => setNewName(e.target.value)}
            />
          )}
        </Dialog>
      )}
      {showDelete && (
        <AlertDialog
          title="Are you sure?"
          description="Your action to delete can't be restored again"
          onContinue={deleteHandler}
          onCancel={() => {}}
        >
          {isDeletePending && <Spinner />}
          {deleteError && <Error />}
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
